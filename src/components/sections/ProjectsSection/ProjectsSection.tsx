import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import { Badge } from '../../common/Badge/Badge'
import type { ProjectCategory, ProjectItem } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './ProjectsSection.module.css'

const filters: Array<'All' | ProjectCategory> = ['All', 'Web', 'Mobile', 'Backend', 'IoT']
const projectIcon: Record<ProjectCategory, string> = { Web: 'WEB', Mobile: 'APP', Backend: 'API', IoT: 'IOT' }

export const ProjectsSection = ({ projects }: { projects: ProjectItem[] }) => {
  const [active, setActive] = useState<(typeof filters)[number]>('All')
  const railRef = useRef<HTMLDivElement>(null)
  const filtered = useMemo(() => (active === 'All' ? projects : projects.filter((item) => item.category === active)), [active, projects])

  const scrollCards = (direction: 'left' | 'right') => {
    railRef.current?.scrollBy({ left: direction === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }, [active])

  return (
    <section id={SECTION_IDS.projects} className={styles.section}>
      <Container>
        <SectionHeader title='Projects' subtitle='Selected Work' />
        <div className={styles.filters}>{filters.map((filter) => <button key={filter} type='button' className={active === filter ? styles.active : ''} onClick={() => setActive(filter)}>{filter}</button>)}</div>
        <p className={styles.hint}>Swipe or scroll sideways to browse cards.</p>
      </Container>

      <div className={styles.railWrap}>
        <button type='button' className={`${styles.railArrow} ${styles.left}`} aria-label='Scroll projects left' onClick={() => scrollCards('left')}>
          <svg viewBox='0 0 320 512' aria-hidden='true' focusable='false' className={styles.arrowIcon}>
            <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
          </svg>
        </button>
        <div className={styles.rail} ref={railRef}>
          {filtered.map((project, index) => (
            <motion.article
              key={project.title}
              className={styles.card}
              initial={{ opacity: 0, y: 26, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24), ease: 'easeOut' }}
            >
              <img className={styles.cover} src={project.imageUrl} alt={`${project.title} preview`} />
              <div className={styles.body}>
                <h3><span className={styles.icon}>{projectIcon[project.category]}</span>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.badges}>{project.techStack.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
                <div className={styles.links}><a href={project.githubUrl}>GitHub</a><a href={project.demoUrl}>Demo</a></div>
              </div>
            </motion.article>
          ))}
        </div>
        <button type='button' className={`${styles.railArrow} ${styles.right}`} aria-label='Scroll projects right' onClick={() => scrollCards('right')}>
          <svg viewBox='0 0 320 512' aria-hidden='true' focusable='false' className={styles.arrowIcon}>
            <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
          </svg>
        </button>
      </div>
    </section>
  )
}

