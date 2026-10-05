# Decision memo: Cover recommendation v1

> **AI-assisted draft on synthetic data — not approved for publication or rollout.** Numbers must be verified against the linked validated evidence.

**Decision:** progressive rollout with a 10% holdout and customer-outcome monitoring.

## Why we tested

Mobile visitors abandoned disproportionately at cover selection. The behavioural evidence pointed to decision overload and unclear differentiation, rather than a technical form issue.

## What changed

The treatment highlighted one cover as “Recommended for you” with a short explanation. It retained visible alternatives, clear prices, and customer control.

## Result

| Metric | Control | Treatment | Difference (95% CI) | Assessment |
| --- | ---: | ---: | --- | --- |
| Quote completion | 18.4% | 21.0% | +2.6pp (+0.7, +4.5) | Supports hypothesis |
| Form error rate | 1.8% | 1.7% | −0.1pp (−0.6, +0.4) | Guardrail clear |
| Support intent | 4.2% | 4.5% | +0.3pp (−0.5, +1.1) | Guardrail clear |
| Completion time | 4m 48s | 4m 37s | −11s (−3.8%) | Guardrail clear |

The primary confidence interval excludes zero and guardrails did not breach pre-registered limits. This does not establish that the recommendation is best for every customer or journey; it supports a measured rollout for this mobile audience.

## Next steps

1. Roll out to 25%, then 50%, while retaining a 10% holdout.
2. Monitor quote acceptance, cancellation, and customer contact downstream where data access and governance allow.
3. Test the explanation language separately; do not conflate message quality with the recommendation pattern.
