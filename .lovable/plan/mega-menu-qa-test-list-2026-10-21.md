# QA TEST LIST — Dr. Arefin Mega Menu (vs Atto Property reference)

Created: 2026-10-21. Subject build: GitHub main commit c3836a1. Reference: attoproperty.com.au live.
Method key: [CSS] stylesheet/markup inspection · [CALC] computed value (contrast, geometry) · [CODE] behaviour read from source · [DATA] data/route crawl.
Rule: a case passes only on evidence, not on intention. Failures go to the Improvement Plan; nothing is fixed without owner approval.

## A. Reference analysis — how Atto built theirs
- A1 Identify Atto's menu technology/markup (plugin, classes, DOM structure)
- A2 Atto panel geometry: width, columns, rail width, paddings, radius
- A3 Atto colours: CTA button default + hover, link default + hover, panel bg, active-row state
- A4 Atto responsive breakpoints: where mega collapses to mobile menu; tablet behaviour
- A5 Atto mobile menu pattern (accordion? drill-down? full-screen?)

## B. Default state (desktop, no hover)
- B1 Header renders identically to before (logo, nav order, Call/Book pill untouched)
- B2 Treatment item shows chevron, no panel visible, no layout shift on page load
- B3 Nav text colours match tokens (resting state), active-page item highlighted correctly
- B4 Panel hidden state does not block clicks on hero content below the header

## C. Hover & open behaviour (desktop ≥1024px)
- C1 Panel opens on hover of Treatment with the 250ms reveal animation (existing keyframes)
- C2 Panel position: centred, never clipped at 1024 / 1280 / 1440 / 1920 widths
- C3 150ms close grace: diagonal pointer path rail→pane keeps panel open
- C4 Chevron rotates 180° over 300ms while open
- C5 Moving to another nav item / leaving header closes the panel

## D. Rail (services list)
- D1 8 services, correct order, display names identical to data file
- D2 Count label = computed area count (15) and matches generated pages
- D3 Row default state: icon tile tint, name colour, count colour per spec
- D4 Row hover state: bg tint 12%, 3px left border, name → primary-bright, tile 18%→28%, 300ms, NO movement
- D5 Row selected state persists while its pane is shown; hover ≠ selected confusion check
- D6 Rail footer "View all treatments →" link + hover colour

## E. Detail pane
- E1 Default service on open = Gallbladder Surgery (decision D4)
- E2 Switching: 80ms dwell on mouse, instant on keyboard focus, 120ms crossfade
- E3 Panel height locked: switching all 8 services changes height by 0px
- E4 Title font (Ubuntu), description clamp 2 lines, no text overflow for the longest copy
- E5 [Treatment page →] button: default bg, hover bg (darker), active press (brightness), focus ring
- E6 [Call] button: border/text default, hover → primary, tel: href correct, display number correct
- E7 Areas label + grid: 3 columns, 15 links, Dhaka-first order, names = "<Service> in <Area>"
- E8 Area link default / hover / focus: colour, bullet colour, underline on hover+focus
- E9 Footer: trust line text + tick colour; "All <Service> areas →" target = service hub

## F. Links & data integrity
- F1 Every menu href resolves to a registered route (crawl = 0 unresolved)
- F2 Every area page renders real content (template + unique area context, >500 unique words rule)
- F3 Hub targets correct per service (incl. Bile Duct → biliary-tract hub)
- F4 Sitemap contains all 120 area URLs; routes registered in App.tsx

## G. Colour & contrast (WCAG 2.1 AA: normal text 4.5:1, large text 3:1)
- G1 Panel title vs panel bg
- G2 Description text vs panel bg
- G3 Rail name / rail count / section labels vs panel bg
- G4 Area links vs panel bg (default + hover green)
- G5 Filled button: white text on primary-bright (default) and on primary-darker (hover)
- G6 Call button text vs panel bg
- G7 Nav links on white header + on dark hero (transparent header pages)
- G8 Focus ring visibility on dark panel and on white header

## H. Spacing & alignment
- H1 Rail: padding, row gap, icon tile 40px, tile-to-text gap 12px
- H2 Detail: padding 24/28, title→desc→buttons rhythm, areas grid gaps (7/24)
- H3 Panel radius 16px consistent; border colour; alignment to 1248px site grid
- H4 Longest labels fit: "Liver Transplant Coordination" rail row + its area links wrap cleanly

## I. Responsive
- I1 ≥1440: panel centred on grid, margins symmetric
- I2 1280 laptop: no clipping, areas columns ≥180px
- I3 1024 (small laptop / tablet landscape): panel = viewport−32, still 3-col areas, rail readable
- I4 Short viewport (height ≤650): panel fully reachable (max-height/scroll behaviour)
- I5 768–1023 (tablet portrait): mobile drawer pattern, Treatment accordion works
- I6 390 / 360 (phones): drawer, service rows ≥44px, areas accordion, long names wrap, Call/Book row intact
- I7 Touch laptop: first tap opens (no navigation), second tap navigates

## J. Keyboard & accessibility
- J1 Tab order logical: nav → rail → pane actions → areas → footer
- J2 Focus switches detail pane; focus-visible styles = hover styles
- J3 Esc closes panel; focus returns sensibly
- J4 aria-haspopup/expanded correct; aria-current on active page
- J5 prefers-reduced-motion: reveal/swap animations disabled

## K. Regression
- K1 Small dropdown code path (non-mega items) unbroken
- K2 Header exports unchanged (CallBookPill et al.) — all importing pages build
- K3 Build passes; TS clean on touched files; bundle delta reported
- K4 Mobile drawer scroll lock + route-change close still work
