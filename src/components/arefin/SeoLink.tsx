import { Link } from "react-router-dom";
import { ReactNode } from "react";

/**
 * SeoLink — Atto-style internal link.
 *
 * Reference: `https://attoproperty.com.au/carpet-cleaning-in-melton/`
 * Spec:      `Dr-Arefin-Spec/seo-link-wrapping.md`
 *
 * Rules enforced by the type system:
 *  - `to`    is REQUIRED and must be a relative internal path (project memory:
 *            internal links use relative paths with trailing slashes).
 *  - `title` is REQUIRED — every internal link MUST have a unique, keyword-rich
 *            title attribute (50–200 chars). This is the strongest single SEO
 *            signal Atto uses; missing it defeats the whole pattern.
 *  - `bold`  optional. Wraps the link in <strong> for emphasis (use sparingly:
 *            3–6 per page).
 *
 * Styling: subtle by default — inherits body color, shifts to brand green
 * with sharp text-shadow on hover (no underline). Defined in
 * `src/index.css` under the `.seo-link` class.
 */
export interface SeoLinkProps {
  to: string;
  title: string;
  bold?: boolean;
  children: ReactNode;
  className?: string;
}

export const SeoLink = ({ to, title, bold, children, className }: SeoLinkProps) => {
  const link = (
    <Link
      to={to}
      title={title}
      className={`seo-link${className ? ` ${className}` : ""}`}
    >
      {children}
    </Link>
  );
  return bold ? <strong>{link}</strong> : link;
};

export default SeoLink;
