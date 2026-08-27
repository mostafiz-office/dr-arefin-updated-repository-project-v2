/**
 * Accessible star rating row.
 */
type Props = {
  rating: number;
  size?: number;
  className?: string;
};

const Star = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "hsl(var(--highlight))" : "none"}
    stroke="hsl(var(--highlight))"
    strokeWidth="1.5"
    aria-hidden="true"
    focusable="false"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const StarRating = ({ rating, size = 16, className = "" }: Props) => {
  const rounded = Math.round(rating);
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
      className={`inline-flex items-center gap-0.5 ${className}`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rounded} size={size} />
      ))}
    </span>
  );
};

export default StarRating;
