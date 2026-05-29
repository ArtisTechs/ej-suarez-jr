import type { PortfolioData } from "../types/portfolio.types";
import { experience } from "./portfolio/experience.data";
import { profile } from "./portfolio/profile.data";
import { projects } from "./portfolio/projects.data";
import { reviews } from "./portfolio/reviews.data";
import { services } from "./portfolio/services.data";
import { skills } from "./portfolio/skills.data";
import { socialLinks } from "./portfolio/social-links.data";

export const portfolioMock: PortfolioData = {
  profile,
  socialLinks,
  skills,
  experience,
  projects,
  services,
  reviews,
};
