---
title: "Cover the shift. Keep the balance."
catchphrase: "Making shift swaps understandable for the person asking, the person covering and the manager responsible."
summary: "A scheduling experience that makes coverage, consent and constraints visible together."
role: "Senior product designer"
timeline: "Concept · 8-week delivery proposal"
team: "Proposed: designer, PM, 2 engineers, operations partner"
tools: ["Journey mapping", "Service blueprint", "Interaction design", "Usability testing"]
tags: ["Complex workflows", "Service design", "Mobile"]
company: "Tandem"
specialty: "Senior product design"
theme: "tandem"
skills: ["Problem framing", "Systems thinking", "Interaction design", "Cross-functional delivery"]
lesson: "Show the constraint that shaped your decision, not just the screen you designed."
year: 2026
featured: true
order: 2
fictional: true
---

## Problem

### A swap is only successful when the whole shift still works.

Tandem is a fictional scheduling product for community venues. A worker needs Thursday evening off. A colleague can cover it, but only if the new arrangement respects availability, required skills and rest periods. In the scenario, these checks happen across messages and a manager’s spreadsheet.

The initial brief asks for an easier swap button. I would reframe it around the complete service: request, eligibility, consent, review and a reliable schedule update. A faster request can create more manager work if it hides the constraints.

The proposed discovery combines support-ticket review, observation of a scheduling cycle and separate conversations with workers and managers. These are planned activities, not research already performed. The key unknown is whether cover usually starts with a named colleague or an open request.

## Solution

### I made coverage a visible shared state, rather than a chain of private messages.

The proposal begins with the shift, not a blank message. Date, hours, location and required role travel with the request. The worker chooses an eligible colleague or opens the request to the team. Eligibility is explained in plain language without exposing another worker’s private availability details.

**Protect both people’s agency.** Offering cover does not silently accept a schedule change. The recipient sees the full shift and explicitly agrees. Until manager review completes, the original assignment remains in force. Withdrawal and rejection are first-class states.

**Explain constraints at the decision point.** If a candidate lacks the required role or would violate a configured rest rule, the UI explains what prevents the swap. The platform would evaluate venue policy and local rules on the server; the browser concept does not implement employment law.

**Keep the manager’s decision small.** A review shows the before-and-after roster and flags any remaining coverage gap. I chose a focused review instead of adding chat to every request. A message history can provide context, but the schedule needs one authoritative state.

The illustrative mobile artifact shows one shift and two potential colleagues. The interaction below lets visitors choose a day and request cover locally. A visible pending state demonstrates that asking for cover is not the same as receiving approval.

## Impact

### Measure successful cover, and the coordination work it removes.

This is a proposed concept with no measured business results. The release plan would start with a single venue and compare against its existing process.

- **Primary outcome:** eligible swaps completed before the shift starts, with both workers’ consent.
- **Coordination cost:** manager touches and messages required per successful swap.
- **Quality:** uncovered shifts, duplicate assignments and requests mistakenly believed to be approved.
- **Inclusion:** completion by workers using a phone, larger text or assistive technology.

A lower request time would not count as success if managers spend longer cleaning up exceptions. The pilot should include failed and withdrawn requests, not just the happy path.

## How I used AI

### Use AI to explore exceptions, then validate the rules with operations.

An appropriate use of AI would be to generate candidate edge cases from an anonymized service blueprint: a colleague withdraws, a shift changes while approval is pending, or two people offer cover. Operations must validate the scenarios and engineers must specify the authoritative rules.

I would avoid submitting identifiable worker schedules to a public model. The example fixtures here are invented. AI can expand the question set; it cannot settle a policy or substitute for worker consent.

## Lessons

### The strongest senior work often makes an invisible dependency visible.

The interesting design decision is not the shape of the swap button. It is keeping the old assignment valid until a complete replacement exists. That decision crosses interaction design, operations and backend state.

For a personal case study, add your real rejected alternative, the constraint behind it and the observation that changed your initial framing. That is the evidence of senior judgment.
