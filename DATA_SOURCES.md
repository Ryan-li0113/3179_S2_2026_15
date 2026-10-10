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
