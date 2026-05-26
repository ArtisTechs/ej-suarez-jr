import { motion } from 'framer-motion'
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
  const scrollingReviews = [...reviews, ...reviews]

  return (
    <section id={SECTION_IDS.reviews} className={styles.section}>
      <Container>
        <SectionHeader title='Client Reviews' subtitle='Feedback' />
        <p className={styles.lead}>
          What collaborators and clients noticed after working through real builds, prototypes, and production-ready systems.
        </p>
      </Container>

      <motion.div
        className={styles.marqueeShell}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeGroup}>
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
      </motion.div>
    </section>
  )
}
