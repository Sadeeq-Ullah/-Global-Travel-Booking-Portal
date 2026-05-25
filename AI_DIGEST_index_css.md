AI digest — concise summary for css/index.css

Purpose
- A short, focused summary that any AI or human can read quickly to understand the structure, key variables, and the critical overflow issues at widths under ~390px.
- Use this file as the minimal context to paste into other AI chats.

File: css/index.css
- Root variables: --main-color, --primary-color, --bg-light, --border-gray, --text-gray, --overlay-dark, --input-bg, radius variables (small/medium/pill/round/full/badge)
- Structure: header/nav, hero, form, about-us, featured destinations, destination cards, travel-decision, featured-tours (tours-card), testimonials, pre-footer/journey-cta, travel-features, travel-stats, footer, media query @min-width:768px

Symptoms (user-visible):
- Page layout "bursts" or horizontally overflows when viewport width falls below ~390px (reproducible at 375px or 370px emulated mobile widths).
- Large blocks and controls don't stack or shrink, producing horizontal scroll and broken layout.

Primary root-cause patterns discovered
1) Absolute-positioned decorative pseudo-elements with fixed left + width
   - Example: .featured-tours__subtitle::after (left:132px; width:140px)
   - Example: .testimonials__subtitle::after (left:100px; width:140px)
   Why bad: left + width sum can exceed small viewports; pseudo elements don't participate in layout and can overflow.

2) Content rows with nowrap behavior (flex) + large fixed children
   - .hero__buttons and other button rows (previously fixed to nowrap)
   Why bad: children can't wrap into a new row on narrow screens.

3) Large horizontal padding on containers
   - travel-stats: padding: 60px 40px (100px horizontal used)
   Why bad: reduces available content width; on a 370px viewport, 100px padding leaves ~270px content area.

4) Fixed min-widths and fixed widths
   - travel-stats__item: min-width:200px; padding:20px
   - footer input: width:300px (previously fixed, updated to max-width:300px)
   Why bad: forces children to take a minimum space which, multiplied across columns/children, overflows viewport.

5) Excessive padding on small elements
   - testimonial-card padding-left: 4em (about 64px) wastes width on mobile.

Concise reproduction checklist for debugging (do these in devtools):
1. Open the page in responsive mode at widths: 420px, 390px, 375px, 360px.
2. Toggle the CSS rule `html { overflow-x: auto; }` and inspect which element exceeds viewport using `document.querySelectorAll('*')` and checking getBoundingClientRect widths.
3. In Elements panel, add `* { outline: 1px dashed rgba(255,0,0,0.2); }` to visually spot overflowers.
4. Toggle visibility of suspected rules (pseudo-elements, big padding) to see immediate effect.

Minimal AI-friendly delta (problematic rules + recommended small replacements)

Problematic rules (paste these to show the failing pieces):

/* PSEUDO ELEMENTS */
.featured-tours__subtitle::after {
  height: 1px;
  width: 140px; /* problematic */
  left: 132px; /* problematic */
}

.testimonials__subtitle::after {
  height: 1px;
  width: 140px; /* problematic */
  left: 100px; /* problematic */
}

/* LARGE PADDING */
.travel-stats {
  padding: 60px 40px; /* too wide for mobile */
}

/* FIXED MIN WIDTH */
.travel-stats__item {
  min-width: 200px; /* forces width */
}

/* LARGE LEFT PADDING */
.testimonial-card {
  padding: 1.5em 1.5em 1em 4em; /* 4em left causes overflow */
}

Recommended minimal replacements (safe, non-visual changes, keep appearance similar):

/* PSEUDO ELEMENTS - reduce and avoid absolute overflow */
.featured-tours__subtitle::after { left: 80px; width: 100px; }
.testimonials__subtitle::after { left: 50px; width: 80px; }

/* CONTAINERS - reduce horizontal padding */
.travel-stats { padding: 2rem 1.5rem; }

/* ITEMS - allow smaller minima */
.travel-stats__item { min-width: 150px; padding: 1rem; }

/* TESTIMONIALS - reduce left padding */
.testimonial-card { padding-left: 2.5em; }

Extra useful guard rules (can paste into top of css for quick testing):

/* quick debug guards - safe to add then remove */
html, body { max-width: 100vw; overflow-x: hidden; }
* { box-sizing: border-box; }

/* catch large children */
.container-debug > * { max-width: 100%; box-sizing: border-box; }

Short summary you can paste to any AI to get help (2 lines):
"I have a CSS file (css/index.css) with mobile-first layout that overflows under 390px. Key culprits: pseudo-elements with fixed left+width, heavy horizontal padding (travel-stats), min-widths forcing minimum column widths, and large left padding on testimonial-card. Provide focused suggestions to make layout wrap cleanly without changing visual design."

Notes for future projects / checklist (keep in mind):
- Avoid left + width combos for pseudo elements; make them centered or relative to text lines using transform/translateX. Use percentages or smaller pixel values.
- Prefer `flex-wrap: wrap` & `width: 100%; max-width:` for row elements.
- Use `padding: Xrem` vs large px on small screens; consider scaling or media queries.
- Use `min-width` sparingly—prefer `flex-basis` or `max-width`.

Where I saved this file
- AI_DIGEST_index_css.md (workspace root)

If you want, I can also:
- produce a 6-line patch that you can paste to fully fix the visual break at 370px,
- or create a small test HTML that isolates the failing section for quick repro.


---
End of digest
