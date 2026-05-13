export type ThemeMode = 'dark' | 'light'

export interface SocialLink {
  label: string
  href: string
}

export interface ProfileInfo {
  name: string
  headline: string
  intro: string
  email: string
  mobile: string
  location: string
  availability: string
  focusAreas: string[]
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ExperienceItem {
  role: string
  organization: string
  dateRange: string
  description: string
}

export type ProjectCategory = 'Web' | 'Mobile' | 'Backend' | 'IoT'

export interface ProjectItem {
  title: string
  description: string
  techStack: string[]
  category: ProjectCategory
  imageUrl: string
  githubUrl: string
  demoUrl: string
}

export interface ServiceItem {
  title: string
  description: string
}

export interface PortfolioData {
  profile: ProfileInfo
  socialLinks: SocialLink[]
  skills: SkillCategory[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  services: ServiceItem[]
}
