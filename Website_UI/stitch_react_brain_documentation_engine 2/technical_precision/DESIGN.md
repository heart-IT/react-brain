---
name: Technical Precision
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#bec8ce'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#889298'
  outline-variant: '#3f484e'
  surface-tint: '#79d1fb'
  primary: '#79d1fb'
  on-primary: '#003547'
  primary-container: '#087ea4'
  on-primary-container: '#fcfdff'
  inverse-primary: '#006686'
  secondary: '#d2bbff'
  on-secondary: '#3f008e'
  secondary-container: '#6001d1'
  on-secondary-container: '#c9aeff'
  tertiary: '#ffb86a'
  on-tertiary: '#492900'
  tertiary-container: '#a46717'
  on-tertiary-container: '#fffcff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c0e8ff'
  primary-fixed-dim: '#79d1fb'
  on-primary-fixed: '#001e2b'
  on-primary-fixed-variant: '#004d66'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffdcbc'
  tertiary-fixed-dim: '#ffb86a'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#683d00'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
  link-blue: '#38BDF8'
  recommend-green: '#22C55E'
  warning-orange: '#F59E0B'
  avoid-red: '#EF4444'
  experimental-purple: '#A855F7'
  surface-card: '#161B22'
  border-subtle: '#30363D'
  text-muted: '#94A3B8'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
  container-max: 1200px
  gutter: 24px
  sidebar-width: 280px
---

## Brand & Style

The design system is a high-density, technical documentation framework that balances the clinical rigor of developer tools with the refined legibility of premium editorial platforms. It targets senior engineers and architects who require immediate access to high-signal information without visual fluff.

The aesthetic is **Corporate / Modern** with a **Minimalist** lean. It prioritizes information hierarchy through stark typography and a functional color system rather than decorative elements. The mood is authoritative, precise, and systematic—evoking the feeling of a well-maintained codebase. Inspired by the density of Stripe's documentation and the clarity of React.dev, this system uses a "dark-first" approach to reduce cognitive load during long technical deep-dives.

## Colors

The palette is strictly functional, utilizing a deep neutral base to allow semantic colors to pop.

- **Primary & Neutral:** The background is near-black (`#0F1115`) to provide maximum contrast for white text, while surfaces use a slightly lighter charcoal (`#161B22`) to create depth.
- **Semantic Logic:** Color is used exclusively for categorization.
    - **Blue:** Primary actions and hyperlinks.
    - **Green:** Success states and "Recommended" patterns.
    - **Orange:** Technical caveats and "Warnings".
    - **Red:** Deprecations, errors, and "Avoid" patterns.
    - **Purple:** New features and "Experimental" flags.
- **Contrast:** High contrast is maintained between text and background to ensure accessibility in technical contexts.

## Typography

Typography is the backbone of this system. It uses a triple-font strategy:
1. **Hanken Grotesk (Headings):** A sharp, contemporary sans-serif that provides a "tech-forward" and authoritative look.
2. **Inter (Body):** Chosen for its exceptional readability in dense paragraphs and UI labels.
3. **JetBrains Mono (Code/Metadata):** A professional monospace used for inline code, terminal snippets, and tabular data.

**Key Rules:**
- Headings use tight letter spacing and heavy weights to create a strong visual anchor.
- Body text uses a slightly increased line-height (`1.6x`) to facilitate comfortable reading of long-form technical content.
- Monospaced text is used for any string that represents a literal value (API keys, package names, file paths).

## Layout & Spacing

This design system uses a **Fixed-Fluid Hybrid** grid. The primary content column is capped at `1200px` to maintain optimal line lengths, centered within the viewport.

- **Grid:** A 12-column grid is used for landing pages, while documentation pages utilize a three-column layout:
  1. **Global Nav:** Left-aligned, fixed width.
  2. **Content:** Fluid center column.
  3. **Table of Contents:** Right-aligned, hidden on mobile.
- **Rhythm:** A strict 4px baseline grid ensures vertical alignment. Paragraphs are separated by `24px` to provide breathing room between technical concepts.
- **Mobile:** Margins reduce to `16px`, and multi-column tables reflow into scrollable containers or card stacks.

## Elevation & Depth

In a dark technical UI, depth is communicated through **Tonal Layers** rather than heavy shadows.

- **Base Layer:** The deepest layer (`#0F1115`), used for the main application background.
- **Content Layer:** Cards and code blocks sit on a slightly elevated surface (`#161B22`).
- **Interaction Layer:** Hover states use a subtle `1px` border of `#30363D` to define the shape without adding visual noise.
- **Overlays:** Modals and tooltips use a very subtle ambient shadow (Black, 40% opacity, 12px blur) to separate them from the primary content plane.

## Shapes

The design system uses **Soft** geometry (`4px` standard radius). This subtle rounding maintains the "engineered" feel of the interface while avoiding the harshness of 90-degree corners.

- **Small elements:** Checkboxes, buttons, and badges use `4px`.
- **Large elements:** Code blocks and container cards use `8px` (`rounded-lg`).
- **Interactive zones:** Buttons never use pill-shapes; they remain rectangular with soft corners to align with the systematic, grid-based layout.

## Components

- **Buttons:** Primary buttons use a solid blue background with white text. Secondary buttons are "Ghost" style—transparent with a subtle border.
- **Chips/Badges:** Essential for the "Status" and "Confidence" indicators. Use high-contrast text on low-opacity backgrounds (e.g., Green text on 10% green background).
- **Cards:** Used for list items and deep-dive previews. They feature a `1px` border and no shadow.
- **Input Fields:** Dark backgrounds with a `1px` stroke. Focus states use a `2px` primary blue glow.
- **Code Blocks:** Syntax-highlighted containers with a "Copy" action in the top right. Use a distinct dark background (`#010409`) to differentiate from standard content cards.
- **Callouts:** Horizontal bars on the left side of the block, color-coded by the functional palette (Green for Recommendation, etc.).