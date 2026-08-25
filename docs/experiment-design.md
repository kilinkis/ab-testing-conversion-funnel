# Experiment design: Cover recommendation v1

## Decision context

Mobile conversion drops most sharply between completing quote details and selecting a cover. The opportunity is not to pressure people into a higher-priced choice; it is to make the existing choices easier to understand.

## Hypothesis

For mobile visitors starting a Danish home-insurance quote, presenting a recommended cover with a short reason and concise comparison will increase quote completion by at least 1.5 percentage points compared with the current equal-weight cover selection.

## Test specification

| Item | Decision |
| --- | --- |
| Unit of randomisation | Persistent visitor ID |
| Audience | Mobile web, Danish home-insurance quote visitors |
| Allocation | 50% control / 50% treatment |
| Primary metric | Completed quote / assigned visitor |
| Primary analysis | Intention-to-treat, two-sided proportion comparison |
| Start and end | 22 July–12 August 2026, unless stop rule triggered |
| Exclusions | Employees, bots, duplicate test assignments, consent-less measurement where legally required |

## Variants

**Control:** all three cover levels carry equal visual weight. Customers compare all cover descriptions and prices before selecting.

**Treatment:** the most suitable cover is labelled “Recommended for you” with an explanatory reason. Every cover remains visible; no default selection, pre-ticked optional extra, price hiding, or scarcity message is introduced.

## Behavioural rationale

The design uses a transparent recommendation to reduce cognitive effort and support comprehension. It preserves choice and explains the basis of the recommendation. This is deliberately not a dark pattern: the customer can compare alternatives, the recommendation does not use false urgency, and price remains visible.

## Metrics and decision rules

The primary metric is quote completion per assigned visitor. Guardrails are form error rate (no increase >0.5pp), support intent (no increase >1.0pp), and median completion time (no increase >10%).

Ship progressively if the primary metric’s 95% confidence interval is wholly above zero, guardrails are within limits, telemetry QA passes, and there is no concerning adverse segment. If the interval is inconclusive, retain the learning and do not call the result a win. Stop early for a verified severe technical defect or material customer-harm signal—not merely because a dashboard looks favourable.

## Sample size

Baseline mobile quote completion is 18.4%. To detect a 1.5pp absolute lift with 80% power and a two-sided 5% alpha, the approximate requirement is 8,100 visitors per variant. The run is limited to a pre-set analysis window, avoiding repeated significance checks.

## Tracking contract

| Event | Required properties | Why it matters |
| --- | --- | --- |
| `experiment_assigned` | experiment_id, variant, visitor_id | denominator and assignment integrity |
| `cover_recommendation_viewed` | cover_id, reason_version | treatment exposure QA |
| `cover_option_selected` | cover_id, variant | behavioural mechanism |
| `quote_completed` | variant, quote_value_band | primary outcome and value check |
| `support_opened` | topic, variant | comprehension guardrail |

See the [production implementation](production-implementation.md) for the LaunchDarkly and Amplitude integration, and the [QA and tracking plan](qa-and-tracking-plan.md) for release validation.
