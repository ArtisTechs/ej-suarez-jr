import { Footer } from '../../components/layout/Footer/Footer'
import { Navbar } from '../../components/layout/Navbar/Navbar'
import { AboutSection } from '../../components/sections/AboutSection/AboutSection'
import { ContactSection } from '../../components/sections/ContactSection/ContactSection'
import { ExperienceSection } from '../../components/sections/ExperienceSection/ExperienceSection'
import { HeroSection } from '../../components/sections/HeroSection/HeroSection'
import { ProjectsSection } from '../../components/sections/ProjectsSection/ProjectsSection'
import { ServicesSection } from '../../components/sections/ServicesSection/ServicesSection'
import { SkillsSection } from '../../components/sections/SkillsSection/SkillsSection'
import { portfolioMock } from '../../data/portfolio.mock'
import type { ThemeMode } from '../../types/portfolio.types'

interface LandingPageProps {
  theme: ThemeMode
  onToggleTheme: () => void
}

export const LandingPage = ({ theme, onToggleTheme }: LandingPageProps) => {
  const { profile, socialLinks, skills, experience, projects, services } = portfolioMock

  return (
    <>
      <Navbar name={profile.name} theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <HeroSection profile={profile} links={socialLinks} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={projects} />
        <ServicesSection services={services} />
        <ContactSection profile={profile} links={socialLinks} />
      </main>
      <Footer name={profile.name} links={socialLinks} />
    </>
  )
}
