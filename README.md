# A/B Testing Conversion Funnel

An end-to-end conversion-funnel experiment in an insurance journey. This portfolio project demonstrates behavioural diagnosis, prioritised hypotheses, a controlled A/B test implementation, statistically literate evaluation, and practical QA.

## Run it

Open `index.html` in a browser. No build step is required. The dashboard uses the Highcharts CDN for its interactive charts.

## What to explore

- **Experiment dashboard** — a stakeholder-ready decision view with guardrails, confidence intervals, and device-level results.
- **Quote-flow prototype** — switch between control and treatment to inspect the live A/B test experience.
- **Experiment plan** — method, sample-size rationale, tracking plan, and decision rules.
- **Production implementation** — LaunchDarkly assignment, Amplitude instrumentation, consent handling, rollout, and rollback.
- **Roadmap** — a transparent prioritisation model across a realistic insurance journey.

## Case summary

**Problem:** mobile visitors who reach coverage selection abandon at a materially higher rate than desktop visitors. Session replay and form analytics indicate decision overload: three packages, optional add-ons, and price information compete for attention on a small screen.

**Hypothesis:** presenting one recommended cover with a concise comparison and reassurance copy will increase mobile quote completion without increasing pricing confusion or support-contact intent.

**Result:** the treatment increased mobile quote completion by **2.6 percentage points** (95% CI: 0.7–4.5pp), with no adverse guardrail signal. The simulated recommendation is to roll out progressively and monitor customer outcome metrics.

All customer data in this repository is synthetic.

## Repository map

```text
index.html               Interactive portfolio dashboard and quote prototype
assets/                  Styles and dashboard behaviour
data/                    Synthetic experiment snapshot
sql/                     Reproducible funnel and SRM queries
docs/                    Design, production implementation, roadmap, QA, and readout documents
```

## Principles demonstrated

- Primary metric, guardrails, decision rules, and sample size specified before analysis.
- Intention-to-treat analysis with one visitor-level assignment per experiment.
- Segment results used to explain outcomes, not to hunt for significance.
- Customer comprehension and error rate protected alongside conversion.
- A test is not a launch until instrumentation, browser/device QA, and rollback are verified.
