# Conclusion
### What we analyzed (in plain words)
- 31k+ historical posts with fields like format, day, local hour, hashtags, mentions, external links, industry/location, and outcomes (likes, comments, shares, engagement).
- We cleaned and audited the data, visualized patterns, and trained validated models to predict engagement/1k on unseen companies (grouped cross‑validation).

### What we learned (so you can act)
- Audience scale matters, but controllable levers still move the needle.
- Format and links are high‑impact:
  - Feed Sharing often outperforms; “Repost” looks strong in some cohorts but is inconsistent—avoid relying on it.
  - External links depress engagement; prefer native content. If a link is required, place it in the first comment.
- Timing is a secondary lever:
  - Weekdays, early afternoon local time (roughly 13:00–18:00) are consistently good.
  - Day-of-week effects exist but are smaller than format/content choices.
- Content hygiene helps:
  - Hashtags: 0–3 sensible tags beat both zero-context walls of text and hashtag stuffing.
  - Mentions: 1 company + 1 relevant profile can help; more is diminishing returns.
  - Slightly longer, clear copy (moderate sentence counts) is better than very short blurbs.

### A simple posting playbook for FinDev
- Format
  - Primary: Feed Sharing, Image, Text; Secondary: Video, Document; Avoid relying on Repost.
- Links and tags
  - No external link in the post body (add in comments if needed).
  - Use 0–3 targeted hashtags; avoid generic tag spam.
  - 1 company mention + 1 relevant profile mention where authentic.
- Timing
  - Post on weekdays between 13:00–18:00 local audience time.
  - If constrained, prioritize Tue–Thu.
- Cadence
  - Start with 3 posts/week. Keep a consistent voice; A/B small changes (format, hour, tags).
- Creative
  - Show product in context (mini use‑cases), crisp visuals, and specific outcomes (metrics, screenshots, short demos).

### How confident we are (what the numbers mean)
- Predictive accuracy on unseen companies:
  - CV MAE ≈ 2.99 engagement units per 1k followers
  - Test MAE ≈ 2.28 per 1k; RMSE ≈ 5.16 per 1k; R² ≈ 0.26
- Translation: with 50k followers, typical absolute error ≈ 2.28 × 50,000 / 1,000 ≈ 114 engagements. Social engagement is noisy; this is normal. Use the model to rank and choose better slots/content on average—not to promise exact likes.

### How we’ll use this in practice
- For each planned post, we score candidate day×hour×format combinations and recommend the top few with predicted engagement/1k, plus a conservative 90% interval so you can judge risk.
- We exclude “Repost” from automated recommendations unless future data shows consistent lift.

### What to measure next (so we keep improving)
- Weekly experiment cadence: pick 1–2 levers to test (format vs hour) while holding others steady.
- Track per‑post: predicted vs actual engagement, link placement, hashtags count, mentions, and creative type.
- Monitor top‑k lift: compare average engagement of recommended slots vs your historical baseline.

### Risks and guardrails
- Heavy-tailed outcomes: a few viral posts don’t set a new “normal.”
- Seasonality and news cycles matter; re‑calibrate quarterly.
- Don’t overfit to one format; maintain variety to avoid audience fatigue.

### 90‑day roadmap
- Weeks 1–2: Implement the playbook; establish baseline KPIs (engagement/1k, profile visits, demo clicks).
- Weeks 3–6: Run structured A/Bs on format and hour; ship 2–3 creative narratives (customer story, product tip, market POV).
- Weeks 7–10: Scale the best format/time combos; introduce lightweight video; continue no‑link posts for reach.
- Week 12: Re-train with the latest data; update recommendations and present outcomes.

### The promise to FinDev
We won’t predict exact like counts; we will systematically pick better slots and creative patterns so your average post performs higher, your best posts hit more often, and your brand shows up where buyers can see and trust you.