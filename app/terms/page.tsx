import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Xplormate",
  description: "Terms for using the Xplormate website and submitting an enquiry.",
};

const linkedinProfile = "https://www.linkedin.com/in/jeetendra-yadav-4363457a/";

export default function TermsPage() {
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
        <p className="legal-kicker">TERMS / LAST UPDATED 10 SEPTEMBER 2026</p>
        <h1>Terms of Service</h1>
        <p className="legal-lede">These terms describe the basic rules for using the Xplormate website.</p>

        <section>
          <h2>About the website</h2>
          <p>Xplormate is exploring practical AI transformation opportunities in manufacturing operations. The workflows, examples, and questions on this site are illustrative and are provided to support an initial conversation.</p>
        </section>

        <section>
          <h2>Using the site</h2>
          <p>You may use the site for lawful, personal, or business evaluation. Do not use it to interfere with the site, attempt unauthorised access, submit misleading information, or introduce malicious code.</p>
        </section>

        <section>
          <h2>Submitting an enquiry</h2>
          <p>If you use the contact form, provide information that is accurate and belongs to you or that you are authorised to share. Submitting your details starts a conversation; it does not create a contract, proposal, pilot, or obligation for either side.</p>
        </section>

        <section>
          <h2>Content and availability</h2>
          <p>The site is provided for general information and early-stage discovery. We do not promise that every page will always be available, error-free, or suitable for a particular operational, legal, security, or business decision. Review any proposed workflow carefully before applying it to live operations.</p>
          <p>Xplormate names, copy, visual design, and other original content belong to Xplormate unless stated otherwise. You may view and share the site for its intended purpose, but do not copy or republish it as your own.</p>
        </section>

        <section>
          <h2>External links</h2>
          <p>The site may link to third-party services such as LinkedIn. Those services have their own terms and privacy practices, which apply when you use them.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent to Jeetendra through <a href={linkedinProfile} target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
        </section>
      </article>

      <footer className="legal-footer">
        <div className="legal-shell"><Link href="/">Xplormate<span className="brand-dot">.</span></Link><span>AI transformation for manufacturing operations.</span></div>
      </footer>
    </main>
  );
}
