import { motion } from 'framer-motion'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import type { ExperienceItem } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './ExperienceSection.module.css'

export const ExperienceSection = ({ experience }: { experience: ExperienceItem[] }) => (
  <section id={SECTION_IDS.experience} className={styles.section}>
    <Container>
      <SectionHeader title='Experience' subtitle='Journey' />
      <motion.div
        className={styles.timeline}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {experience.map((item) => (
          <motion.article
            key={`${item.role}-${item.dateRange}`}
            className={styles.item}
            variants={{
              hidden: { opacity: 0, x: 24 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
            }}
          >
            <span className={styles.node} aria-hidden='true' />
            <div className={styles.topRow}>
              <span className={styles.icon}>XP</span>
              <span className={styles.date}>{item.dateRange}</span>
            </div>
            <h3>{item.role}</h3>
            <p className={styles.org}>{item.organization}</p>
            <p className={styles.description}>{item.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </Container>
  </section>
)

