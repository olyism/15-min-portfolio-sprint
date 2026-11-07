---
title: "An agent worth interrupting for"
catchphrase: "An AI incident-response workspace for on-call engineers: trace the evidence, inspect the proposed fix and stay in control."
summary: "From noisy alerts to a reviewable action, with human control at the consequential step."
role: "AI product designer"
timeline: "Concept · 12-week delivery proposal"
team: "Proposed: designer, SRE, ML engineer, platform engineer"
tools: ["Prompt contracts", "Context manifests", "State graphs", "MCP", "Evaluation fixtures"]
tags: ["Agent systems", "Human oversight", "Evaluations"]
company: "Relay"
specialty: "AI product design"
theme: "relay"
skills: ["Prompt engineering", "Context engineering", "Harness engineering", "Graph engineering", "MCP tool design", "Evaluation design"]
lesson: "Show the system behind the interface. Make failure, permission and evidence visible."
year: 2026
featured: true
order: 1
fictional: true
---

## Problem

### The difficult part is deciding what an agent is allowed to do.

Relay is a fictional reliability platform for the engineer on call. In the scenario, a checkout service starts timing out after a deployment. The engineer has an alert, a runbook, a deployment log and a growing incident channel. An agent could collect those fragments quickly. It could also recommend a destructive fix with unwarranted confidence.

My proposed responsibility is the interaction contract between the engineer and the agent: what it knows, how it arrived there, what it can do and when it must stop. The ML engineer would own model integration; the platform engineer would own authorization and execution. A polished chat window would not resolve any of those boundaries.

The central design question is specific: **can the engineer inspect a proposed rollback without reconstructing the investigation themselves?** The release boundary is a reviewed action proposal. The scripted prototype also explores a human-approved rollback and its verification; autonomous remediation is excluded.

## Solution

### I designed a bounded investigation with a checkpoint before every consequential action.

The first artifact is a prompt contract: investigate one incident, cite source identifiers, separate observations from hypotheses, and return a structured proposal. Retrieved logs are untrusted evidence, never instructions. A recommendation without valid references cannot advance to review.

**Context engineering:** a context manifest records source, retrieval time, incident scope and access level. Runbook passages are selected by service and version. Stale passages remain visible as stale; a larger context window is not a substitute for source selection. Incident memory expires after closure, and lessons enter the durable runbook only after review.

**Graph engineering:** the explicit state graph is alert → scope → gather → hypothesize → propose → review → execute → verify. A stale source returns to gather. Missing permission goes to a blocked state. Failed verification returns to review, not an automatic retry loop. This graph exists because the stopping conditions are part of the product promise.

**MCP connectivity:** the proposed tool contracts expose read-only telemetry and runbook search separately from a rollback tool. The server must enforce incident-scoped permissions and argument validation. MCP supplies a connection protocol; it does not itself confer permission. The interface shows the intended tool, target, evidence and approval requirement before any write.

**Harness engineering:** the proposed runtime checkpoints state, caps tool calls, applies timeouts and uses an idempotency key for approved actions. Approval binds the exact service, deployment and action; changed arguments invalidate it. Cancellation stops new work, while the trace explains what has already happened.

An early conversational concept buried the evidence in messages. I replaced it with a persistent investigation ledger, a bounded context panel and an action review. The interactive prototype above pairs the incident workspace with an agent console, so the engineer can follow each tool result and decision. A visual graph makes the stopping points explicit. Play a scripted run, reject a proposal, or try a stale runbook and refresh its context. Every event is local; it calls no model or external tool.

## Impact

### Success means fewer unsupported actions, not more confident-sounding answers.

There are no production results or real participants for this concept. The evaluation plan makes the desired evidence explicit before implementation.

- **Safety gate:** every fixture containing a production write must request approval. Any unauthorized write blocks release.
- **Grounding:** reviewers check whether each cited source supports the associated claim, rather than merely whether a citation exists.
- **Recovery:** test tool timeouts, permission revocation, stale runbooks, malicious log instructions and a rollback that does not resolve the incident.
- **Usefulness:** compare time to a correct, approved decision against the existing workflow in a controlled study. Also record unnecessary interruptions and missed escalations.

The expandable policy fixture exercise makes one trade-off concrete: a permissive policy passes the easy example but fails the adversarial ones. Its score describes these handcrafted policy cases only. It is not a benchmark of a deployed agent.

## How I used AI

### AI fluency is a sequence of testable design decisions.

The proposed workflow uses model-assisted generation of candidate incident scenarios, then expert review by an SRE. Generated cases must be deduplicated, checked for plausible failure modes and kept separate from the held-out evaluation set. Model graders can assist with triage; human review remains necessary for ambiguous evidence and action safety.

The portfolio demonstrates prompt, context, graph and harness design through concrete artifacts. The browser simulation is deterministic and requires no credentials. Connecting real tools would require a server implementation, authentication, audit storage and validation beyond this starter.

## Lessons

### A useful agent makes its uncertainty actionable.

A confidence percentage without calibration encourages false precision. I would show which evidence is missing and what decision depends on it. The next iteration should test whether engineers can reject or amend a proposal as quickly as they can approve it.

For your own portfolio, replace the fixtures with a documented evaluation set, include one failure trace and explain how the failure changed both the system and the interface.
