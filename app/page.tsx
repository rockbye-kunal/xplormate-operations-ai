"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, CircleAlert, Database, Mail, MapPin, Menu, MessageSquareText, Users, X } from "lucide-react";

const linkedinProfile = "https://www.linkedin.com/in/jeetendra-yadav-4363457a/";
const businessEmail = "jeetendra@xplormate.com";


const opportunities = [
  { id: "production", label: "Production", index: "01", title: "Production planning & execution", friction: "The plan changes, but the updated priority and its impact do not reach every owner at the same time.", ai: "Gather current context, highlight deviations, and prepare the next follow-up for review.", human: "Confirm the operational priority and approve changes that affect the plan.", measure: "Follow-up effort and response time", question: "Where do plan-versus-actual updates live today?" },
  { id: "quality", label: "Quality", index: "02", title: "Quality management", friction: "Corrective actions require repeated follow-up, and closure evidence can be difficult to assemble.", ai: "Organise context, identify missing evidence, and support accountable owner follow-ups.", human: "Approve disposition, validate corrective action, and verify closure.", measure: "Time from issue detection to verified closure", question: "Where are issues, actions, and evidence currently recorded?" },
  { id: "maintenance", label: "Maintenance", index: "03", title: "Maintenance coordination", friction: "Requests, observations, spares, and production constraints arrive through different channels.", ai: "Connect the available context, surface missing inputs, and keep the next action visible.", human: "Set priority, approve safety-sensitive work, and confirm equipment readiness.", measure: "Open-request age and repeat follow-ups", question: "How does a maintenance request move from report to verified completion?" },
  { id: "materials", label: "Materials", index: "04", title: "Materials & procurement", friction: "A late component becomes urgent only after its effect on production is manually understood.", ai: "Relate material signals to orders, timing, and ownership, then prepare an exception summary.", human: "Validate the constraint and decide the supplier or planning response.", measure: "Time from risk signal to owned action", question: "Which sources are checked before material readiness is confirmed?" },
  { id: "handovers", label: "Handovers", index: "05", title: "Shift handovers", friction: "The incoming team receives a list of issues without the full context, decision history, or clear owners.", ai: "Structure open items, carry forward context, and flag what still needs acknowledgement.", human: "Confirm what was handed over and accept responsibility for the next step.", measure: "Missed or repeatedly explained open items", question: "How is acknowledgement captured between shifts?" },
  { id: "reporting", label: "Reporting", index: "06", title: "Operational reporting", friction: "Teams spend time collecting updates before leaders can understand what needs attention.", ai: "Compile updates, separate exceptions from routine activity, and make missing context explicit.", human: "Interpret trade-offs and decide where management attention is required.", measure: "Preparation time and missing-update rate", question: "Which recurring report depends most on manual consolidation?" },
];

const stages = [
  { number: "01", title: "Something happens", copy: "A material shortage is reported before the next shift.", icon: CircleAlert },
  { number: "02", title: "Facts pulled together", copy: "The affected orders, timing, messages, and stock on hand are gathered in one place.", icon: Database },
  { number: "03", title: "Right people told", copy: "The buyer and planner see the same clear picture at the same time.", icon: Users },
  { number: "04", title: "Follow-up drafted", copy: "AI drafts the follow-up and flags anything unusual for a person to check.", icon: MessageSquareText },
  { number: "05", title: "Closed properly", copy: "A person confirms the response, updates the plan, and marks it done.", icon: Check },
];

const faq = [
  ["Where can AI fit within manufacturing operations?", "A useful starting point is usually a recurring coordination task: gathering updates, connecting context, routing an exception, preparing a follow-up, or confirming closure. The workflow and its consequences determine what AI should support."],
  ["What if information is spread across different systems?", "That is common and part of the workflow assessment. We map where the information lives, who owns it, when it becomes available, and what can be accessed safely before suggesting an intervention."],
  ["Will AI make operational decisions independently?", "The level of autonomy depends on the task and its consequences. The workflow should explicitly define permissions, human approvals, exception handling, escalation rules, and a review trail."],
  ["Why work with an early company?", "You work directly with the people building Xplormate, not a sales team, so your feedback shapes the work straight away."],
  ["What happens after the first conversation?", "We walk through one recent example together and see where the work slowed down. If AI can genuinely help, we suggest a pilot. If it can’t, we’ll tell you."],
];

