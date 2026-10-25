# FIT3179 DV2 – Development history

Seven sequential, reviewable GitHub commits:
- **Viz 6:** ACMA 2024–25 streaming and broadcast slope chart · `Add viz 6 ACMA viewing trends slope chart`
- **Viz 7:** Interactive 100-cell video viewing waffle chart · `Add viz 7 interactive streaming reach waffle chart`
- **Viz 8:** Hexagonal bin map of AFL stadium crowd concentration · `Add viz 8 AFL attendance hexbin map`
- **Viz 9:** AFL 2015–26 season-phase attendance heatmap · `Add viz 9 AFL season crowd intensity heatmap`
- **Viz 10:** AFL 2024–25 crowd change waterfall · `Add viz 10 AFL 2024-25 crowd change waterfall`
- **Viz 11:** Complete 18-venue 2025 crowd treemap · `Add viz 11 complete AFL venue treemap`
- **Viz 12:** 2025 stadium rankings versus average crowds per game · `Add viz 12 venue rank shift and final narrative`

Previously completed version: **12 figures**.

**Design revision proposed for a new GitHub commit:** Preserve Figures 1–12, replace Figure 7 with comparative faceted unit charts, unify AFL/NRL/media colours, tighten section and chart spacing, remove redundant dropdowns (retain only stadium locator), add Figure 13 Sankey and Figure 14 Lorenz concentration curve. New version: **14 figures**.

Suggested commit message: `Refine visual design and add Sankey and Lorenz analysis`.

## Editorial rebuild — 26 October 2026
- Figure 5: venue inspector replaces repeated national KPI boxes and redundant Melbourne inset; selected ground updates linked map + profile.
- Figure 8: geographic hexbin rebuilt in native Vega with preprojected equal-area paths, avoiding malformed full-panel polygon.
- Figure 10: bridge waterfall with cumulative connectors and clearly signed changes.
- Figure 11: consistent sequential fill and high-contrast venue labels on all major tiles.
- Figure 12: compact native Vega eight-row slopegraph with direct endpoint labels.
- Sticky section navigation, reading progress and accessible reduced-motion scroll reveal; source definitions and all 14 figures retained.
