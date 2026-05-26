import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import { Badge } from '../../common/Badge/Badge'
import type { ProjectCategory, ProjectItem, ProjectScreenshot } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './ProjectsSection.module.css'

const filters: Array<'All' | ProjectCategory> = ['All', 'Fullstack', 'Frontend', 'Web', 'Mobile', 'Backend', 'IoT']
const projectIcon: Record<ProjectCategory, string> = { Web: 'WEB', Mobile: 'APP', Backend: 'API', IoT: 'IOT', Frontend: 'UI', Fullstack: 'FULL' }
const previewCountByMode: Record<ProjectScreenshot['mode'], number> = { web: 1, tablet: 2, mobile: 3 }
const hasProjectLink = (url?: string) => Boolean(url && url !== '#')

export const ProjectsSection = ({ projects }: { projects: ProjectItem[] }) => {
  const [active, setActive] = useState<(typeof filters)[number]>('All')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1)
  const railRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number, y: number } | null>(null)

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((item) => item.category === active)),
    [active, projects],
  )

  const selectedImages: ProjectScreenshot[] = useMemo(() => {
    if (!selectedProject) return []
    if (!selectedProject.screenshots?.length) {
      return [{ src: selectedProject.imageUrl, mode: selectedProject.category === 'Mobile' ? 'mobile' : 'web' }]
    }
    return selectedProject.screenshots.map((shot) => (
      typeof shot === 'string'
        ? { src: shot, mode: selectedProject.category === 'Mobile' ? 'mobile' : 'web' }
        : shot
    ))
  }, [selectedProject])

  const scrollCards = (direction: 'left' | 'right') => {
    railRef.current?.scrollBy({ left: direction === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  const showNextImage = useCallback(() => {
    setSlideDirection(1)
    setActiveImageIndex((prev) => (prev + 1) % selectedImages.length)
  }, [selectedImages.length])

  const showPrevImage = useCallback(() => {
    setSlideDirection(-1)
    setActiveImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length)
  }, [selectedImages.length])

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }, [active])

  useEffect(() => {
    if (!selectedProject) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
      if (event.key === 'ArrowRight') {
        showNextImage()
      }
      if (event.key === 'ArrowLeft') {
        showPrevImage()
      }
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedProject, selectedImages.length, showNextImage, showPrevImage])

  useEffect(() => {
    if (!selectedProject || selectedImages.length < 2) return

    const autoPlay = window.setInterval(() => {
      setSlideDirection(1)
      setActiveImageIndex((prev) => (prev + 1) % selectedImages.length)
    }, 2600)

    return () => window.clearInterval(autoPlay)
  }, [selectedProject, selectedImages.length])

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project)
    setActiveImageIndex(0)
    setSlideDirection(1)
  }

  const closeProjectModal = () => setSelectedProject(null)

  const frameClassByMode = {
    mobile: styles.phoneFrame,
    tablet: styles.tabletFrame,
    web: styles.desktopFrame,
  }

  const activeImageMode = selectedImages[activeImageIndex]?.mode ?? 'web'
  const activeModeImages = selectedImages.filter((shot) => shot.mode === activeImageMode)
  const activeModeImageIndex = Math.max(
    0,
    activeModeImages.findIndex((shot) => shot === selectedImages[activeImageIndex]),
  )
  const visibleImages = activeModeImages.slice(
    activeModeImageIndex,
    activeModeImageIndex + previewCountByMode[activeImageMode],
  )
  const visibleCount = visibleImages.length
  const previewCountClass = visibleCount === 1 ? styles.oneScreen : visibleCount === 2 ? styles.twoScreens : styles.threeScreens

  return (
    <section id={SECTION_IDS.projects} className={styles.section}>
      <Container>
        <SectionHeader title='Projects' subtitle='Selected Work' />
        <div className={styles.filters}>
          {filters.map((filter) => (
            <button key={filter} type='button' className={active === filter ? styles.active : ''} onClick={() => setActive(filter)}>
              {filter}
            </button>
          ))}
        </div>
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
              onClick={() => openProjectModal(project)}
              role='button'
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openProjectModal(project)
                }
              }}
              initial={{ opacity: 0, y: 26, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24), ease: 'easeOut' }}
            >
              <img className={styles.cover} src={project.imageUrl} alt={`${project.title} preview`} />
              <div className={styles.body}>
                <h3>
                  <span className={styles.icon}>{projectIcon[project.category]}</span>
                  {project.title}
                </h3>
                <p>{project.description}</p>
                <div className={styles.badges}>{project.techStack.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
                {hasProjectLink(project.githubUrl) || hasProjectLink(project.demoUrl) ? (
                  <div className={styles.links}>
                    {hasProjectLink(project.githubUrl) ? <a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>GitHub</a> : null}
                    {hasProjectLink(project.demoUrl) ? <a href={project.demoUrl} target='_blank' rel='noopener noreferrer'>Demo</a> : null}
                  </div>
                ) : null}
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

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            <motion.aside
              className={styles.modal}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.97 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type='button' className={styles.closeBtn} aria-label='Close project details' onClick={closeProjectModal}>
                <svg viewBox='0 0 24 24' aria-hidden='true' focusable='false' className={styles.closeIcon}>
                  <path d='M6 6l12 12M18 6L6 18' />
                </svg>
              </button>

              <div className={styles.modalHeader}>
                <h3>
                  <span className={styles.icon}>{projectIcon[selectedProject.category]}</span>
                  {selectedProject.title}
                </h3>
                <p>{selectedProject.description}</p>
                <div className={styles.badges}>{selectedProject.techStack.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
                {hasProjectLink(selectedProject.githubUrl) || hasProjectLink(selectedProject.demoUrl) ? (
                  <div className={styles.links}>
                    {hasProjectLink(selectedProject.githubUrl) ? <a href={selectedProject.githubUrl} target='_blank' rel='noopener noreferrer'>GitHub</a> : null}
                    {hasProjectLink(selectedProject.demoUrl) ? <a href={selectedProject.demoUrl} target='_blank' rel='noopener noreferrer'>Demo</a> : null}
                  </div>
                ) : null}
              </div>

              <div className={styles.modalMedia}>
                <div
                  className={styles.gallery}
                  onTouchStart={(event) => {
                    const touch = event.touches[0]
                    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
                  }}
                  onTouchEnd={(event) => {
                    if (!touchStartRef.current || selectedImages.length < 2) return
                    const touch = event.changedTouches[0]
                    const deltaX = touch.clientX - touchStartRef.current.x
                    const deltaY = touch.clientY - touchStartRef.current.y
                    const horizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 36
                    if (!horizontalSwipe) return
                    if (deltaX < 0) showNextImage()
                    if (deltaX > 0) showPrevImage()
                    touchStartRef.current = null
                  }}
                  onWheel={(event) => {
                    if (selectedImages.length < 2) return
                    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY)
                    const shiftedVerticalIntent = event.shiftKey && Math.abs(event.deltaY) > 0
                    if (!horizontalIntent && !shiftedVerticalIntent) return
                    event.preventDefault()
                    const delta = horizontalIntent ? event.deltaX : event.deltaY
                    if (delta > 0) showNextImage()
                    else showPrevImage()
                  }}
                >
                  {selectedImages.length > 1 ? (
                    <>
                      <button type='button' className={`${styles.galleryArrow} ${styles.galleryLeft}`} aria-label='Previous screens' onClick={showPrevImage}>
                        <svg viewBox='0 0 320 512' aria-hidden='true' focusable='false' className={styles.arrowIcon}>
                          <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
                        </svg>
                      </button>
                      <button type='button' className={`${styles.galleryArrow} ${styles.galleryRight}`} aria-label='Next screens' onClick={showNextImage}>
                        <svg viewBox='0 0 320 512' aria-hidden='true' focusable='false' className={styles.arrowIcon}>
                          <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
                        </svg>
                      </button>
                    </>
                  ) : null}

                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={`${selectedProject.title}-${activeImageIndex}`}
                      className={`${styles.multiScreens} ${previewCountClass}`}
                      custom={slideDirection}
                      initial={{ opacity: 0, x: slideDirection > 0 ? 34 : -34, scale: 0.985 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: slideDirection > 0 ? -30 : 30, scale: 0.99 }}
                      transition={{ type: 'spring', stiffness: 250, damping: 28, mass: 0.8 }}
                    >
                      {visibleImages.map((shot, index) => (
                        <motion.div
                          key={`${shot.src}-${index}`}
                          className={`${styles.deviceFrame} ${frameClassByMode[shot.mode]} ${selectedProject.category === 'Backend' ? styles.serverFrame : ''} ${selectedProject.category === 'IoT' ? styles.labFrame : ''}`}
                          initial={{ opacity: 0, x: slideDirection > 0 ? 16 : -16, scale: 0.99 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 280, damping: 30, delay: Math.min(index * 0.05, 0.12) }}
                        >
                          <img className={styles.modalImage} src={shot.src} alt={`${selectedProject.title} ${shot.mode} screen ${index + 1}`} />
                          <span className={styles.modeTag}>{shot.mode.toUpperCase()}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
