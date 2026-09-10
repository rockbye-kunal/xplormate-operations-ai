import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(254, "Email is too long."),
  company: z.string().trim().min(2, "Enter your company.").max(160, "Company is too long."),
  role: z.string().trim().min(2, "Enter your role.").max(120, "Role is too long."),
});

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

  return NextResponse.json({ ok: true, lead: result.data });
}
