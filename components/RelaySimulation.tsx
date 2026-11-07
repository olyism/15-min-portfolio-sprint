"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import script from "@/content/relay-demo.json";
import { RelayGlyph } from "./icons";
import { initialRelayState, relayIsBlocked, relayReducer } from "@/lib/relay-simulation";

export function RelaySimulation() {
  const [state, dispatch] = useReducer(relayReducer, false, initialRelayState);
  const [inspected, setInspected] = useState<number | null>(null);
  const trace = useRef<HTMLOListElement>(null);
  const staleGate = state.step === 3 && state.stale && !state.refreshed;
  const rejected = state.decision === "rejected";
  const finished = state.step === 7;
  const reviewing = state.step === 5 && !rejected;
  const current = rejected ? { ...script.steps[state.step], ...script.rejected } : staleGate ? { ...script.steps[3], ...script.stale } : script.steps[state.step];
  const selected = inspected === null || inspected === state.step ? current : script.steps[inspected];
  const status = rejected ? "Rejected" : staleGate ? "Context expired" : reviewing ? "Awaiting your approval" : finished ? "Sample recovered" : state.playing ? "Investigating" : state.step > 0 ? "Paused" : "Ready to investigate";

  useEffect(() => {
    if (!state.playing) return;
    const timer = window.setTimeout(() => dispatch({ type: "tick" }), 1700);
    return () => window.clearTimeout(timer);
  }, [state.playing, state.step]);

  useEffect(() => {
    if (trace.current) trace.current.scrollTop = trace.current.scrollHeight;
  }, [state.step, state.decision, state.refreshed]);

  function reset(stale = state.stale) { dispatch({ type: "reset", stale }); setInspected(null); }

  return <section id="try-it" className="relay-simulation" aria-labelledby="playground-title">
    <div className="relay-demo-intro"><h2 id="playground-title">{script.title}</h2><p>{script.intro}</p></div>
    <div className="relay-player">
      <div className="relay-transport">
        <div className="relay-controls">
          <button className="relay-primary" type="button" disabled={relayIsBlocked(state)} onClick={() => { setInspected(null); dispatch({ type: state.playing ? "pause" : "play" }); }}><RelayGlyph type={state.playing ? "pause" : "play"} /> {state.playing ? "Pause" : state.step === 0 ? "Play investigation" : "Resume"}</button>
          <button type="button" disabled={relayIsBlocked(state)} onClick={() => { setInspected(null); dispatch({ type: "pause" }); dispatch({ type: "tick" }); }}>Next step</button>
          <button type="button" onClick={() => reset()}>Restart</button>
        </div>
        <label className="relay-scenario">Scenario<select value={state.stale ? "stale" : "normal"} onChange={e => reset(e.target.value === "stale")}><option value="normal">Fresh evidence</option><option value="stale">Stale runbook</option></select></label>
      </div>
      <div className="relay-stage">
        <div className="relay-workspace">
          <header className="relay-app-header"><div><p className="relay-eyebrow">Investigations / {script.id}</p><h3>{script.incident}</h3></div><span className="relay-state" data-alert={staleGate || rejected}>{status}</span></header>
          <div className="relay-metrics"><div><span>Service</span><strong>Checkout</strong></div><div><span>p95 latency</span><strong>{finished ? "240ms" : "2.4s"}</strong></div><div><span>Write access</span><strong>{state.decision === "approved" ? "Approved · P01" : "Approval gated"}</strong></div></div>
          <div className="relay-graph-heading"><h4>Investigation graph</h4><span>Select a node to inspect</span></div>
          <ol className="relay-graph" aria-label="Investigation state graph">
            {script.nodes.map((node, index) => <li key={node} data-complete={index < state.step} data-current={index === state.step} data-locked={index > state.step}><button type="button" disabled={index > state.step} aria-current={index === state.step ? "step" : undefined} aria-pressed={inspected === index} onClick={() => setInspected(index)}><span aria-hidden="true" className="relay-node-icon">{index < state.step ? <RelayGlyph type="done" /> : index === 5 ? <RelayGlyph type="review" /> : String(index + 1).padStart(2, "0")}</span><span>{node}</span><small>{index < state.step ? "Complete" : index === state.step ? "Current" : "Waiting"}</small></button></li>)}
          </ol>
          <div className="relay-evidence">
            {inspected !== null && <div className="relay-evidence-heading"><span>Inspecting {script.nodes[inspected]}</span><button type="button" onClick={() => setInspected(null)}>Back to current</button></div>}
            <h4>{selected.title}</h4><p>{selected.detail}</p><p className="relay-source">{selected.evidence}</p>
            {reviewing && <div className="relay-approval"><p>Production write · Checkout · 8f3a → 8f29</p><div className="relay-controls"><button className="relay-primary" type="button" onClick={() => { setInspected(null); dispatch({ type: "approve" }); }}>Approve simulated rollback</button><button type="button" onClick={() => { setInspected(null); dispatch({ type: "reject" }); }}>Reject proposal</button></div></div>}
            {staleGate && <button className="relay-primary" type="button" onClick={() => { setInspected(null); dispatch({ type: "refresh" }); }}>Refresh context</button>}
            {(rejected || finished) && <button type="button" onClick={() => reset()}>Replay investigation</button>}
          </div>
        </div>
        <aside className="relay-console" aria-label="Agent console">
          <header><div><span className="relay-console-dot" aria-hidden="true" /><h3>Agent console</h3></div><span>Scripted trace</span></header>
          <div className="relay-console-meta"><span>Scope / {script.source}</span><span>Tools / simulated · no network</span></div>
          <ol ref={trace}>{script.steps.slice(0, state.step + 1).map((event, index) => <li key={event.tool} data-current={index === state.step}><div><time>{event.time}</time><span>{event.tool}</span></div><p>{index === 3 && state.stale ? script.stale.console : event.console}</p>{index === 3 && state.refreshed && <p className="relay-console-success">context.refresh → runbook v14. Freshness passed.</p>}</li>)}{rejected && <li><div><span>approval.rejected</span></div><p>{script.rejected.console}</p></li>}</ol>
          <footer><span>Approval</span><strong>{rejected ? "Denied" : state.decision === "approved" ? "P01 · approved by you" : "No writes authorized"}</strong></footer>
        </aside>
      </div>
      <p className="relay-live-status" role="status">{current.title} {reviewing ? "Choose approve or reject to continue." : staleGate ? "Refresh context to continue." : ""}</p>
    </div>
    <p className="relay-demo-notice">{script.notice}</p>
  </section>;
}
