import { forwardRef, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "ghost";

interface BaseProps {
  children: ReactNode;
  hoverText: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  hoverIcon?: ReactNode;
  ariaLabel?: string;
}

interface AsLinkProps extends BaseProps {
  to: string;
  href?: never;
  onClick?: never;
  type?: never;
}

interface AsAnchorProps extends BaseProps {
  href: string;
  to?: never;
  onClick?: never;
  type?: never;
}

interface AsButtonProps extends BaseProps {
  onClick?: () => void;
  type?: "button" | "submit";
  to?: never;
  href?: never;
}

type Props = AsLinkProps | AsAnchorProps | AsButtonProps;

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground",
  ghost: "bg-transparent text-foreground border border-border hover:border-primary",
};

/**
 * CSS3 slide-text pill button.
 * Spec: Dr-Arefin-Spec/reference/design-system-source/03-design-system/05-buttons/02-join-us-slide-button.md
 *
 * Two stacked text layers; on hover the inner column translates -100% so the hover label replaces the default.
 */
const SlideButton = forwardRef<HTMLElement, Props>((props, ref) => {
  const {
    children,
    hoverText,
    variant = "primary",
    className = "",
    icon,
    hoverIcon,
    ariaLabel,
  } = props;

  const combinedClass = `arefin-slide-btn ${variantClasses[variant]} ${className}`;

  const content = (
    <span className="arefin-slide-btn__inner">
      <span className="arefin-slide-btn__text" aria-hidden={false}>
        {icon}
        {children}
      </span>
      <span className="arefin-slide-btn__text" aria-hidden="true">
        {hoverIcon ?? icon}
        {hoverText}
      </span>
    </span>
  );

  if ("to" in props && props.to) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={props.to}
        className={combinedClass}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        className={combinedClass}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={(props as AsButtonProps).type ?? "button"}
      onClick={(props as AsButtonProps).onClick}
      className={combinedClass}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
});

SlideButton.displayName = "SlideButton";

export default SlideButton;
