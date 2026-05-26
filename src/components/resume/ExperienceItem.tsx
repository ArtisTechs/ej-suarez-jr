import type { ResumeExperienceItem } from '../../data/resume.data'
import styles from './Resume.module.css'

interface ExperienceItemProps {
  item: ResumeExperienceItem
}

export const ExperienceItem = ({ item }: ExperienceItemProps) => (
  <article className={styles.entry}>
    <div className={styles.entryHeader}>
      <div>
        <h3>{item.role}</h3>
        <p>{item.organization}{item.location ? `, ${item.location}` : ''}</p>
      </div>
      <span>{item.dateRange}</span>
    </div>
    <ul>
      {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
    </ul>
  </article>
)
