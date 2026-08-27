import { useEffect, useState, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CountUpProps {
  /** Final numeric value (e.g. 20, 5000, 15000, 100) */
  end: number;
  /** Suffix appended after counting (e.g. "+", "%") */
  suffix?: string;
  /** Duration of the count animation in ms */
  duration?: number;
  /** Locale-format separator (e.g. "." for Italian thousands) */
  separator?: string;
  className?: string;
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const CountUp = ({
  end,
  suffix = "",
  duration = 2000,
  separator = ".",
  className = "",
}: CountUpProps) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const [displayValue, setDisplayValue] = useState("0");

  const formatNumber = useCallback(
    (num: number) => {
      if (!separator) return Math.floor(num).toString();
      return Math.floor(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    },
    [separator]
  );

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = easedProgress * end;

      setDisplayValue(formatNumber(currentValue));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(formatNumber(end));
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, end, duration, formatNumber]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-700 ease-out motion-reduce:transition-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className}`}
    >
      {displayValue}
      {suffix}
    </span>
  );
};

export default CountUp;
