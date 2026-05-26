import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../common/Button/Button'
import { Container } from '../../common/Container/Container'
import type { ProfileInfo, SocialLink } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import { getAppUrl } from '../../../utils/routing'
import styles from './HeroSection.module.css'
import heroImage from '../../../assets/profile.png'

interface HeroSectionProps { profile: ProfileInfo; links: SocialLink[] }

export const HeroSection = ({ profile, links }: HeroSectionProps) => {
  const roles = useMemo(() => profile.headline.split('|').map((item) => item.trim()).filter(Boolean), [profile.headline])
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (roles.length < 2) return

    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 4600)

    return () => window.clearInterval(timer)
  }, [roles])

  return (
    <section id={SECTION_IDS.home} className={styles.hero}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className={styles.content}>
          <img className={styles.avatar} src={heroImage} alt='Sample developer profile' />
          <p className={styles.kicker}>Developer Portfolio</p>
          <h1>{profile.name}</h1>
          <div className={styles.roleWrap} aria-live='polite'>
            <AnimatePresence mode='wait'>
              <motion.h2
                key={roles[roleIndex] ?? profile.headline}
                initial={{ opacity: 0, x: 42, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -42, filter: 'blur(6px)' }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {roles[roleIndex] ?? profile.headline}
              </motion.h2>
            </AnimatePresence>
          </div>
          <p className={styles.introText}>{profile.intro}</p>
          <div className={styles.stats} aria-label='Portfolio highlights'>
            <div className={styles.statCard}>
              <strong>20+</strong>
              <span>Successful Projects</span>
            </div>
            <div className={styles.statCard}>
              <strong>35</strong>
              <span>GitHub Repositories</span>
            </div>
          </div>
          <div className={styles.actions}>
            <Button onClick={() => document.getElementById(SECTION_IDS.projects)?.scrollIntoView({ behavior: 'smooth' })}>View Projects</Button>
            <Button variant='secondary' onClick={() => window.location.assign(getAppUrl('/resume'))}>View Resume</Button>
            <Button variant='secondary' onClick={() => document.getElementById(SECTION_IDS.contact)?.scrollIntoView({ behavior: 'smooth' })}>Contact Me</Button>
          </div>
          <div className={styles.socials}>{links.map((link) => <a key={link.label} href={link.href} target='_blank' rel='noopener noreferrer'>{link.label}</a>)}</div>
        </motion.div>
      </Container>
    </section>
  )
}
