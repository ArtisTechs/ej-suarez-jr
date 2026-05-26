import styles from './Resume.module.css'

interface SkillsGroupProps {
  category: string
  items: string[]
}

export const SkillsGroup = ({ category, items }: SkillsGroupProps) => (
  <p className={styles.skillGroup}>
    <strong>{category}:</strong> {items.join(', ')}
  </p>
)
