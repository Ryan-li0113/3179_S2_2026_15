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
- `afl_nrl_age_growth_2023_2024.csv` – transcription of the published age chart.
- `afl_nrl_age_growth_2024.json` – Vega-Lite heatmap specification.

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
- `afl_nrl_gender_2023_2024.csv` – four data rows.
- `afl_nrl_gender_dumbbell_2024.json` – human-readable Vega-Lite dumbbell specification.
