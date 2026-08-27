// Pages × breakpoints matrix for visual regression.
// Keep in sync with src/App.tsx routes and Dr-Arefin-Spec/reviewer/09-responsive-qa.md.

export type PageDef = {
  name: string;   // snapshot identifier (used in filenames)
  path: string;   // route to visit
};

export const PAGES: PageDef[] = [
  { name: "home",                path: "/" },
  { name: "home-light",          path: "/light/" },
  { name: "about",               path: "/about/" },
  { name: "treatment",           path: "/treatment/" },
  { name: "liver-surgery",       path: "/treatment/liver-surgery/" },
  { name: "gallbladder-surgery", path: "/treatment/gallbladder-surgery/" },
  { name: "pancreatic-surgery",  path: "/treatment/pancreatic-surgery/" },
  { name: "biliary-surgery",     path: "/treatment/biliary-tract-surgery/" },
  { name: "mentorship",          path: "/mentorship/" },
  { name: "articles",            path: "/articles/" },
  { name: "gallery",             path: "/gallery/" },
  { name: "contact",             path: "/contact/" },
];

// Breakpoints from Dr-Arefin-Spec/reviewer/09-responsive-qa.md
export const BREAKPOINTS = [
  { name: "xs",  width: 375,  height: 812  }, // iPhone
  { name: "sm",  width: 414,  height: 896  }, // large phone
  { name: "md",  width: 768,  height: 1024 }, // tablet portrait
  { name: "lg",  width: 1024, height: 768  }, // tablet landscape / desktop boundary
  { name: "xl",  width: 1280, height: 800  }, // small desktop
  { name: "2xl", width: 1440, height: 900  }, // large desktop
];
