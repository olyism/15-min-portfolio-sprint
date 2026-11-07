---
# Sample project: replace with your own. The file name is the URL: /projects/agent-onboarding
title: Onboarding in 40 minutes
catchphrase: How we took self-serve setup from four days to forty minutes, by prototyping with AI agents instead of slide decks.
summary: Self-serve onboarding rebuilt with agent-built prototypes. Time-to-value down 99%.
role: Lead product designer and design engineer
timeline: 2025 · 10 weeks
team: 1 PM, 3 engineers, 1 data analyst
tools: [Figma, Claude Code, Next.js, Amplitude]
tags: [Product design, Growth, AI prototyping]
year: 2025
featured: true
order: 1
coverPrompt: "A laptop on a pale stone desk showing a calm, minimal onboarding checklist UI with three steps, one ticked, soft morning light"
gallery:
  - prompt: "Close-up of a phone showing a friendly setup progress screen with a large circular progress ring, studio lighting"
    caption: The new setup progress screen
  - prompt: "Whiteboard with sticky notes mapping a customer journey, shallow depth of field, bright office"
    caption: Mapping where trials stalled
---

## Problem

### New customers took four days to see any value, and most gave up before they did.

Northwind sells workflow software to operations teams. Trials converted well *if* a customer connected their data, but only 31% ever did. The rest got lost between "sign up" and "first useful report".

Setup asked for API keys, field mapping and team invites up front, before showing anything. Support was answering the same twelve questions every day. The business goal was clear: **lift trial-to-paid without adding headcount.**

## Solution

### I replaced the setup form with a guided first win, and tested it in production in two weeks rather than two months.

I started with the data, not the screens. Session recordings and funnel analysis showed people weren't confused by the form. They didn't understand *why* they were filling it in.

So we flipped the order: **show value first, ask for effort later.** New users start with sample data shaped like their industry, see a working report in under a minute, then swap in their own data one source at a time.

Key decisions:

- **A golden path, not a wizard.** One recommended route with a clear finish line. Everything else waits until later.
- **Progress you can feel.** A three-step checklist that ticks off as the app sees real activity, not when you click "next".
- **Prototypes in code, not Figma.** Interactions that depend on real data are hard to fake, so I built them in Next.js with real APIs.

## Impact

### Time-to-value fell from 4 days to 40 minutes, and trial-to-paid rose 18%.

- **Increased efficiency:** median time to first report went from 4 days to 40 minutes.
- **Drove revenue:** trial-to-paid conversion up **18%** in the first full quarter, about $640k in annual recurring revenue.
- **Saved money:** onboarding support tickets down **42%**, freeing about one support person's time.

## How I used AI

### Agents built the scaffolding, so I could spend my time on the decisions.

- **Prototyping:** I used Claude Code to turn sketches into working Next.js prototypes connected to our staging API. Five variations took four days instead of three weeks.
- **Synthesis:** I fed 140 support tickets and 30 interview transcripts through a tagging prompt, then checked a random 20% by hand. We had themes in a day.
- **Sample data:** an LLM generated realistic, industry-specific sample data sets, checked against a schema so the demo reports never broke.

What I didn't hand off was choosing *what* to test, and deciding when a result was real.

## Lessons

### A working prototype beats a beautiful one when the risk is behavioural.

If I did it again I'd bring support into the first workshop, not the third. They knew the twelve questions before the data did. And I'd write the success metric on the wall on day one. It made every scope argument shorter.
