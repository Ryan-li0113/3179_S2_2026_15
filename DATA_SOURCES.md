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

## Figure 5 — Schematic tile-glyph map of crowd intensity by host state (NEW)
- AFL Tables, attendance by venue, 2025: https://www.afltables.com/afl/crowds/2025.html
- `data/afl_state_matchday_tiles_2025.csv`: grouped all 18 venue records by the state/territory **hosting the match**, not fan residence. State average per game is SUM(entries) / SUM(matches); 8 state totals sum to 8,257,027 entries. Bars share a fixed 0–65,000 average-per-game scale.
- `charts/afl_state_matchday_tile_glyph_map_2025.json` is a **schematic rectangular tile-grid map with embedded bar glyphs**, not a land-area choropleth or proportional stadium symbol map. Equal tile area prevents Victoria's larger total distorting state geography. Clicking a state crossfilters Figures 8, 11, 12, and 14 and highlights Figure 13.
- Figure 5's previous stadium point map and Melbourne inset are no longer displayed; their old files may remain archived in `charts/`.

## Figure 6 — Australian viewing category changes (slope)
- ACMA, How we watch and listen to content, executive summary (March 2026): https://www.acma.gov.au/sites/default/files/2026-03/How%20we%20watch%20and%20listen%20to%20content%20-%20Executive%20summary%20and%20key%20findings.pdf
- 2024 → 2025, past-seven-day use among adults: paid streaming 68% → 68%; FTA broadcast 46% → 52%; short video 59% → 52%; FTA catch-up 44% → 44%.
- This is ALL video, NOT AFL- or NRL-specific. Media users can overlap across categories. Changes measured in percentage points.

## Figure 7 — Four-panel comparative 100-cell unit charts
- Derived deterministically from published ACMA 2025 percentages above, each of 100 squares is one percentage point, not a survey respondent.
- All four media categories are visible together in a common two-column scale. Pale cells show the population not using that particular medium; do not sum overlapping media categories.

## Figure 8 — AFL venue attendance hexagonal bin map
- AFL Tables 2025 18 venues, same source as Figure 5.
- Venue longitude/latitude projected to Australian Albers EPSG:3577, binned at radius 175 km, attendance summed per bin, and geometries reprojected to EPSG:4326.
- Nine equal-area spatial bins total 8,257,027 entries in the national view; each venue assigned to one bin. Selecting a state in Figure 5 recalculates each bin from only that state’s venues. For bins crossing ACT/NSW, only the relevant stadiums are counted. Boundaries are analytical, not state boundaries.

## Figure 9 — Home-and-away versus finals intensity (2015–26)
- AFL Tables season totals and match counts: https://www.afltables.com/afl/crowds/summary.html
- The color scale encodes AVERAGE attendance per match for each season/phase; seasonal totals have differing number of games. 2020–21 COVID impacts matter.

## Figure 10 — 2024 to 2025 crowd waterfall
- AFL Tables annual totals: 2024 8,286,771; 2025 8,257,027 event entries.
- Home-and-away change −97,161, finals change +67,417 = net −29,744 entries. The horizontal bars are DELTAS, not raw annual totals.

## Figure 11 — Complete 2025 stadium treemap
- In the national view, AFL Tables all 18 stadiums total 8,257,027 entries (100%; no missing Other category).
- Selecting a host state filters the venues and recomputes all rectangles and percentages to total 100% **within the selected state**, not nationally. MCG national share is 37.8%, while the Victorian share is 65.5%. Entries are not unique spectators.

## Figure 12 — Rank by total versus average per match
- AFL Tables 2025 venue data. In the national view, the eight busiest venues are compared by total crowd entries and average game crowd. Marvel is second by total and fifth by average among those eight.
- In a selected state, ranks are **recomputed among only the stadiums in that state**; the scope label and text update automatically. The national statistic should never be quoted as a state-only statistic.

## Code and attribution
- Chart specifications: Vega-Lite and Vega v5 in `charts/`; the tile-glyph map, spatial hexbin, Sankey and rank slopegraph use Vega, while other charts use Vega-Lite. Derived CSV/GeoJSON datasets are in `data/`. Dynamic linked interactions are implemented in `interaction.js` and preserve the on-disk JSON specifications.
- AI was used to assist with HTML/CSS, Vega-Lite, editorial editing and documentation; verify final charts and disclose usage in the Moodle report.


## Figures 13–14: Additional advanced analytical idioms

