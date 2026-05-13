import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  title: string
  subtitle: string
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <header className={styles.header}>
    <p className={styles.kicker}>{subtitle}</p>
    <h2>{title}</h2>
  </header>
)
