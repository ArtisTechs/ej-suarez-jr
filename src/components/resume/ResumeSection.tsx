import type { ReactNode } from 'react'
import styles from './Resume.module.css'

interface ResumeSectionProps {
  title: string
  children: ReactNode
}

export const ResumeSection = ({ title, children }: ResumeSectionProps) => (
  <section className={styles.section}>
    <h2>{title}</h2>
    {children}
  </section>
)
