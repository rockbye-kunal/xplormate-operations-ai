"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Boxes, Check, ChevronDown, CircleAlert, ClipboardCheck, Clock3, Database, Factory, Gauge, MessageSquareText, ShieldCheck, Users, Wrench } from "lucide-react";

const linkedinProfile = "https://www.linkedin.com/in/jeetendra-yadav-4363457a/";
const linkedinCompany = "https://www.linkedin.com/company/xplormate/";

const problems = [
  { number: "01", icon: Clock3, title: "Production follow-ups", question: "Where are we on this order?", copy: "Updates move across plans, spreadsheets, meetings, and messages. Managers keep rebuilding the same picture before they can act.", signal: "Order status changed", measure: "Time spent chasing status" },
  { number: "02", icon: ClipboardCheck, title: "Quality issue closure", question: "Who owns this issue — and is it actually closed?", copy: "Detection may be recorded, while investigation, corrective action, approval, and evidence continue through separate channels.", signal: "Deviation raised", measure: "Detection to verified closure" },
  { number: "03", icon: Wrench, title: "Shift & maintenance handovers", question: "Did the next person receive the full context?", copy: "Open problems cross shifts and departments. The action survives, but the history and reasoning often do not.", signal: "Open issue at handover", measure: "Unresolved handovers" },
  { number: "04", icon: Boxes, title: "Material readiness", question: "What could interrupt tomorrow’s plan?", copy: "Inventory records exist, yet the operational consequence, responsible person, and next action still need manual coordination.", signal: "Material at risk", measure: "Time to identify a blocker" },
];

const opportunities = [
  { id: "production", label: "Production", index: "01", title: "Production planning & execution", friction: "The plan changes, but the updated priority and its impact do not reach every owner at the same time.", ai: "Gather current context, highlight deviations, and prepare the next follow-up for review.", human: "Confirm the operational priority and approve changes that affect the plan.", measure: "Follow-up effort and response time", question: "Where do plan-versus-actual updates live today?" },
  { id: "quality", label: "Quality", index: "02", title: "Quality management", friction: "Corrective actions require repeated follow-up, and closure evidence can be difficult to assemble.", ai: "Organise context, identify missing evidence, and support accountable owner follow-ups.", human: "Approve disposition, validate corrective action, and verify closure.", measure: "Time from issue detection to verified closure", question: "Where are issues, actions, and evidence currently recorded?" },
  { id: "maintenance", label: "Maintenance", index: "03", title: "Maintenance coordination", friction: "Requests, observations, spares, and production constraints arrive through different channels.", ai: "Connect the available context, surface missing inputs, and keep the next action visible.", human: "Set priority, approve safety-sensitive work, and confirm equipment readiness.", measure: "Open-request age and repeat follow-ups", question: "How does a maintenance request move from report to verified completion?" },
  { id: "materials", label: "Materials", index: "04", title: "Materials & procurement", friction: "A late component becomes urgent only after its effect on production is manually understood.", ai: "Relate material signals to orders, timing, and ownership, then prepare an exception summary.", human: "Validate the constraint and decide the supplier or planning response.", measure: "Time from risk signal to owned action", question: "Which sources are checked before material readiness is confirmed?" },
  { id: "handovers", label: "Handovers", index: "05", title: "Shift handovers", friction: "The incoming team receives a list of issues without the full context, decision history, or clear owners.", ai: "Structure open items, carry forward context, and flag what still needs acknowledgement.", human: "Confirm what was handed over and accept responsibility for the next step.", measure: "Missed or repeatedly explained open items", question: "How is acknowledgement captured between shifts?" },
  { id: "reporting", label: "Reporting", index: "06", title: "Operational reporting", friction: "Teams spend time collecting updates before leaders can understand what needs attention.", ai: "Compile updates, separate exceptions from routine activity, and make missing context explicit.", human: "Interpret trade-offs and decide where management attention is required.", measure: "Preparation time and missing-update rate", question: "Which recurring report depends most on manual consolidation?" },
];

