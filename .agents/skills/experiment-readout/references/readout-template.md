# Decision memo: {{experiment_name}}

> **AI-assisted draft — not approved for publication or rollout.** Numbers must be verified against the linked validated evidence.

**Proposed decision:** {{decision stated in one sentence}}

## Evidence status

| Input | Source | Status |
| --- | --- | --- |
| Pre-registered design | {{path}} | {{verified / missing / conflict}} |
| Validated result summary | {{path}} | {{verified / missing / conflict}} |
| Telemetry and assignment QA | {{path}} | {{pass / fail / incomplete}} |
| Guardrail assessment | {{path}} | {{pass / fail / incomplete}} |

## Why we tested

{{Customer problem, evidence, and pre-registered hypothesis.}}

## What changed

{{Control and treatment difference without promotional language.}}

## Results

| Metric | Control | Treatment | Difference (95% CI) | Pre-set limit | Assessment |
| --- | ---: | ---: | --- | --- | --- |
| Primary: {{metric}} | {{value; n}} | {{value; n}} | {{effect and interval}} | {{decision criterion}} | {{supported / inconclusive / negative}} |
| Guardrail: {{metric}} | {{value; n}} | {{value; n}} | {{effect and interval}} | {{limit}} | {{clear / breached / incomplete}} |

## Interpretation

**Observed:** {{What the validated result directly establishes.}}

**Interpretation:** {{Plausible meaning, calibrated to the design and uncertainty.}}

**Not established:** {{Causal mechanisms, populations, or downstream outcomes not measured by this test.}}

## Data quality and limitations

- Sample-ratio mismatch: {{status and evidence}}.
- Telemetry QA: {{status and evidence}}.
- Incidents or exclusions: {{none, or material details}}.
- Exploratory segments: {{clearly labelled findings, or none}}.
- Remaining limitation: {{important uncertainty}}.

## Next steps

1. {{Rollout, holdout, or no-change action.}}
2. {{Customer and technical monitoring.}}
3. {{Follow-up learning or instrumentation.}}

## Human review

- [ ] Analyst verified every number, denominator, unit, interval, and source.
- [ ] Engineering/analytics owner confirmed telemetry and assignment integrity.
- [ ] Product owner confirmed the proposed decision follows the pre-registered rule.
- [ ] Privacy, legal, accessibility, or compliance review is complete where required.
- [ ] Decision owner approved publication and any rollout.
