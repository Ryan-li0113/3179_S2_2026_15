# FIT3179 DV2 — Data sources and transformations

Author: Ryan Li · University assignment · October 2026.

## Figures 1–3 — AFL and NRL audience reach
- Roy Morgan AFL (Sep 2026): https://www.roymorgan.com/findings/10329-afl-supporter-ladder-september-2026
- Roy Morgan NRL (Sep 2026): https://www.roymorgan.com/findings/10334-nrl-supporters-june-2026
- Roy Morgan 2023–24 age and gender: https://www.roymorgan.com/findings/9842-afl-vs-nrl-2023-24
- The 2025–26 national reach and 2023–24 age/gender samples are different periods. Viewers may watch both leagues.

## Figure 4 — Exclusive-live AFL by state (choropleth)
- Foxtel Group, 2025 Super Saturday LIVE: https://foxtelgroup.com.au/newsroom/super-saturday-live-to-change-the-game-for-fox-footy-on-kayo-sports-in-2025
- VIC / TAS / NT: 25 weeks; NSW / QLD / ACT: 11; SA / WA: 9. These are specific broadcast arrangement windows, NOT viewership.
- Simplified cartographic state outlines: https://github.com/rowanhogan/australian-states/blob/master/states.min.geojson

## Figure 5 — AFL stadium crowd proportional symbols and Melbourne detail
- AFL Tables, attendance by venue, 2025: https://www.afltables.com/afl/crowds/2025.html
- All 18 AFL Tables venues: 8,257,027 event entries, not unique fans. MCG: 3,120,416. The Melbourne close-up shares the same records.

## Figure 6 — Australian viewing category changes (slope)
- ACMA, How we watch and listen to content, executive summary (March 2026): https://www.acma.gov.au/sites/default/files/2026-03/How%20we%20watch%20and%20listen%20to%20content%20-%20Executive%20summary%20and%20key%20findings.pdf
- 2024 → 2025, past-seven-day use among adults: paid streaming 68% → 68%; FTA broadcast 46% → 52%; short video 59% → 52%; FTA catch-up 44% → 44%.
- This is ALL video, NOT AFL- or NRL-specific. Media users can overlap across categories. Changes measured in percentage points.

## Figure 7 — Interactive 100-cell viewing waffle
- Derived deterministically from published ACMA 2025 percentages above, each of 100 squares is one percentage point, not a survey respondent.
- The selection shows one medium at a time. The complement is the population not using that medium; do not sum media categories.

## Figure 8 — AFL venue attendance hexagonal bin map
- AFL Tables 2025 18 venues, same source as Figure 5.
- Venue longitude/latitude projected to Australian Albers EPSG:3577, binned at radius 175 km, attendance summed per bin, and geometries reprojected to EPSG:4326.
- Nine equal-area spatial bins total 8,257,027 entries; each venue assigned to one bin. Boundaries are analytical, not state boundaries.

## Figure 9 — Home-and-away versus finals intensity (2015–26)
- AFL Tables season totals and match counts: https://www.afltables.com/afl/crowds/summary.html
- The color scale encodes AVERAGE attendance per match for each season/phase; seasonal totals have differing number of games. 2020–21 COVID impacts matter.

## Code and attribution
- Chart specifications: Vega-Lite v5 JSON in charts/. Derived CSV/GeoJSON datasets in data/.
- AI was used to assist with HTML/CSS, Vega-Lite, editorial editing and documentation; verify final charts and disclose usage in the Moodle report.
