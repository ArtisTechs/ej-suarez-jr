import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import type { SkillCategory } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './SkillsSection.module.css'

const iconByCategory: Record<string, ReactNode> = {
  Frontend: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M8 6 3 12l5 6M16 6l5 6-5 6M14 4l-4 16' />
    </svg>
  ),
  Backend: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <rect x='4' y='4' width='16' height='6' rx='2' />
      <rect x='4' y='14' width='16' height='6' rx='2' />
      <path d='M8 7h.01M8 17h.01M12 7h6M12 17h6' />
    </svg>
  ),
  Mobile: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <rect x='7' y='2.5' width='10' height='19' rx='2.5' />
      <path d='M10 5.5h4M11.5 18.5h1' />
    </svg>
  ),
  Database: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <ellipse cx='12' cy='6' rx='7' ry='3' />
      <path d='M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 10c0 1.7 3.1 3 7 3s7-1.3 7-3' />
    </svg>
  ),
  'IoT / Hardware': (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <rect x='7' y='7' width='10' height='10' rx='2' />
      <path d='M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3M10 10h4v4h-4z' />
    </svg>
  ),
  Tools: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='m14 6 4 4M3 21l7-7M11 7l6 6M18 3l3 3-5 5-3-3zM8 11l5 5' />
    </svg>
  ),
}

const fallbackIcon = (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <circle cx='12' cy='12' r='8' />
    <path d='M12 8v4l2.5 2.5' />
  </svg>
)

export const SkillsSection = ({ skills }: { skills: SkillCategory[] }) => {
  const banners = skills.flatMap((group) => group.items.map((item) => ({ item, category: group.category })))
  const firstTrack = banners.filter((_, index) => index % 2 === 0)
  const secondTrack = banners.filter((_, index) => index % 2 !== 0)

  return (
    <section id={SECTION_IDS.skills} className={styles.section}>
      <Container>
        <SectionHeader title='Skills & Tech Stack' subtitle='Capabilities' />
        <motion.div
          className={styles.marquees}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className={styles.marqueeRow}>
            <div className={`${styles.track} ${styles.left}`}>
              {[...firstTrack, ...firstTrack].map(({ item, category }, index) => (
                <span className={styles.banner} key={`${category}-${item}-${index}`}>
                  <span className={styles.icon}>{iconByCategory[category] ?? fallbackIcon}</span>
                  <span className={styles.text}>{item}</span>
                </span>
              ))}
            </div>
          </div>
          <div className={styles.marqueeRow}>
            <div className={`${styles.track} ${styles.right}`}>
              {[...secondTrack, ...secondTrack].map(({ item, category }, index) => (
                <span className={styles.banner} key={`${category}-${item}-${index}`}>
                  <span className={styles.icon}>{iconByCategory[category] ?? fallbackIcon}</span>
                  <span className={styles.text}>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
