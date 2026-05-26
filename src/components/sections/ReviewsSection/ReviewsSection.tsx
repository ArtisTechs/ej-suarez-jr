import { motion } from 'framer-motion'
import type { UIEvent, WheelEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import type { ReviewItem } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './ReviewsSection.module.css'

const maxStars = 5

const ReviewCard = ({ review }: { review: ReviewItem }) => (
  <article className={styles.card}>
    <div className={styles.cardTop}>
      <div>
        <p className={styles.project}>{review.project}</p>
        <h3>{review.name}</h3>
        <div className={styles.rating} aria-label={`${review.rating} out of ${maxStars} stars`}>
          {Array.from({ length: maxStars }, (_, index) => (
            <span key={index} className={index < review.rating ? styles.starActive : styles.star}>
              ★
            </span>
          ))}
        </div>
        {review.highlight ? <p className={styles.highlight}>{review.highlight}</p> : null}
      </div>
    </div>
    <p className={styles.quote}>"{review.quote}"</p>
  </article>
)

export const ReviewsSection = ({ reviews }: { reviews: ReviewItem[] }) => {
  const marqueeFrameRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeTrackRef = useRef<HTMLDivElement>(null)
  const firstGroupRef = useRef<HTMLDivElement>(null)
  const resumeTimerRef = useRef<number | null>(null)
  const isReviewSelectedRef = useRef(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const scrollingReviews = [...reviews, ...reviews]

  const getLoopWidth = () => {
    const group = firstGroupRef.current
    const track = marqueeTrackRef.current

    if (!group || !track) return 0

    const trackStyles = window.getComputedStyle(track)
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || '0')
    return group.scrollWidth + gap
  }

  const centerManualScroll = () => {
    const shell = marqueeRef.current
    const loopWidth = getLoopWidth()

    if (!shell || loopWidth <= 0) return
    if (shell.scrollLeft < 2 || shell.scrollLeft >= loopWidth * 1.5) {
      shell.scrollLeft = loopWidth
    }
  }

  const pauseAutoScrolling = (prepareLoop = false) => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
    if (prepareLoop) {
      centerManualScroll()
    }
    setIsAutoScrolling(false)
  }

  const resumeAutoScrolling = () => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
    isReviewSelectedRef.current = false
    setIsAutoScrolling(true)
  }

  const resumeAutoScrollingSoon = () => {
    if (isReviewSelectedRef.current) return

    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setIsAutoScrolling(true)
      resumeTimerRef.current = null
    }, 900)
  }

  const selectReview = () => {
    pauseAutoScrolling()
    isReviewSelectedRef.current = true
  }

  const scrollReviews = (event: WheelEvent<HTMLDivElement>) => {
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY)
    const shiftedVerticalIntent = event.shiftKey && Math.abs(event.deltaY) > 0

    if (!horizontalIntent && !shiftedVerticalIntent) return

    event.preventDefault()
    pauseAutoScrolling(true)
    marqueeRef.current?.scrollBy({
      left: horizontalIntent ? event.deltaX : event.deltaY,
      behavior: 'smooth',
    })
    resumeAutoScrollingSoon()
  }

  const keepManualScrollLooping = (event: UIEvent<HTMLDivElement>) => {
    if (isAutoScrolling) return

    const shell = event.currentTarget
    const loopWidth = getLoopWidth()
    if (loopWidth <= 0) return

    if (shell.scrollLeft <= 1) {
      shell.scrollLeft += loopWidth
    } else if (shell.scrollLeft >= loopWidth * 1.5) {
      shell.scrollLeft -= loopWidth
    }
  }

  useEffect(() => {
    const resumeWhenClickingOutside = (event: PointerEvent) => {
      const frame = marqueeFrameRef.current
      const target = event.target

      if (!isReviewSelectedRef.current || !frame || !(target instanceof Node)) return
      if (!frame.contains(target)) {
        resumeAutoScrolling()
      }
    }

    document.addEventListener('pointerdown', resumeWhenClickingOutside)

    return () => {
      document.removeEventListener('pointerdown', resumeWhenClickingOutside)
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  return (
    <section id={SECTION_IDS.reviews} className={styles.section}>
      <Container>
        <SectionHeader title='Client Reviews' subtitle='Feedback' />
        <p className={styles.lead}>
          What collaborators and clients noticed after working through real builds, prototypes, and production-ready systems.
        </p>
      </Container>

      <motion.div
        ref={marqueeFrameRef}
        className={styles.marqueeFrame}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div
          ref={marqueeRef}
          className={styles.marqueeShell}
          onPointerDown={() => pauseAutoScrolling()}
          onPointerUp={resumeAutoScrollingSoon}
          onPointerCancel={resumeAutoScrollingSoon}
          onPointerLeave={resumeAutoScrollingSoon}
          onClick={selectReview}
          onScroll={keepManualScrollLooping}
          onWheel={scrollReviews}
        >
          <div ref={marqueeTrackRef} className={`${styles.marqueeTrack} ${isAutoScrolling ? '' : styles.marqueeTrackPaused}`}>
            <div ref={firstGroupRef} className={styles.marqueeGroup}>
              {reviews.map((review) => (
                <ReviewCard key={review.project} review={review} />
              ))}
            </div>
            <div className={styles.marqueeGroup} aria-hidden='true'>
              {scrollingReviews.slice(0, reviews.length).map((review, index) => (
                <ReviewCard key={`${review.project}-clone-${index}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