const stages = [
  { number: "01", title: "Signal", copy: "A material shortage is reported before the next shift.", icon: CircleAlert },
  { number: "02", title: "Context", copy: "Affected orders, timing, messages, and available stock are connected.", icon: Database },
  { number: "03", title: "Owner", copy: "The right buyer and planner receive a clear, shared operating picture.", icon: Users },
  { number: "04", title: "Action", copy: "AI prepares the follow-up and surfaces exceptions for review.", icon: MessageSquareText },
  { number: "05", title: "Closure", copy: "A person confirms the response, updates the plan, and closes the loop.", icon: Check },
];

const faq = [
  ["Where can AI fit within manufacturing operations?", "A useful starting point is usually a recurring coordination task: gathering updates, connecting context, routing an exception, preparing a follow-up, or confirming closure. The workflow and its consequences determine what AI should support."],
  ["Would this replace our ERP or MES?", "Replacing a core system is not the starting assumption. We first look at the work surrounding your current ERP, MES, spreadsheets, email, and messaging tools, then assess what connection would actually be useful."],
  ["What if information is spread across different systems?", "That is common and part of the workflow assessment. We map where the information lives, who owns it, when it becomes available, and what can be accessed safely before suggesting an intervention."],
  ["Will AI make operational decisions independently?", "The level of autonomy depends on the task and its consequences. The workflow should explicitly define permissions, human approvals, exception handling, escalation rules, and a review trail."],
  ["How should we select the first opportunity?", "Choose a recurring task with visible coordination effort, a clear owner, accessible information, and an outcome that can be measured. A narrow workflow creates a better starting point than a broad transformation programme."],
  ["What happens after the first conversation?", "We map one recent example, identify where work slowed down, and assess whether AI is appropriate. If the opportunity is credible, the next step is a bounded workflow definition with controls and a success measure."],
];

