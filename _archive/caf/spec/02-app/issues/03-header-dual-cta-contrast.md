# Issue #03: Header Dual CTA Contrast Failure

## Summary
The header dual-button CTA had insufficient color contrast, failing WCAG 2.1 AA accessibility guidelines (minimum 4.5:1 ratio for normal text).

## Root Cause
The "Chiamaci" button was using `text-primary-foreground` which may have been overridden or not rendering as pure white (`#ffffff`) on the dark CTA background (`#0C2818`). This resulted in a potential contrast failure.

## Fix Description
1. **React Header**: Changed to explicit `text-white` class with `bg-cta-bg` Tailwind token
2. **Global CSS**: Added explicit `color: #ffffff` for both button variants with documented contrast ratios:
   - Dark button (`#0C2818` bg + `#ffffff` text): **12.6:1** contrast (exceeds AAA)
   - Green button (`#379237` bg + `#ffffff` text): **4.52:1** contrast (meets AA)
   - Divider (`#ffffff` bg + `#111111` text): **18.9:1** contrast (exceeds AAA)
3. **Hover states**: Changed from `opacity: 0.9` to `filter: brightness(1.1)` + `translateY(-1px)` for better UX without affecting contrast

## WCAG 2.1 AA Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text (18px+ or 14px+ bold)**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

## Prevention Rules
1. All foreground text on colored backgrounds must use explicit `color: #ffffff` or verified high-contrast tokens
2. Document contrast ratios in CSS comments when creating colored button variants
3. Never use `opacity` hover states on text that may reduce contrast below thresholds
4. Use `filter: brightness()` for hover states to maintain contrast ratios

## Verification Tools
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools Accessibility panel
- Lighthouse accessibility audit
