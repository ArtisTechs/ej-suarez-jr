import type { ResumeProjectItem } from '../../data/resume.data'
import styles from './Resume.module.css'

interface ProjectItemProps {
  item: ResumeProjectItem
}

export const ProjectItem = ({ item }: ProjectItemProps) => (
  <article className={styles.entry}>
    <div className={styles.projectHeader}>
      <h3>{item.title}</h3>
      <p>{item.techStack}</p>
    </div>
    <ul>
      {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
    </ul>
  </article>
)
