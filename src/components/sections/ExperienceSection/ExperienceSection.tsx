import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import type { ExperienceItem } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './ExperienceSection.module.css'

export const ExperienceSection = ({ experience }: { experience: ExperienceItem[] }) => {
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const [hitNodeIndex, setHitNodeIndex] = useState(0)
  const [burstTick, setBurstTick] = useState(0)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 35%'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.35 })
  const dotTop = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (experience.length < 2) return
    const nextIndex = Math.round(latest * (experience.length - 1))
    if (nextIndex !== hitNodeIndex) {
      setHitNodeIndex(nextIndex)
      setBurstTick((prev) => prev + 1)
    }
  })

  return (
    <section id={SECTION_IDS.experience} className={styles.section}>
      <Container>
        <SectionHeader title='Experience' subtitle='Journey' />
        <motion.div
          ref={timelineRef}
          className={styles.timeline}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className={styles.rail} aria-hidden='true'>
            <div className={styles.railTrack} />
            <motion.div className={styles.railProgress} style={{ scaleY: smoothProgress }} />
            <motion.span className={styles.railDot} style={{ top: dotTop }} />
          </div>

          {experience.map((item, index) => (
            <motion.article
              key={`${item.role}-${item.dateRange}`}
              className={styles.item}
              variants={{
                hidden: { opacity: 0, x: 24 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
              }}
            >
              <span className={styles.node} aria-hidden='true'>
                <AnimatePresence>
                  {hitNodeIndex === index ? (
                    <>
                      <motion.span
                        key={`${index}-${burstTick}-ring-1`}
                        className={styles.nodeBurst}
                        initial={{ scale: 0.35, opacity: 1 }}
                        animate={{ scale: 3.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.span
                        key={`${index}-${burstTick}-ring-2`}
                        className={`${styles.nodeBurst} ${styles.nodeBurstSecondary}`}
                        initial={{ scale: 0.2, opacity: 0.95 }}
                        animate={{ scale: 2.15, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.34, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.span
                        key={`${index}-${burstTick}-flash`}
                        className={styles.nodeFlash}
                        initial={{ scale: 0.6, opacity: 0.95 }}
                        animate={{ scale: 1.45, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                      />
                    </>
                  ) : null}
                </AnimatePresence>
              </span>
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
}
