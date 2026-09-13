# Design

## Source of truth
- Status: Active draft
- Last refreshed: 2026-08-10
- Primary product surfaces: Public CV website for `www.laurentcadieux.online`
- Evidence reviewed: Existing React/Vite project; `source-material/Laurent-Cadieux-CV2026-CanadaAE.docx`; `source-material/context/Laurent-Cadieux-CV2026-CanadaAE.md`; `source-material/context/LaurentCadieuxCONTEXT.md`; public LinkedIn profile/post markup for Laurent Cadieux; LinkedIn profile image promoted to `public/laurent-cadieux-linkedin.jpg`.

## Brand
- Personality: Strategic, senior, bilingual, commercially aware, technical, and action-oriented.
- Trust signals: Named role, contact details, downloadable CV, measurable career scope, timeline, platform depth, bilingual positioning.
- Avoid: Dumping every internal account note onto the public page, cartoonish visuals, unsupported claims, and generic portfolio filler.

## Product goals
- Goals: Present Laurent Cadieux as a senior enterprise AI/automation leader with a human/personal dimension; make the CV readable on mobile and desktop; provide direct contact and CV download paths.
- Non-goals: Blog, long case-study archive, private account-health portal, or exhaustive internal account detail.
- Success signals: Recruiter/executive can understand positioning, achievements, experience, skills, and contact path in one page.

## Personas and jobs
- Primary personas: Recruiters, hiring leaders, sales/technical leadership, enterprise automation stakeholders, referred contacts.
- User jobs: Quickly assess fit; scan proof points; inspect experience; download the CV; contact Laurent.
- Key contexts of use: Mobile referral review, desktop hiring review, LinkedIn/domain click-through.

## Information architecture
- Primary navigation: Profile, Experience, Skills, Contact, Personal.
- Core routes/screens: Single-page CV homepage.
- Content hierarchy: Hero positioning with professional photo, contact/download card, metric strip, profile, wins, timeline, technical depth, mindset, contact, personal/Kiteforce section, and a persistent password-gated LaurentContext assistant launcher.

## Design Principles
- Make the CV scan like an executive brief.
- Keep claims specific but public-safe.
- Use restrained visual hierarchy to support dense career information.
- Ensure every primary action is visible and keyboard accessible.

## Visual Language
- Color: Warm off-white base, graphite text, deep green primary, blue secondary, restrained amber highlights.
- Typography: System sans-serif with large but bounded hero type and compact body rhythm.
- Spacing/layout rhythm: Wide constrained page, full-width bands, dense cards, clear vertical sections.
- Shape/radius/elevation: 8px cards and buttons, low elevation, crisp borders.
- Motion: Short hover/focus transitions only.
- Imagery/iconography: Professional portrait in hero card, lucide icons, restrained cards; avoid fake portrait generation.

## Components
- Existing components to reuse: Vite/React app shell, CSS variable tokens.
- New/changed components: CV header, hero, professional photo card, download/contact card, metrics, wins cards, personal cards, experience timeline, skills cloud, mindset band, floating LaurentContext assistant, footer.
- Variants and states: Primary/secondary buttons; contact links; external LinkedIn link; assistant closed, password prompt, access denied, unlocked, and connected states.
- Token/component ownership: CSS custom properties in `src/styles.css`.

## Accessibility
- Target standard: WCAG 2.1 AA-minded basics.
- Keyboard/focus behavior: All links have visible focus and descriptive labels.
- Contrast/readability: Dark text on light surfaces; dark band uses light text with strong contrast.
- Screen-reader semantics: Landmark sections, heading order, meaningful link text.
- Reduced motion and sensory considerations: No required animation; decorative icons hidden where appropriate.

## Responsive Behavior
- Supported breakpoints/devices: Mobile 360px+, tablet, desktop, wide desktop.
- Layout adaptations: Hero stacks; metrics and cards collapse; timeline becomes single-column; nav can scroll horizontally on narrow screens.
- Touch/hover differences: No hover-only content.

## Interaction States
- Loading: Static site has no data-loading state.
- Empty: Not applicable.
- Error: Not applicable.
- Success: Contact links open native mail/phone/LinkedIn flows; CV download serves a static PDF; ElevenLabs conversation link opens the hosted Laurent agent.
- Disabled: Not applicable.
- Offline/slow network, if applicable: Core static page renders without external runtime data.

## Content Voice
- Tone: Executive, direct, credible, and compact.
- Terminology: Enterprise AI, automation, Field CTO, Sr. TAM, public sector, FINS, platform adoption, governance, agentic systems.
- Microcopy rules: Prefer evidence and concrete career scope over slogans; do not include private source notes on the public page.

## Implementation Constraints
- Framework/styling system: Vite, React, TypeScript, plain CSS, lucide-react.
- Design-token constraints: CSS variables in `:root`; no new design-system package.
- Performance constraints: Static, no heavy third-party scripts; downloadable CV is the only static document asset.
- Compatibility constraints: Modern evergreen browsers.
- Test/screenshot expectations: `npm run build`; HTTP smoke test; desktop and mobile Chrome screenshots.

## Open Questions
- [ ] Confirm whether phone number should remain public on the website.
- [ ] Confirm whether the page should be bilingual or English-only.
- [x] Replace the incorrect portrait with Laurent's public LinkedIn profile image.
- [ ] Confirm whether full ARR/customer figures should be published publicly or kept at the higher-level summary currently used.
