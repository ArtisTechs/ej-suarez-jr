import { motion } from 'framer-motion'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import type { ProfileInfo } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './AboutSection.module.css'

export const AboutSection = ({ profile }: { profile: ProfileInfo }) => (
  <section id={SECTION_IDS.about} className={styles.section}>
    <Container>
      <SectionHeader title='About Me' subtitle='Background' />
      <motion.div className={styles.grid} initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
        <motion.article className={`${styles.card} ${styles.introCard}`} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }}>
          <span className={styles.icon}>DEV</span>
          <h3>Who I Am</h3>
          <p className={styles.intro}>{profile.about}</p>
        </motion.article>

        <motion.article className={`${styles.card} ${styles.focusCard}`} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }}>
          <span className={styles.icon}>FOCUS</span>
          <h3>Focus Areas</h3>
          <ul>{profile.focusAreas.map((item) => <li key={item}>{item}</li>)}</ul>
        </motion.article>
      </motion.div>
    </Container>
  </section>
)

