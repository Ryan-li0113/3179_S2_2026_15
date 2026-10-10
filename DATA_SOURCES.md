# Figure 1: AFL vs NRL television viewers (2026)

## Original sources
- **AFL:** Roy Morgan, *The Sydney Swans are Australia’s most widely supported AFL club for a record 21 straight years* (15 September 2026): https://www.roymorgan.com/findings/10329-afl-supporter-ladder-september-2026
- **NRL:** Roy Morgan, *Brisbane Broncos and Melbourne Storm remain Australia’s most widely supported NRL clubs for a third straight year* (18 September 2026): https://www.roymorgan.com/findings/10334-nrl-supporters-june-2026

## Data and units
Both findings use Roy Morgan Single Source, July 2025–June 2026, sample n=59,959, base Australians aged 14+.

| Sport | Reported estimate | Value in CSV (millions) | Notes |
|---|---:|---:|---|
| AFL | 9,307,000 | 9.307 | Reported number who watched at least one AFL match on TV. |
| NRL | 7.6 million | 7.6 | Source rounds the viewer estimate to the nearest tenth of a million. |

## Interpretation
The difference is **about** 1.7 million people, since one input is rounded.
The measure is the estimated number of people watching during the survey period, not the average audience for a particular match or broadcaster.
Do not add AFL and NRL viewers to create a unique total, since individuals can watch both sports.

## Files
- `data/afl_nrl_tv_2026.csv` – the two reported viewing estimates, with source URLs.
- `charts/afl_nrl_audience_2026.json` – original Vega-Lite chart specification.
- `index.html` – the webpage hosting the visualisation.

## Transparency
The dataset was manually transcribed from publicly accessible Roy Morgan media releases. No observations or audience figures were invented. CSV values are expressed in millions for easier chart rendering.


---

# Figure 2: AFL vs NRL television audience growth by age (2023–2024)

## Original source
- Roy Morgan, *AFL stretches lead over NRL in TV viewership despite NRL’s rise* (18 March 2025): https://www.roymorgan.com/findings/9842-afl-vs-nrl-2023-24
- Source PDF: https://roymorgan-cms-prod.s3.ap-southeast-2.amazonaws.com/wp-content/uploads/2025/03/18033653/9842-AFL-vs-NRL-2023-24.pdf (page 2, chart "TV Viewership of the AFL vs. NRL by Age: 2023 vs. 2024")

## Data and units
- Roy Morgan Single Source, January–December 2023 (n=64,994) and January–December 2024 (n=64,823), base Australians aged 14+.
- `viewers_2023` and `viewers_2024` represent estimated people, not single-match average audiences.
- `growth_pct` is the **published** year-on-year percentage on the source chart. Because source audience counts are rounded to the nearest thousand, recomputing percentages from CSV estimates can result in minor rounding differences.
- The four age groups are **Under 35, 35–49, 50–64, 65+**.

## Interpretation
Both sports' estimated TV audiences grew in all four age groups in 2024. For AFL and NRL, the largest **percentage** growth was for people aged 65+. This does not show that older people make up the largest audience overall; that would require comparing absolute numbers instead.

## Files
- `data/afl_nrl_age_growth_2023_2024.csv` – transcription of the published age chart.
- `charts/afl_nrl_age_growth_2024.json` – Vega-Lite heatmap specification.

## Limits
Figure 2 compares **2023 with 2024** and is separate from Figure 1's more recent **July 2025–June 2026** survey window. Do not imply those figures are identical datasets or that the heatmap measures broadcaster-specific audiences.


---

# Figure 3: Dumbbell comparison of TV viewership by gender, AFL vs NRL (2023–2024)

## Original source
- Roy Morgan, *AFL stretches lead over NRL in TV viewership despite NRL’s rise* (18 March 2025): https://www.roymorgan.com/findings/9842-afl-vs-nrl-2023-24
- The original PDF's **page 1** gender comparison chart (2023 vs. 2024): https://roymorgan-cms-prod.s3.ap-southeast-2.amazonaws.com/wp-content/uploads/2025/03/18033653/9842-AFL-vs-NRL-2023-24.pdf

## Data and units
Values are millions of Australians aged 14+ estimated to have watched AFL or NRL TV coverage either occasionally or regularly. The 2023 and 2024 numbers are transcribed directly from the original gender comparison chart.

| Gender | Year | AFL TV viewers | NRL TV viewers | AFL minus NRL |
|---|---:|---:|---:|---:|
| Women | 2023 | 3,880,000 | 2,843,000 | 1,037,000 |
| Women | 2024 | 4,024,000 | 3,001,000 | 1,023,000 |
| Men | 2023 | 4,881,000 | 4,144,000 | 737,000 |
| Men | 2024 | 5,078,000 | 4,314,000 | 764,000 |

- The dumbbell joins *NRL and AFL audience reach for the same gender in the same year.* It does not connect time points or imply that the same people watched both sports.
- Its purpose is to **compare a difference between two measured values**, making it more meaningful than using an advanced idiom for its own sake.
- Do not interpret these numbers as mutually exclusive viewers or average single-match audiences.

## Files
- `data/afl_nrl_gender_2023_2024.csv` – four data rows.
- `charts/afl_nrl_gender_dumbbell_2024.json` – human-readable Vega-Lite dumbbell specification.


