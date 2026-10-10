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
