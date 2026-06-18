export const PAGES = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/ad-films-maker", label: "Ad Films" },
  { path: "/animation-videos", label: "Animation Videos" },
  { path: "/corporate-films", label: "Corporate Films" },
  { path: "/motion-graphics", label: "Motion Graphics" },
  { path: "/blog", label: "Blog" },
  { path: "/brand-video-production-services", label: "Brand Films" },
  { path: "/contact", label: "Contact" },
  { path: "/documentary-film-maker", label: "Documentaries" },
  { path: "/enquiry", label: "Enquiry" },
  { path: "/explainer-video-production", label: "Explainer Videos" },
  { path: "/music-video-production-services", label: "Music Videos" },
  { path: "/studio-rental", label: "Studio Rental" },
  { path: "/video-production-company", label: "Video Production" },
  { path: "/terms", label: "Terms" },
  { path: "/privacy", label: "Privacy" },
] as const;

export type PagePath = (typeof PAGES)[number]["path"];
