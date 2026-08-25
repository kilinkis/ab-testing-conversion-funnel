-- A/B Testing Conversion Funnel
-- Dialect: BigQuery Standard SQL. `analytics.events` is a synthetic event model.

-- 1. Locate the largest step-level opportunity by device.
WITH visitors AS (
  SELECT
    user_pseudo_id,
    device.category AS device,
    MAX(IF(event_name = 'quote_started', 1, 0)) AS started,
    MAX(IF(event_name = 'quote_details_completed', 1, 0)) AS details_complete,
    MAX(IF(event_name = 'cover_selected', 1, 0)) AS cover_selected,
    MAX(IF(event_name = 'quote_completed', 1, 0)) AS quote_complete
  FROM `analytics.events`
  WHERE event_date BETWEEN '20260701' AND '20260721'
    AND geo.country = 'Denmark'
  GROUP BY 1, 2
)
SELECT
  device,
  COUNT(*) AS quote_starters,
  SAFE_DIVIDE(SUM(details_complete), SUM(started)) AS detail_completion_rate,
  SAFE_DIVIDE(SUM(cover_selected), SUM(details_complete)) AS cover_selection_rate,
  SAFE_DIVIDE(SUM(quote_complete), SUM(started)) AS overall_quote_completion_rate
FROM visitors
GROUP BY device
ORDER BY overall_quote_completion_rate;

-- 2. Primary intention-to-treat experiment result.
WITH assignment_history AS (
  SELECT
    user_pseudo_id,
    ARRAY_AGG(STRUCT(assigned_at, variant) ORDER BY assigned_at LIMIT 1)[OFFSET(0)] AS first_assignment,
    COUNT(DISTINCT variant) AS distinct_variant_count
  FROM `analytics.experiment_assignments`
  WHERE experiment_id = 'quote-cover-recommendation-v1'
    AND assigned_at >= '2026-07-22'
  GROUP BY 1
), assignments AS (
  SELECT
    user_pseudo_id,
    first_assignment.variant AS variant
  FROM assignment_history
  WHERE distinct_variant_count = 1
), outcomes AS (
  SELECT user_pseudo_id, MAX(IF(event_name = 'quote_completed', 1, 0)) AS converted
  FROM `analytics.events`
  WHERE event_date BETWEEN '20260722' AND '20260812'
  GROUP BY 1
)
SELECT
  a.variant,
  COUNT(*) AS assigned_visitors,
  SUM(COALESCE(o.converted, 0)) AS completions,
  SAFE_DIVIDE(SUM(COALESCE(o.converted, 0)), COUNT(*)) AS completion_rate
FROM assignments a
LEFT JOIN outcomes o USING (user_pseudo_id)
GROUP BY a.variant;

-- 3. Sample-ratio mismatch check. A material difference from 50/50 needs investigation.
SELECT
  variant,
  COUNT(*) AS assigned_visitors,
  ROUND(100 * SAFE_DIVIDE(COUNT(*), SUM(COUNT(*)) OVER ()), 2) AS allocation_percent
FROM `analytics.experiment_assignments`
WHERE experiment_id = 'quote-cover-recommendation-v1'
GROUP BY variant;
