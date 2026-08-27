import HomeMobileHeroV1 from "./HomeMobileHeroV1";
import HomeMobileHeroV2 from "./HomeMobileHeroV2";
import HomeMobileHeroV3 from "./HomeMobileHeroV3";

export type HomeMobileHeroVariant = "v1" | "v2" | "v3";

interface Props {
  variant?: HomeMobileHeroVariant;
}

/**
 * HomeMobileHero — picks one of three full-viewport mobile hero variants.
 * Default V1 (stacked compact). Change one prop to A/B test.
 */
const HomeMobileHero = ({ variant = "v1" }: Props) => {
  if (variant === "v2") return <HomeMobileHeroV2 />;
  if (variant === "v3") return <HomeMobileHeroV3 />;
  return <HomeMobileHeroV1 />;
};

export default HomeMobileHero;
