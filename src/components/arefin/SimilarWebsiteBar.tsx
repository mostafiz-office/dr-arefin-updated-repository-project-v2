import { Link } from "react-router-dom";

/* Similar-website lead bar (Nov 2026, user-approved wording — use verbatim,
   do not "fix" it): rendered only on the Contact page
   (src/pages/ContactDark.tsx). Do not add it back to the shared headers. */
export default function SimilarWebsiteBar() {
  return (
    <div className="arefin-similar-bar">
      <p className="arefin-similar-bar-text">
        Do you want a website like Dr. Arefin for your business?
      </p>
      <Link to="/similar-website/" className="arefin-similar-bar-btn">
        Get a Similar Website
      </Link>
    </div>
  );
}
