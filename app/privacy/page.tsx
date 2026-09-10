import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Xplormate",
  description: "How Xplormate handles contact details and anonymous website analytics.",
};

const linkedinProfile = "https://www.linkedin.com/in/jeetendra-yadav-4363457a/";

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <div className="legal-shell legal-header-inner">
          <Link className="wordmark" href="/" aria-label="Xplormate home">
            <img className="brand-logo" src="/xplormate-logo.jpg" alt="" width="44" height="44" />
            <span>Xplormate<span className="brand-dot">.</span></span>
          </Link>
          <Link className="legal-back" href="/">Back to Xplormate <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <article className="legal-shell legal-content">
        <p className="legal-kicker">POLICY / LAST UPDATED 10 SEPTEMBER 2026</p>
        <h1>Privacy Policy</h1>
        <p className="legal-lede">This policy explains what Xplormate collects through this website and how we use it.</p>

        <section>
          <h2>Information you provide</h2>
          <p>When you start a conversation, we collect your name, email address, company, and role. These fields are required so we can understand who is reaching out and respond to the enquiry.</p>
        </section>

        <section>
          <h2>Website analytics</h2>
          <p>We use Vercel Web Analytics to understand aggregate website activity, such as page views, referrers, approximate country, browser, device, and operating system. Vercel’s analytics are designed to use anonymised data and do not use cookies to identify you across websites or days.</p>
          <p>Analytics cannot tell us your name or LinkedIn identity. If you submit the form, the details you provide are stored separately as an inbound enquiry.</p>
        </section>

        <section>
          <h2>How we use information</h2>
          <ul>
            <li>To review and respond to an enquiry.</li>
            <li>To understand which parts of the site are useful and improve the experience.</li>
            <li>To protect, maintain, and troubleshoot the website.</li>
          </ul>
        </section>

        <section>
          <h2>Storage and service providers</h2>
          <p>Form submissions are stored in a Supabase database connected to the Xplormate Vercel project. The database is accessed by the website server; database credentials are not exposed to visitors. Vercel hosts the website and analytics, and Supabase provides the database infrastructure.</p>
          <p>We do not sell the personal information submitted through this form.</p>
        </section>

        <section>
          <h2>Retention and requests</h2>
          <p>We keep enquiry details while they are useful for reviewing and managing the conversation. To ask about, correct, or request deletion of your submitted details, contact Jeetendra through <a href={linkedinProfile} target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
        </section>

        <section>
          <h2>Updates to this policy</h2>
          <p>We may update this policy when the website or its data practices change. The date at the top of this page shows when it was last revised.</p>
        </section>
      </article>

      <footer className="legal-footer">
        <div className="legal-shell"><Link href="/">Xplormate<span className="brand-dot">.</span></Link><span>AI transformation for manufacturing operations.</span></div>
      </footer>
    </main>
  );
}