- **Figure 13 / Sankey:** All 18 venue rows from AFL Tables 2025 are summed by the venue's state/territory and by home-and-away versus finals entries. `data/afl_state_phase_sankey_nodes_2025.csv` and `data/afl_state_phase_sankey_links_2025.csv` supply the computed nodes and proportionally scaled ribbons; source: https://afltables.com/afl/crowds/2025.html. Every recorded entry is allocated exactly once, totalling 8,257,027. State = where match was hosted, not viewer origin.
- **Figure 14 / Lorenz:** Calculated from the exact same 18 venue season attendance totals. `data/afl_venue_concentration_2025.csv` contains cumulative venues and cumulative attendance share, ordered lowest to highest. Shows concentration against a hypothetical 45-degree equality line, not a population-adjusted figure. Source: https://afltables.com/afl/crowds/2025.html.
- **Figure 7 redesign:** Four faceted 100-cell unit charts replace the one-at-a-time category selector. ACMA published 2025 use is 68% paid streaming, 52% broadcast FTA TV, 52% short-form online video, 44% catch-up FTA TV. Each tile = 1 percentage point. Categories overlap and therefore must not be added.

## Visual design system, 26 October 2026 revision

- AFL audience is consistently **teal `#087B73`**; NRL is **coral `#D66B44`** across the audience comparison charts.
- Quantitative geographic and attendance patterns use a consistent sequential teal scheme, with light-to-dark for small-to-large.
- Four ACMA video categories use a separate categorical palette that is exactly matched between Figures 6 and 7: paid streaming blue `#2B5E86`, broadcast FTA amber `#A27B3D`, short-form violet `#7B6A9A`, catch-up green-grey `#6B9588`. These categories overlap and are not portions of a single whole.
- Positive/negative waterfall uses teal and muted ochre; rank-shift highlights Marvel in ochre. The two Sankey match phases are coloured teal and steel blue. These section-local semantic roles are distinct from AFL versus NRL sport identification.
- The only persistent filter is an analytical **host-state selection** made by directly clicking the Figure 5 tile map (or Figure 4). This is shared across Figures 8, 11, 12, 13 and 14; the effect is a real data recalc for Figures 8, 11, 12 and 14, not simply opacity changes. Figure 13 dims nonselected state ribbons without changing absolute national flow widths.
- The on-screen grey JSON/CSV source panels are removed, while dated data sources and measurement caveats stay directly under the figures.

### Editorial design corrections (October 2026)
- Figure 8 uses the original nine 2025 equal-area AFL attendance bins from `data/afl_hexbin_2025.geojson`, with path coordinates preprojected into `data/afl_hexbin_map_paths_2025.csv` in Australian Albers (EPSG:3577). Map labels are approximate. No new audience or venue claims were introduced.
- Figure 10 uses the unchanged 2024→2025 AFL Tables changes; `data/afl_waterfall_bridge_2024_2025.csv` explicitly stores cumulative start and end values.
- Figure 12 uses the unchanged top-eight comparison, reshaped into `data/afl_rank_slope_compact_2025.csv`; ranks are computed among all 18 venues.
- The retired Figure 5 stadium finder was replaced with a state-level tile-glyph map; average-per-match values are calculated from `data/afl_venue_attendance_2025.csv`.


### October 2026 linked geographic analysis revision
- Figure 5 is a **different map idiom** from Figures 4 and 8: a rectangular state tile-grid with quantitative bar glyphs for average crowd per match. It takes the place of the proportional symbol stadium map, which is no longer called by `index.html`.
- Figure 8 now shows only the nine venue clusters (hexbin map); the earlier hexagonal state-tile toggle is retired. The retired JSON/CSV may remain in the repository but are not displayed.
- Selecting a host state via a Figure 5 tile (or clicking a state on Figure 4) runs a true connected filter: Figure 8 totals, Figure 11 treemap shares, Figure 12 ranks and Figure 14 concentration curve are recalculated from matching venue rows. Figure 13 highlights the matching ribbons but keeps nationally scaled widths so comparisons remain valid. Every connected text insight and Figure 11 venue reference list is also state-aware.
- `interaction.js` implements client-side linking. There is exactly one geographic filter state; no redundant figure-specific dropdowns.
- The site still has **three distinct mapping idioms**: choropleth (4), schematic state tile/glyph map (5), and equal-area spatial hexagonal bin map (8).
