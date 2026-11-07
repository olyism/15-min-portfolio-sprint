"use client";

import { useState } from "react";
import { evaluatePolicy, type ProjectDemo } from "@/lib/project-demos";
import { RelaySimulation } from "./RelaySimulation";

export function ProjectPlayground({ theme, demo }: { theme: string; demo: ProjectDemo }) {
  if (theme === "relay") return <><RelaySimulation /><details className="relay-under-hood"><summary>Under the hood: policy fixtures and system contracts</summary><PolicyLab demo={demo} /></details></>;
  return <section id="try-it" className="project-playground" aria-labelledby="playground-title">
    <h2 id="playground-title">{demo.demoTitle}</h2>
    <p className="playground-intro">{demo.demoIntro}</p>
    <div className="playground-body">
      {theme === "tandem" ? <ShiftDemo demo={demo} />
        : theme === "formwork" ? <ComponentLab demo={demo} />
        : theme === "common-ground" ? <EvidenceDemo demo={demo} />
        : theme === "plainly" ? <ContentDemo demo={demo} />
        : theme === "waypoint" ? <StrategyDemo demo={demo} />
        : <CinemaDemo demo={demo} />}
    </div>
  </section>;
}
function Choices({ items, selected, onChange, label }: { items: string[]; selected: number; onChange: (n: number) => void; label: string }) {
  return <div className="demo-options" role="group" aria-label={label}>{items.map((item, i) => <button type="button" className="demo-choice" aria-pressed={selected === i} key={item} onClick={() => onChange(i)}>{item}</button>)}</div>;
}
function PolicyLab({ demo }: { demo: ProjectDemo }) {
  const [policy, setPolicy] = useState(0);
  const [ran, setRan] = useState(false);
  const cases = demo.cases ?? [];
  const results = cases.map(c => ({ ...c, actual: evaluatePolicy(c, policy === 0) }));
  const passed = results.filter(c => c.actual === c.expected).length;
  return <>
    <Choices items={["Bounded policy", "Permissive policy"]} selected={policy} onChange={n => { setPolicy(n); setRan(false); }} label="Agent policy" />
    <p className="mb-5 text-small">{policy === 0 ? "Check access, reject injected instructions, stop on tool failures, refresh stale context and review writes." : "Continue on every case. This deliberately weak policy shows why the easy case is insufficient."}</p>
    <button type="button" className="demo-button" onClick={() => setRan(true)}>Run 6 fixture cases</button>
    <p className="demo-status" role="status">{ran ? `${passed} of ${cases.length} expected decisions matched. ${passed === cases.length ? "All handcrafted policy cases pass; this does not establish model safety." : "Release gate fails: review the mismatched decisions."}` : "Choose a policy, then run the fixture set."}</p>
    {ran && <div className="demo-table-wrap"><table className="demo-table"><caption className="sr-only">Policy evaluation against fixed expected decisions</caption><thead><tr><th scope="col">Fixture</th><th scope="col">Expected</th><th scope="col">Actual</th><th scope="col">Result</th></tr></thead><tbody>{results.map(c => <tr key={c.name}><th scope="row">{c.name}</th><td>{c.expected}</td><td>{c.actual}</td><td>{c.actual === c.expected ? "Pass" : "Fail"}</td></tr>)}</tbody></table></div>}
    <div className="system-artifact">
      <h3 className="text-heading mb-4">Inspect the proposed system</h3>
      {demo.system?.map(item => <details key={item.name}><summary>{item.name}</summary><pre className="demo-code"><code>{item.content}</code></pre></details>)}
      <a className="mt-5 inline-block" href="/artifacts/relay-system.json">Open the complete design contract as JSON</a>
    </div>
  </>;
}
function ShiftDemo({ demo }: { demo: ProjectDemo }) {
  const [day, setDay] = useState(3);
  const [requested, setRequested] = useState(false);
  return <>
    <Choices items={demo.items} selected={day} onChange={n => { setDay(n); setRequested(false); }} label="Choose a sample shift" />
    <div className="demo-panel"><h3>{demo.items[day]} · {demo.shift?.hours}</h3><p>{demo.shift?.assignment}</p><p className="text-small">{demo.shift?.eligibility}</p><button className="demo-button mt-6" type="button" disabled={requested} onClick={() => setRequested(true)}>{requested ? "Cover requested" : "Ask the team for cover"}</button>
    <p className="demo-status" role="status">{requested ? "Pending colleague consent and manager review. Your original shift is still assigned. This request exists only in this browser." : "No request sent. Choose a shift to explore the next step."}</p>
    {requested && <button type="button" className="demo-choice mt-4" onClick={() => setRequested(false)}>Withdraw example request</button>}</div>
  </>;
}
function ComponentLab({ demo }: { demo: ProjectDemo }) {
  const [label, setLabel] = useState(demo.quote);
  const [density, setDensity] = useState("comfortable");
  const [corners, setCorners] = useState("soft");
  const [save, setSave] = useState("idle");
  const [copy, setCopy] = useState("");
  const code = `<button\n  type="button"\n  className="workbench-sample"\n  data-density="${density}"\n  data-corners="${corners}"\n>\n  {${JSON.stringify(label.trim() || "Save changes")}}\n</button>\n\n/* Uses the workbench-sample rules and tokens\n   in app/project-worlds.css and app/tokens.css.\n   Demo loading state requires React state. */`;
  async function copyCode() { try { await navigator.clipboard.writeText(code); setCopy("Code copied."); } catch { setCopy("Clipboard unavailable. Select and copy the code above."); } }
  function saveDemo() { setSave("saving"); window.setTimeout(() => setSave("saved"), 900); }
  return <>
    <div className="workbench-controls"><label>Button label<input maxLength={80} value={label} onChange={e => { setLabel(e.target.value); setSave("idle"); setCopy(""); }} /></label><label>Density<select value={density} onChange={e => { setDensity(e.target.value); setCopy(""); }}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select></label><label>Corners<select value={corners} onChange={e => { setCorners(e.target.value); setCopy(""); }}><option value="soft">Soft</option><option value="sharp">Sharp</option></select></label></div>
    <div className="workbench-live"><button type="button" className="workbench-sample" data-density={density} data-corners={corners} disabled={save === "saving"} onClick={saveDemo}>{save === "saving" ? "Saving…" : label.trim() || "Save changes"}</button><p className="text-caption" role="status">{save === "saved" ? "Example saved locally. No data was submitted." : save === "saving" ? "Simulating the loading state…" : "Try the button to see its loading and success states."}</p></div>
    <pre className="demo-code"><code>{code}</code></pre><button className="demo-choice" type="button" onClick={copyCode}>Copy specimen code</button><p role="status" className="demo-status">{copy}</p>
  </>;
}
function EvidenceDemo({ demo }: { demo: ProjectDemo }) {
  const [selected, setSelected] = useState(0);
  const evidence = demo.evidence ?? [];
  const item = evidence[selected];
  return <><Choices items={evidence.map(e => e.theme)} selected={selected} onChange={setSelected} label="Illustrative research theme" /><div className="demo-panel" aria-live="polite"><dl><dt>Observation · Synthetic</dt><dd>{item?.observation}</dd><dt>Possible interpretation</dt><dd>{item?.interpretation}</dd><dt>What to investigate next</dt><dd>{item?.action}</dd></dl></div></>;
}
function ContentDemo({ demo }: { demo: ProjectDemo }) {
  const [selected, setSelected] = useState(1);
  const [sent, setSent] = useState(false);
  const versions = demo.versions ?? [];
  const item = versions[selected];
  return <><Choices items={versions.map(v => v.name)} selected={selected} onChange={n => { setSelected(n); setSent(false); }} label="Compare interface content" /><div className="demo-panel"><h3>{item?.title}</h3><p className="max-w-prose">{item?.body}</p><button type="button" className="demo-button mt-6" onClick={() => setSent(true)} disabled={sent}>{sent ? "Example complete" : item?.action}</button><p role="status" className="demo-status">{sent ? item?.feedback : "Local writing specimen. No request will be sent."}</p>{sent && <button type="button" className="demo-choice mt-4" onClick={() => setSent(false)}>Reset example</button>}</div></>;
}
function StrategyDemo({ demo }: { demo: ProjectDemo }) {
  const [selected, setSelected] = useState(0);
  const bets = demo.bets ?? [];
  const bet = bets[selected];
  return <><Choices items={bets.map(b => b.name)} selected={selected} onChange={setSelected} label="Choose the first strategic investment" /><div className="demo-panel" aria-live="polite"><h3>{bet?.effort} of 8 illustrative effort units committed</h3><div className="capacity-bar" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span className={i < (bet?.effort ?? 0) ? "spent" : ""} key={i} />)}</div><p>{bet?.why}</p><p>{bet?.tradeoff}</p></div></>;
}
function CinemaDemo({ demo }: { demo: ProjectDemo }) {
  const [screening, setScreening] = useState("0");
  const [seat, setSeat] = useState("");
  const [review, setReview] = useState(false);
  const screenings = demo.screenings ?? [];
  return <><label className="block text-small">Screening<select className="screening-select mt-2" value={screening} onChange={e => { setScreening(e.target.value); setSeat(""); setReview(false); }}>{screenings.map((s, i) => <option value={String(i)} key={s}>{s}</option>)}</select></label><div className="cinema-screen">Screen</div><div className="seat-map" role="group" aria-label="Choose an example cinema seat">{Array.from({ length: 18 }, (_, i) => { const id = `${["A", "B", "C"][Math.floor(i / 6)]}${i % 6 + 1}`; const taken = [2, 7, 8, 15].includes(i); return <button type="button" className="demo-choice" disabled={taken} aria-label={`Seat ${id}${taken ? ", unavailable" : ""}`} aria-pressed={seat === id} key={id} onClick={() => { setSeat(id); setReview(false); }}>{id}</button>; })}</div><button type="button" className="demo-button" disabled={!seat} onClick={() => setReview(true)}>Review example selection</button><p role="status" className="demo-status">{review ? `${screenings[Number(screening)]} · Seat ${seat}. This is a local concept. Nothing is reserved and no payment is collected.` : seat ? `Seat ${seat} selected. Nothing is reserved.` : "Choose an available seat. Faded seats are unavailable in this sample."}</p></>;
}
