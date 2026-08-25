# QA and tracking plan

Vendor-specific setup, failure behaviour, and deployment sequencing are defined in the [LaunchDarkly and Amplitude production implementation](production-implementation.md).

## Pre-launch release gate

- [ ] Assignment is stable on refresh, return visit, and authenticated handoff.
- [ ] One visitor can receive only one variant.
- [ ] All experiment events include `experiment_id`, `variant`, and a non-PII visitor identifier.
- [ ] Control and treatment are visually correct on current iOS Safari, Android Chrome, desktop Chrome, Edge, and Safari.
- [ ] Keyboard navigation, focus order, and screen-reader labels are valid.
- [ ] Price, coverage terms, and recommendation explanation have content-owner approval.
- [ ] Event payloads have been validated in debug mode and the warehouse.
- [ ] A kill switch and named rollback owner are available.

## During the run

Monitor technical health daily. Do not use daily conversion fluctuations to decide the outcome.

| Check | Trigger | Action |
| --- | --- | --- |
| Sample-ratio mismatch | Allocation meaningfully differs from 50/50 | Pause interpretation; inspect targeting and assignment |
| Event loss | Key event volume shifts unexpectedly | Reconcile client/server instrumentation |
| Error guardrail | >0.5pp treatment increase | Investigate and consider rollback |
| Support intent | >1.0pp treatment increase | Review comprehension evidence |
| Severe customer harm | Verified material impact | Stop and roll back |

## After the run

Lock the dataset, confirm exclusions, calculate the pre-specified primary analysis, and report confidence intervals—not only a p-value. Preserve the raw query, decision memo, variant screenshots, and outcome in the experiment library.
