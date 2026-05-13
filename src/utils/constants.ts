export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  projects: 'projects',
  services: 'services',
  contact: 'contact',
} as const

export const NAV_ITEMS = [
  { label: 'Home', href: `#${SECTION_IDS.home}` },
  { label: 'About', href: `#${SECTION_IDS.about}` },
  { label: 'Skills', href: `#${SECTION_IDS.skills}` },
  { label: 'Experience', href: `#${SECTION_IDS.experience}` },
  { label: 'Projects', href: `#${SECTION_IDS.projects}` },
  { label: 'Services', href: `#${SECTION_IDS.services}` },
  { label: 'Contact', href: `#${SECTION_IDS.contact}` },
]

export const THEME_STORAGE_KEY = 'portfolio-theme'
export const INTRO_SESSION_KEY = 'portfolio-intro-complete'
