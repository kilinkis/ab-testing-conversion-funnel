---
name: experiment-readout
description: Draft or revise an evidence-grounded A/B test decision memo from a pre-registered experiment design, validated result summary, and QA evidence. Use for experiment readouts and stakeholder summaries; do not use to calculate primary statistics from raw events or to make an autonomous launch decision.
---

# Experiment Readout

Turn validated experiment evidence into a concise decision memo without changing the analysis. AI owns the wording; the analyst owns the numbers; the named decision owner owns the launch decision.

## Required evidence

Locate these inputs before drafting:

- the pre-registered hypothesis, population, metrics, thresholds, and decision rule;
- a structured, analyst-validated result summary with denominators, effect sizes, and confidence intervals;
- telemetry QA, sample-ratio mismatch, exclusions, and incident status;
- guardrail and relevant adverse-segment assessments;
- the requested output location and audience.

Read [references/readout-template.md](references/readout-template.md) before producing a memo. This repository's synthetic, validated workflow input is [data/validated-experiment-result.json](../../../data/validated-experiment-result.json). Its values are evidence only for this portfolio experiment and must never be reused for a different experiment.

If material evidence is absent or contradictory, list the missing or conflicting fields and stop short of a recommendation. Do not recover numbers from screenshots, round away an inconvenient bound, invent a cause, or silently substitute a post-hoc metric.

## Workflow

1. Build a small evidence map linking every reported number and assertion to an input file or validated field.
2. Confirm the experiment ID, audience, variants, dates, analysis unit, exclusions, and first-assignment rule agree across inputs.
3. Check data-quality gates before interpreting the outcome: telemetry QA, assignment integrity, sample-ratio mismatch, missing events, and material incidents.
4. Apply the pre-registered decision rule exactly. Never strengthen a conclusion because a point estimate looks favourable.
5. Draft the memo with the reference template. Separate observed evidence, interpretation, limitations, decision, and next steps.
6. Preserve exact metric definitions, denominators, units, confidence intervals, and threshold directions. Label exploratory segments as exploratory.
7. Add the human-review checklist and keep the document marked **AI-assisted draft** until the analyst and decision owner approve it.

When the user asks for a draft but does not name a path, write `docs/experiment-readout.ai-draft.md`. Do not overwrite an existing decision memo without explicit permission. Do not edit the HTML report, source data, SQL, experiment configuration, or production systems as a side effect of drafting.

## Decision constraints

Use the experiment's own pre-registered rule when one exists. For this repository, progressive rollout is supported only when all of the following are true:

- the primary metric's 95% confidence interval is wholly above zero;
- every guardrail remains within its pre-set limit;
- telemetry QA and assignment-integrity checks pass;
- there is no verified customer-harm signal or concerning adverse segment.

An interval crossing zero is inconclusive, not a win. A significant result with failed telemetry is uninterpretable. A guardrail or customer-harm breach blocks rollout regardless of the primary metric. Never recommend stopping early merely because an interim dashboard looks favourable.

## Output standard

Keep the memo short enough for a decision meeting. Include:

- a one-line proposed decision and review status;
- why the test ran and what changed;
- primary metric and guardrail table with denominators and intervals where available;
- data-quality status and material limitations;
- interpretation that does not exceed the evidence;
- concrete rollout, monitoring, or follow-up actions;
- local evidence references and human approval checkboxes.

Do not claim that AI performed the statistical analysis. Describe the workflow as **AI-assisted report drafting from analyst-validated evidence**.