---

# Figure 4: 2025 Fox Footy Super Saturday exclusively live window by state

## Data source and values
Foxtel Group, *‘Super Saturday Live’ to change the game for Fox Footy on Kayo Sports in 2025*, published 18 November 2024:
https://foxtelgroup.com.au/newsroom/super-saturday-live-to-change-the-game-for-fox-footy-on-kayo-sports-in-2025

| State or territory | Exclusive live Saturday window (weeks, including Opening Round) |
|---|---:|
| VIC | 25 |
| TAS | 25 |
| NT | 25 |
| NSW | 11 |
| QLD | 11 |
| ACT | 11 |
| SA | 9 |
| WA | 9 |

The measure refers to the **number of 2025 season weeks** for which live Saturday AFL coverage was exclusive to Fox Footy (available on Foxtel and Kayo). It is **not** the number of matches, individual viewer counts, subscription penetration or full-season free-to-air availability. Matches involving non-Victorian clubs could be shown locally on free-to-air on a delay during these windows.

## Geographic boundaries
- `data/australia_states_simplified.geojson` is a **simplified**, low-resolution reference map reconstructed from the main state/territory polygons of Rowan Hogan's `states.min.geojson`:
  https://github.com/rowanhogan/australian-states/blob/master/states.min.geojson
- Polygon vertices were reduced for lightweight on-page mapping. Small islands are omitted to keep the total web download small; this is not a legal or engineering-quality boundary dataset.
- The state identifiers follow the ABS convention (NSW=1, VIC=2, QLD=3, SA=4, WA=5, TAS=6, NT=7, ACT=8): https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files
- Boundary provenance and reuse permissions should be reviewed if republishing beyond this educational assignment.

## Vega-Lite implementation
- `charts/afl_super_saturday_choropleth_2025.json` reads `data/afl_super_saturday_2025.csv`, looks up state polygons by code in the simplified GeoJSON, applies a geographic Mercator projection and colours states by the quantitative number of weeks.
- A map is an advanced idiom under the FIT3179 DV2 rubric. The task is a spatial comparison of broadcast access **by state**, not a comparison of TV ratings.


---

# Figure 5: Proportional symbol map of AFL match attendance by stadium (2025)

## Data source
- AFL Tables, *Attendances 2025* → **By Venue**: https://afltables.com/afl/crowds/2025.html
- Includes all 18 match venues listed in the 2025 table.
- The 2025 home-and-away attendance total is **7,656,090** across 207 matches; finals recorded **600,937** attendances across 9 matches. The combined total is **8,257,027 attendances across 216 matches**.

## Construction
- Venue names, home-and-away attendance and match counts, and finals attendance and match counts are transcribed from AFL Tables. Empty finals cells were treated as zero.
- `total_attendance = home_away_attendance + finals_attendance`; `total_games = home_away_games + finals_games`; `average_attendance = round(total_attendance / total_games)`.
- The values in the CSV have been checked to reconcile to the original overall totals.
- Longitudes and latitudes are approximate WGS84 stadium locations; they were added to enable point plotting (not for navigation or cadastral accuracy). Stadium city/state identities are consistent with the AFL venue directory: https://www.afl.com.au/venues
- The backdrop uses the same lightweight `data/australia_states_simplified.geojson` file as Figure 4.

## Chart choice and limitations
- `charts/afl_venue_proportional_symbols_2025.json` draws a background geoshape layer plus circles positioned by longitude and latitude. **Circle area**, not diameter or colour, shows the number of recorded crowd attendances.
- In the national projection, nearby Melbourne and Adelaide venues may overlap; hover access can be constrained. The summary callouts make the leading stadiums visible without falsely relocating their markers.
- This is an aggregate of people attending matches, not unique individual fans, and does not represent broadcasting audiences. Venues differ in number of AFL matches and capacity, so total crowds are not a fair measure of average interest per game.

## Files
- `data/afl_venue_attendance_2025.csv`
- `charts/afl_venue_proportional_symbols_2025.json`
- `index.html` (updated Geography section; previous figures retained)


---

# Interactive visualisations and accessibility (Figures 1–5)

- **Figure 1:** Sport-focus dropdown highlights either AFL or NRL while preserving both reference bars. Task: compare audience reach.
- **Figure 2:** Age-group dropdown highlights the same demographic in AFL and NRL. Task: compare growth within a demographic.
- **Figure 3:** Year dropdown shows 2023, 2024 or both. Task: compare the gender-based audience gap by year.
- **Figure 4:** State dropdown highlights one state/territory on the 2025 exclusive-live broadcasting choropleth. Task: locate and compare broadcast arrangements geographically.
- **Figure 5:** Venue dropdown highlights a stadium on the national proportional-symbol map. An additional geographic close-up makes the MCG and Marvel Stadium separately hoverable, fixing the overlap at national scale. This close-up is *the same map idiom* as Figure 5 and does not count as a new advanced idiom. Task: locate individual venues and compare total attendances.

All controls are implemented as Vega-Lite bound parameters; they work without a backend. Tooltips provide exact values. The selectors support keyboard input and do not remove data from the underlying CSVs.
