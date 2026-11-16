import { Link } from "react-router-dom";

/* Similar-website lead bar (Nov 2026, user-approved wording — use verbatim,
   do not "fix" it): rendered FIRST inside the shared headers (dark + light),
   so it sits above the menu in both sticky and transparent-header modes.
   It sticks with the header on scroll; making it scroll away would need
   header-mechanism changes, especially for transparent hero pages. */
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