export default function Home() {
  const [activeOpportunity, setActiveOpportunity] = useState(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [leadFieldErrors, setLeadFieldErrors] = useState<Record<string, string>>({});
  const [navOpen, setNavOpen] = useState(false);
  const active = opportunities[activeOpportunity];

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setLeadSubmitting(true);
    setLeadError("");
    setLeadFieldErrors({});

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await response.json() as { message?: string; fields?: Record<string, string>; lead?: { name: string; email: string; company: string; role: string } };

      if (!response.ok || !payload.lead) {
        setLeadError(payload.message ?? "Please check the required details.");
        setLeadFieldErrors(payload.fields ?? {});
        return;
      }

      setLeadSubmitted(true);
      track("lead_submitted");
      form.reset();
    } catch {
      setLeadError("We could not check those details right now. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  const selectOpportunityFromKeyboard = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex = currentIndex;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % opportunities.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + opportunities.length) % opportunities.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = opportunities.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveOpportunity(nextIndex);
    requestAnimationFrame(() => {
      document.getElementById(`opportunity-tab-${opportunities[nextIndex].id}`)?.focus();
    });
  };

  return <main id="top">
    <header className="site-header"><div className="header-inner">
      <a className="wordmark" href="#top" aria-label="Xplormate home"><img className="brand-logo" src="/xplormate-logo.jpg" alt="" width="44" height="44" /><span>Xplormate<span className="brand-dot">.</span></span></a>
      <button className="mobile-nav-toggle" type="button" aria-label={navOpen ? "Close navigation" : "Open navigation"} aria-expanded={navOpen} aria-controls="site-navigation" onClick={() => setNavOpen((open) => !open)}>{navOpen ? <X size={18} /> : <Menu size={18} />}</button>
      <nav className={`site-nav${navOpen ? " is-open" : ""}`} id="site-navigation" aria-label="Main navigation"><a href="#explorer" onClick={() => setNavOpen(false)}>Where AI fits</a><a href="#approach" onClick={() => setNavOpen(false)}>How a pilot works</a><a href="#questions" onClick={() => setNavOpen(false)}>FAQ</a></nav>
      <a className="header-cta" href="#contact" onClick={() => setNavOpen(false)}>Talk to us <ArrowUpRight size={17} /></a>
    </div></header>

    <section className="hero">
      <img className="hero-image" src="/xplormate-hero.webp" alt="Modern manufacturing floor during an active shift" fetchPriority="high" decoding="async" />
      <div className="hero-shade" /><div className="hero-grid" aria-hidden="true" />
      <div className="hero-content shell">
        <div className="hero-kicker"><span className="signal-pulse" /> FOR PLANT HEADS, MDs AND OPERATIONS LEADERS</div>
        <h1>Your team shouldn’t spend<br />the day <em>chasing updates.</em></h1>
        <div className="hero-actions">
          <p>Order status, material shortages, quality issues, shift handovers. We pick one workflow your team keeps chasing and use AI to move it forward.</p>
          <div className="hero-buttons"><a className="button button-amber" href="#contact">Talk about one bottleneck <ArrowRight size={19} /></a><a className="button button-ghost" href="#explorer">See where AI fits</a></div>
        </div>
        <div className="hero-meta"><span>PRODUCTION / QUALITY / MAINTENANCE / MATERIALS</span></div>
      </div>
    </section>

    <section className="signal-story section-dark" id="signal-story"><div className="shell">
      <div className="section-topline"><span>01 / THE OPERATING LOOP</span><span>ILLUSTRATIVE WORKFLOW</span></div>
      <div className="section-heading split-heading"><h2>An update should lead<br />to something happening.</h2><p>Knowing about a problem is only the start. What matters is what happens next, who owns it, and how everyone knows it’s done.</p></div>
      <div className="signal-visual"><img src="/operational-signal.webp" alt="Close-up of industrial machinery and an active sensor" loading="lazy" decoding="async" /><div className="signal-overlay">
        <div className="signal-alert"><span className="alert-icon">!</span><div><small>NEW ISSUE</small><strong>Material shortage before next shift</strong></div><span className="signal-time">14:32</span></div>
        <div className="signal-trace" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="stage-grid">{stages.map((stage) => { const Icon = stage.icon; return <article key={stage.title} className="stage-card"><div className="stage-head"><span>{stage.number}</span><Icon size={20} strokeWidth={1.5} /></div><h3>{stage.title}</h3><p>{stage.copy}</p></article>; })}</div>
      </div></div>
    </div></section>



    <section className="explorer section-dark" id="explorer"><div className="shell">
      <div className="section-topline"><span>02 / WHERE AI FITS</span><span>PICK AN AREA</span></div>
      <div className="section-heading split-heading"><h2>Where could work<br />move differently?</h2><p>Work rarely stalls because information is missing. It stalls because the next step isn’t clear. Pick an area to see where it slows down, what AI would do, and what your team still decides.</p></div>
      <div className="explorer-grid"><div className="explorer-tabs" role="tablist" aria-label="Manufacturing operating areas">{opportunities.map((item, index) => <button key={item.id} id={`opportunity-tab-${item.id}`} role="tab" aria-selected={activeOpportunity === index} aria-controls="opportunity-panel" tabIndex={activeOpportunity === index ? 0 : -1} onClick={() => setActiveOpportunity(index)} onKeyDown={(event) => selectOpportunityFromKeyboard(event, index)}><span>{item.index}</span>{item.label}<ArrowRight size={18} /></button>)}</div>
        <div className="explorer-panel" id="opportunity-panel" role="tabpanel" aria-labelledby={`opportunity-tab-${active.id}`}><div className="panel-orbit" aria-hidden="true"><span /><span /><span /></div><div className="panel-index">{active.index}</div><h3>{active.title}</h3><div className="panel-facts"><div><small>WHERE IT SLOWS DOWN</small><p>{active.friction}</p></div><div><small>WHAT AI DOES</small><p>{active.ai}</p></div><div><small>WHAT YOUR TEAM DECIDES</small><p>{active.human}</p></div></div><div className="panel-footer"><div><small>WHAT WE’D MEASURE</small><strong>{active.measure}</strong></div><div><small>FIRST QUESTION WE’D ASK</small><strong>{active.question}</strong></div></div></div>
      </div>
    </div></section>

    <section className="approach section-ivory" id="approach"><div className="shell">
      <div className="section-topline dark"><span>03 / HOW A PILOT WORKS</span><span>ONE WORKFLOW AT A TIME</span></div>
      <div className="approach-layout"><div className="approach-intro"><h2>Start small. Judge it by your own numbers.</h2><p>No big transformation programme. We take one workflow that repeats every day, run a small paid pilot on it, and measure it the way you already measure your plant.</p><a href="#contact">Talk about one bottleneck <ArrowUpRight size={18} /></a></div><div className="approach-steps">{[["01", "Pick one workflow", "Choose something that repeats and takes too much chasing, like order status, material readiness, or quality closures."], ["02", "Sit with the people who run it", "We spend time with whoever handles it day to day and walk through recent real examples, not a slide deck."], ["03", "Map what really happens", "Who asks whom, where it waits, which spreadsheet or WhatsApp group it lives in, and what “done” means."], ["04", "Run a small paid pilot", "AI takes on the follow-up work for that one workflow. You set the number that decides whether it worked."]].map(([n, title, copy]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
      <div className="promise-row">{[["Nothing gets replaced", "We work with the systems your plant already runs on, whatever they are."], ["People stay in charge", "AI drafts and flags. Your team approves anything that matters."], ["You set the measure", "Success is defined by your KPI, agreed before the pilot starts."]].map(([title, copy]) => <div key={title}><Check size={18} /><div><strong>{title}</strong><p>{copy}</p></div></div>)}</div>
    </div></section>


    <section className="faq section-ivory" id="questions"><div className="shell faq-grid"><div className="faq-intro"><div className="section-topline dark"><span>04 / PRACTICAL QUESTIONS</span></div><h2>Before we talk.</h2><p>Clear expectations make the first conversation more useful.</p></div><div className="faq-items">{faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="contact section-dark" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="shell contact-grid">
        <div>
          <div className="section-topline"><span>05 / START THE CONVERSATION</span></div>
          <h2>What does your team <em>keep chasing?</em></h2>
        </div>
        <div className="contact-content">
          <p>Share a few details and we’ll reply personally.</p>
          {!leadSubmitted ? (
            <form className="lead-form" onSubmit={handleLeadSubmit}>
              <div className="lead-form-grid">
                <label className={leadFieldErrors.name ? "has-error" : undefined} htmlFor="lead-name">
                  <span>Name <i className="required-mark" aria-hidden="true">*</i></span>
                  <input id="lead-name" name="name" type="text" autoComplete="name" required aria-required="true" maxLength={120} aria-invalid={Boolean(leadFieldErrors.name)} aria-describedby={leadFieldErrors.name ? "lead-name-error" : undefined} />
                  {leadFieldErrors.name ? <small className="field-error" id="lead-name-error">{leadFieldErrors.name}</small> : null}
                </label>
                <label className={leadFieldErrors.email ? "has-error" : undefined} htmlFor="lead-email">
                  <span>Email <i className="required-mark" aria-hidden="true">*</i></span>
                  <input id="lead-email" name="email" type="email" autoComplete="email" required aria-required="true" maxLength={254} aria-invalid={Boolean(leadFieldErrors.email)} aria-describedby={leadFieldErrors.email ? "lead-email-error" : undefined} />
                  {leadFieldErrors.email ? <small className="field-error" id="lead-email-error">{leadFieldErrors.email}</small> : null}
                </label>
                <label className={leadFieldErrors.company ? "has-error" : undefined} htmlFor="lead-company">
                  <span>Company <i className="required-mark" aria-hidden="true">*</i></span>
                  <input id="lead-company" name="company" type="text" autoComplete="organization" required aria-required="true" maxLength={160} aria-invalid={Boolean(leadFieldErrors.company)} aria-describedby={leadFieldErrors.company ? "lead-company-error" : undefined} />
                  {leadFieldErrors.company ? <small className="field-error" id="lead-company-error">{leadFieldErrors.company}</small> : null}
                </label>
                <label className={leadFieldErrors.role ? "has-error" : undefined} htmlFor="lead-role">
                  <span>Role <i className="required-mark" aria-hidden="true">*</i></span>
                  <input id="lead-role" name="role" type="text" autoComplete="organization-title" required aria-required="true" maxLength={120} aria-invalid={Boolean(leadFieldErrors.role)} aria-describedby={leadFieldErrors.role ? "lead-role-error" : undefined} />
                  {leadFieldErrors.role ? <small className="field-error" id="lead-role-error">{leadFieldErrors.role}</small> : null}
                </label>
                <label className={`field-wide${leadFieldErrors.challenge ? " has-error" : ""}`} htmlFor="lead-challenge">
                  <span>What does your team keep chasing? <i className="optional-mark">optional</i></span>
                  <textarea id="lead-challenge" name="challenge" rows={4} maxLength={2000} placeholder="e.g. Every morning we call suppliers and check Excel to find which orders are short on material." aria-invalid={Boolean(leadFieldErrors.challenge)} aria-describedby={leadFieldErrors.challenge ? "lead-challenge-error" : undefined} />
                  {leadFieldErrors.challenge ? <small className="field-error" id="lead-challenge-error">{leadFieldErrors.challenge}</small> : null}
                </label>
              </div>
              {leadError ? <p className="form-error" role="alert" aria-live="polite">{leadError}</p> : null}
              <button className="button button-amber" type="submit" disabled={leadSubmitting} aria-busy={leadSubmitting}>
                {leadSubmitting ? "Sending" : "Start a conversation"} <ArrowUpRight size={20} />
              </button>
              <small className="form-note">Name, email, company and role are required. Your details are only used to reply to you.</small>
            </form>
          ) : (
            <div className="lead-success" aria-live="polite">
              <p>Thanks, we’ve received your details and will get back to you personally.</p>
              <button className="text-button" type="button" onClick={() => { setLeadSubmitted(false); setLeadError(""); setLeadFieldErrors({}); }}>Submit another response</button>
            </div>
          )}
        </div>
      </div>
    </section>

    <footer className="site-footer section-dark"><div className="shell footer-grid"><a className="wordmark" href="#top" aria-label="Xplormate home"><img className="brand-logo" src="/xplormate-logo.jpg" alt="" width="44" height="44" /><span>Xplormate<span className="brand-dot">.</span></span></a><p>AI transformation for manufacturing operations.</p><address className="footer-address"><MapPin size={15} strokeWidth={1.5} /><span>BTM, 2nd Stage,<br />Bengaluru, 560076</span></address><div className="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href={`mailto:${businessEmail}`}><Mail size={15} /> Email</a><a href={linkedinProfile} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} /></a></div></div></footer>
  </main>;
}
