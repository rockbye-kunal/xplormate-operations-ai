import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(254, "Email is too long."),
  company: z.string().trim().min(2, "Enter your company.").max(160, "Company is too long."),
  role: z.string().trim().min(2, "Enter your role.").max(120, "Role is too long."),
  challenge: z.string().trim().max(2000, "Please keep this under 2,000 characters.").optional().default(""),
});

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServerKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServerKey) {
    throw new Error("Supabase server credentials are not configured.");
  }

  return createClient(supabaseUrl, supabaseServerKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Please submit the form again." },
      { status: 400 },
    );
  }

  const result = leadSchema.safeParse(body);

  if (!result.success) {
    const fields = Object.fromEntries(
      Object.entries(result.error.flatten().fieldErrors).map(([field, messages]) => [
        field,
        messages?.[0] ?? "Check this field.",
      ]),
    );

    return NextResponse.json(
      {
        ok: false,
        message: "Please check the required details.",
        fields,
      },
      { status: 422 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    let { error } = await supabase.from("leads").insert({
      ...result.data,
      source: "website",
    });

    // If the challenge column has not been added to the database yet,
    // still save the core lead instead of losing it.
    if (error && (error.code === "PGRST204" || error.code === "42703")) {
      console.warn("Lead extra columns missing; saving core fields only. Run the latest Supabase migration.");
      const { challenge: _challenge, ...core } = result.data;
      void _challenge;
      ({ error } = await supabase.from("leads").insert({ ...core, source: "website" }));
    }

    if (error) {
      console.error("Lead storage failed", { code: error.code, message: error.message });
      return NextResponse.json(
        { ok: false, message: "We could not save your details. Please try again." },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("Lead storage is unavailable", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { ok: false, message: "We could not save your details. Please try again." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, lead: result.data }, { status: 201 });
}
