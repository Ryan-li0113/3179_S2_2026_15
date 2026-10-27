# FIT3179 DV2 — Data sources and visualisation methods

**Author:** Ryan Mohan Li · Updated 27 October 2026

## Interpretation rules

- **TV audience reach:** people who watched at any point during the specified coverage window. **Average TV audience:** average viewers watching at a point in time; not the same denominator or measure. Figures from separate providers or survey samples are not simply additive.
- **Match/carnival attendance:** counts of entry events, not unique supporters. An event running for three weeks cannot be compared to a single race-day gate count as though durations were the same.
- **Media habits:** ACMA percentages concern all types of video viewing by Australian adults, not sports viewing alone. Media use categories overlap.
- **Broadcast availability:** an event's live broadcaster/channel is not a claim of equal programming hours or exclusive coverage for an entire league.

## Figures 1–3: AFL and NRL television audiences

- Figure 1 (national 2025–26 TV audience): Roy Morgan, [AFL Sep 2026](https://www.roymorgan.com/findings/10329-afl-supporter-ladder-september-2026) and [NRL Sep 2026](https://www.roymorgan.com/findings/10334-nrl-supporters-june-2026).
- Figures 2 and 3 (2023–24 age and gender breakdowns): Roy Morgan, [AFL vs NRL television audiences 2023–24](https://www.roymorgan.com/findings/9842-afl-vs-nrl-2023-24).
- 2023–24 age/gender data and July 2025–June 2026 national reach are separate samples; they must not be conflated.
- Sport selection in Figure 1 or 2 **focuses** the same sport across Figures 1–3 without inventing an age-by-gender cross-tabulation.
- AFL uses **teal `#087B73`**, NRL **coral `#D66B44`** throughout these figures. In Figure 2, opacity encodes growth magnitude within each sport colour.

## Figure 4: Geographical AFL broadcast access

- Source: [Foxtel Group Super Saturday LIVE announcement](https://foxtelgroup.com.au/newsroom/super-saturday-live-to-change-the-game-for-fox-footy-on-kayo-sports-in-2025). VIC/TAS/NT 25 weeks; NSW/QLD/ACT 11; SA/WA 9. These represent announced exclusive-live Saturday windows, **not viewer counts**.
- Map geometry: [Rowan Hogan Australian state GeoJSON](https://github.com/rowanhogan/australian-states/blob/master/states.min.geojson), locally simplified.

## Figures 5, 10, 13: 2025 multi-sport marquee broadcasts

- **Figure 5:** categorised point-location map with three *host city* markers: Melbourne (four selected events), Sydney (NRL Grand Final), and Bathurst (Bathurst 1000). Not a map of viewer origins or venue-attendance totals.
- **Figure 10:** layered bullet marks show the **2025 national total TV reach** (light background) and **average TV audience** (sport-coloured foreground), in millions, for six event broadcasts. **Bathurst uses Seven's reported reach and audience only; F1 uses Network 10 only**, rather than mixed-provider totals. Figures are comparisons with source-specific caveats and should not be added.
- **Figure 13:** binary matrix of availability of selected live 2025 broadcasts on named linear / free-streaming / subscription services. Channels and streaming platforms are shown separately; a filled tile does not mean identical rights across an entire season.

| Event | Sport colour | Total TV reach | Average TV audience | Reporting scope / source |
|---|---|---:|---:|---|
| AFL Grand Final 2025 | Teal `#087B73` | 6.100m | 4.080m | [Seven / 7plus](https://sevenwestmedia.com.au/wp-content/uploads/2025/09/Sevens-AFL-Grand-Final-coverage-breaks-records.pdf) |
| NRL Grand Final 2025 | Coral `#D66B44` | 6.409m | 4.460m | [Nine / 9Now](https://www.nineforbrands.com.au/media-release/nrl-reigns-supreme-in-record-breaking-season/) (initial 2025 release; later updates may differ) |
| Australian Open men's final 2025 | Blue `#4265B6` | 4.166m | 2.001m | [Nine / 9Now](https://www.adnews.com.au/news/4-million-tune-into-australian-open-final) |
| Melbourne Cup race 2025 | Bronze `#9B692E` | 2.316m | 2.079m | [Nine / 9Now](https://www.nineforbrands.com.au/media-release/historic-melbourne-cup-delivers-soaring-ratings-for-nine/) |
| Bathurst 1000 race 2025 | Purple `#7956AD` | 4.315m | 1.544m | [Seven only; excludes Foxtel platforms](https://www.supercars.com/news/supercars-news-2025-broadcast-digital-online-streaming-numbers-repco-bathurst-1000-record-announcement) |
| Australian F1 Grand Prix race 2025 | Red `#C6424E` | 1.720m | 1.060m | [Network 10 only; excludes subscription coverage](https://www.paramountanz.com.au/news/network-10s-coverage-of-the-formula-1-louis-vuitton-australian-grand-prix-2025-reaches-3-6-million/) and [Network 10 half-year statement](https://www.paramountanz.com.au/news/10-is-up-across-streaming-comedy-news-and-sport-in-the-first-half-of-2025/) |

Platform sources: [AO on Nine, 9Now and Stan Sport](https://www.nineforbrands.com.au/media-release/australian-open-2025-exclusive-on-nine/); [Bathurst on Seven, 7plus, Foxtel and Kayo](https://www.supercars.com/news/how-to-watch-supercars-2025-bathurst-1000-tv-times-broadcast-streaming-superview-race-start); broadcaster race-reach reports as linked above. AFL and NRL grand finals have different live rights from ordinary regular-season matches.

The locally stored CSV tables are `data/marquee_broadcast_2025.csv`, `data/marquee_host_cities_2025.csv`, `data/marquee_platform_matrix_2025.csv`.

## Figures 6–7: All-video viewing market context

- Source: [ACMA, How we watch and listen to content](https://www.acma.gov.au/sites/default/files/2026-03/How%20we%20watch%20and%20listen%20to%20content%20-%20Executive%20summary%20and%20key%20findings.pdf) (March 2026).
- 2024→2025: paid streaming 68%→68%; broadcast FTA 46%→52%; short-form video 59%→52%; FTA catch-up 44%→44%. Units = percentage of adults using in past seven days; changes in percentage **points**.
- Figure 7 four 100-unit grids use published percentages, with one square = one percentage point, **not one respondent**. Categories overlap.

## Figures 8–9, 11–12, 14: AFL stadium attendance analytics

- Source: [AFL Tables, 2025 By Venue](https://afltables.com/afl/crowds/2025.html), [season crowd summary](https://afltables.com/afl/crowds/summary.html).
- Figure 8: all 18 venue attendance records are assigned to nine geographic bins; venue entries total 8,257,027. A secondary schematic state tile view uses the same entries, not an independent dataset.
- Figure 9: AFL home-and-away/finals average game attendance, 2015–26. Different years' numbers of matches vary; COVID-era years are exceptional.
- Figure 11: complete whole treemap of all 18 venues, total 8,257,027 entries; MCG 3,120,416 (37.8%). Never present a partial set as the entire whole.
- Figure 12: eight large venues compared by rank using total attendance versus average per match. Rank positions are computed amongst all 18 venues.
- Figure 14: Lorenz curve of cumulative attendance by stadium, sorted small to large, with equal-distribution reference. It does **not** imply per-capita state prevalence.

## Technical compliance

All 14 on-page figures are built with **Vega-Lite v5 or Vega v5**, using readable JSON files under `charts/` and local data under `data/`. In the new version **Figures 8 and 12 use Vega v5** and the remaining 12 on-page figures use **Vega-Lite v5**. Both libraries are explicitly permitted by the FIT3179 Data Visualisation 2 assessment specification. HTML and CSS are used only for webpage presentation and interface controls. The site includes three distinct map idioms: Figure 4 choropleth, Figure 5 categorical host-location point map, Figure 8 geographic hexagon bin map.

AI assistance was used for code generation, visual design and editing; review the Moodle disclosure instructions and validate the live deployment and data sources independently before submission.