export default function Home() {
  const [activeOpportunity, setActiveOpportunity] = useState(0);
  const active = opportunities[activeOpportunity];

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
      <a className="wordmark" href="#top" aria-label="Xplormate home"><img className="brand-logo" src="/xplormate-logo.jpg" alt="" width="44" height="44" /><span>xplormate<span className="brand-dot">.</span></span></a>
      <nav aria-label="Main navigation"><a href="#possibilities">Possibilities</a><a href="#approach">Approach</a><a href="#questions">Questions</a></nav>
      <a className="header-cta" href="#contact">Start a conversation <ArrowUpRight size={17} /></a>
    </div></header>

    <section className="hero">
      <img className="hero-image" src="/xplormate-hero.png" alt="Modern manufacturing floor during an active shift" />
      <div className="hero-shade" /><div className="hero-grid" aria-hidden="true" />
      <div className="hero-content shell">
        <div className="hero-kicker"><span className="signal-pulse" /> AI TRANSFORMATION FOR MANUFACTURING OPERATIONS</div>
        <h1>Your systems record<br />the work. <em>AI can help<br />move it forward.</em></h1>
        <div className="hero-meta"><span>PRODUCTION / QUALITY / MAINTENANCE / MATERIALS</span><span className="system-status"><i /> OPERATIONAL SIGNALS IN MOTION</span></div>
      </div>
    </section>

    <section className="signal-story section-dark" id="signal-story"><div className="shell">
      <div className="section-topline"><span>01 / THE OPERATING LOOP</span><span>ILLUSTRATIVE WORKFLOW</span></div>
      <div className="section-heading split-heading"><h2>An update should lead<br />to something happening.</h2><p>Visibility is the beginning. The useful question is what happens next, who owns it, and how the operation knows it is complete.</p></div>
      <div className="signal-visual"><img src="/operational-signal.png" alt="Close-up of industrial machinery and an active sensor" /><div className="signal-overlay">
        <div className="signal-alert"><span className="alert-icon">!</span><div><small>NEW OPERATIONAL SIGNAL</small><strong>Material shortage before next shift</strong></div><span className="signal-time">14:32</span></div>
        <div className="signal-trace" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="stage-grid">{stages.map((stage) => { const Icon = stage.icon; return <article key={stage.title} className="stage-card"><div className="stage-head"><span>{stage.number}</span><Icon size={20} strokeWidth={1.5} /></div><h3>{stage.title}</h3><p>{stage.copy}</p></article>; })}</div>
      </div></div>
      <div className="control-note"><ShieldCheck size={21} /><p>People approve consequential decisions. Every workflow should define what AI may do, when it escalates, and who signs off.</p></div>
    </div></section>

    <section className="problem-section" id="possibilities"><div className="problem-backdrop"><img src="/human-oversight.png" alt="Manufacturing professional reviewing operations from a control room" /></div><div className="shell problem-content">
      <div className="section-topline light"><span>02 / WHERE WORK SLOWS DOWN</span><span>RECOGNISE THE PATTERN</span></div>
      <div className="section-heading wide-heading"><h2>The factory rarely slows because information is completely missing.</h2><p>It slows because the next action is unclear.</p></div>
      <div className="problem-cards">{problems.map((item, index) => { const Icon = item.icon; return <article className={`problem-card offset-${index}`} key={item.title}><div className="problem-card-top"><span>{item.number}</span><Icon size={23} strokeWidth={1.35} /></div><small>{item.signal}</small><h3>{item.title}</h3><blockquote>“{item.question}”</blockquote><p>{item.copy}</p><div className="measure"><span>POSSIBLE MEASURE</span>{item.measure}</div></article>; })}</div>
    </div></section>

    <section className="transformation section-ivory" id="approach"><div className="shell">
      <div className="section-topline dark"><span>03 / WHAT TRANSFORMATION MEANS</span><span>WORK BEFORE TECHNOLOGY</span></div>
      <div className="section-heading split-heading dark-copy"><h2>AI transformation starts with changing how work moves.</h2><p>Technology earns its place when it makes a real operating process clearer, faster, and easier to control.</p></div>
      <div className="transformation-cards"><article><span>01</span><Factory size={31} strokeWidth={1.25} /><h3>Understand the operation</h3><p>Map what happens when production deviates from the plan: the trigger, people, systems, exceptions, and decisions.</p></article><article><span>02</span><Gauge size={31} strokeWidth={1.25} /><h3>Redesign the workflow</h3><p>Identify where AI can gather context, reduce coordination work, prepare actions, and surface exceptions.</p></article><article><span>03</span><ShieldCheck size={31} strokeWidth={1.25} /><h3>Keep people in control</h3><p>Define what AI can handle, what requires approval, when it must escalate, and how actions are reviewed.</p></article></div>
    </div></section>

    <section className="explorer section-dark" id="explorer"><div className="shell">
      <div className="section-topline"><span>04 / OPPORTUNITY EXPLORER</span><span>SELECT AN OPERATING AREA</span></div>
      <div className="section-heading split-heading"><h2>Where could work<br />move differently?</h2><p>Explore the coordination patterns around six common manufacturing areas. The right starting point depends on your workflow, systems, and operating constraints.</p></div>
      <div className="explorer-grid"><div className="explorer-tabs" role="tablist" aria-label="Manufacturing operating areas">{opportunities.map((item, index) => <button key={item.id} id={`opportunity-tab-${item.id}`} role="tab" aria-selected={activeOpportunity === index} aria-controls="opportunity-panel" tabIndex={activeOpportunity === index ? 0 : -1} onClick={() => setActiveOpportunity(index)} onKeyDown={(event) => selectOpportunityFromKeyboard(event, index)}><span>{item.index}</span>{item.label}<ArrowRight size={18} /></button>)}</div>
        <div className="explorer-panel" id="opportunity-panel" role="tabpanel" aria-labelledby={`opportunity-tab-${active.id}`}><div className="panel-orbit" aria-hidden="true"><span /><span /><span /></div><div className="panel-index">{active.index}</div><h3>{active.title}</h3><div className="panel-facts"><div><small>COMMON FRICTION</small><p>{active.friction}</p></div><div><small>POTENTIAL AI ROLE</small><p>{active.ai}</p></div><div><small>HUMAN RESPONSIBILITY</small><p>{active.human}</p></div></div><div className="panel-footer"><div><small>POSSIBLE SUCCESS MEASURE</small><strong>{active.measure}</strong></div><div><small>FIRST FEASIBILITY QUESTION</small><strong>{active.question}</strong></div></div></div>
      </div>
    </div></section>

    <section className="point-of-view section-amber"><div className="shell">
      <div className="section-topline dark"><span>05 / XPLORMATE POINT OF VIEW</span><span>THE OPERATIONAL LAYER</span></div>
      <div className="statement"><p>Systems provide visibility.</p><h2>Operations improve when visibility leads to action.</h2></div>
      <div className="pov-grid"><p>Most manufacturers already have systems, spreadsheets, reports, and experienced people. The opportunity is often found in the work between them: gathering context, coordinating decisions, following up with owners, managing exceptions, and confirming that an issue is truly closed.</p><p>Xplormate focuses on this operational layer. We examine how work moves today and where AI can support a faster, clearer, and more accountable process.</p></div>
    </div></section>

    <section className="approach section-ivory"><div className="shell">
      <div className="section-topline dark"><span>06 / A PRACTICAL START</span><span>ONE BOTTLENECK AT A TIME</span></div>
      <div className="approach-layout"><div className="approach-intro"><h2>Start with one operational bottleneck.</h2><p>A focused workflow gives every conversation a real trigger, responsible people, operating constraints, and an outcome worth measuring.</p><a href="#contact">Discuss a workflow <ArrowUpRight size={18} /></a></div><div className="approach-steps">{[["01", "Observe the real workflow", "Walk through a recent example: the trigger, people, tools, delays, exceptions, and decisions."], ["02", "Find the intervention", "Identify where AI could remove coordination effort or make the next action clearer."], ["03", "Define control", "Specify permissions, human approvals, escalation rules, and operational boundaries."], ["04", "Establish the measure", "Choose a practical baseline such as follow-up time, closure time, planning effort, or unresolved handovers."], ["05", "Scope the first implementation", "Define the workflow boundary, required information, responsibilities, integration needs, and expected outcome."]].map(([n, title, copy]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
    </div></section>

    <section className="evaluation section-dark"><div className="shell evaluation-grid"><div><div className="section-topline"><span>07 / BEFORE APPLYING AI</span></div><h2>Understand the operation.</h2><p>The goal is a workflow people can trust, operate, and improve.</p></div><div className="evaluation-list">{["Actual workflow and exceptions", "ERP, MES, spreadsheets, email, and messages", "Information availability and ownership", "Human approvals and escalation", "Operational and security constraints", "Current effort and delays", "A measurable definition of success"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><Check size={17} /></div>)}</div></div></section>

    <section className="faq section-ivory" id="questions"><div className="shell faq-grid"><div className="faq-intro"><div className="section-topline dark"><span>08 / PRACTICAL QUESTIONS</span></div><h2>Before we talk.</h2><p>Clear expectations make the first conversation more useful.</p></div><div className="faq-items">{faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="contact section-dark" id="contact"><div className="contact-glow" aria-hidden="true" /><div className="shell contact-grid"><div><div className="section-topline"><span>09 / START THE CONVERSATION</span></div><h2>What does your team <em>keep chasing?</em></h2></div><div className="contact-content"><p>Start with one recurring bottleneck: an update that takes too long, an issue that loses ownership, or a decision that waits for missing context.</p><a className="button button-amber" href={linkedinProfile} target="_blank" rel="noopener noreferrer">Explore your first AI transformation opportunity <ArrowUpRight size={20} /></a><small>Connect or message on LinkedIn. Mention the workflow you want to improve.</small><blockquote><span>A SIMPLE WAY TO START</span>“We spend a lot of time following up on ____. Today, it moves through ____. I’d like to explore whether there is a better way.”</blockquote></div></div></section>

    <footer className="site-footer section-dark"><div className="shell footer-grid"><a className="wordmark" href="#top" aria-label="Xplormate home"><img className="brand-logo" src="/xplormate-logo.jpg" alt="" width="44" height="44" /><span>xplormate<span className="brand-dot">.</span></span></a><p>AI transformation for manufacturing operations.</p><a href={linkedinCompany} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} /></a></div></footer>
  </main>;
}
