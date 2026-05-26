import type { ResumeContactItem } from '../../data/resume.data'
import styles from './Resume.module.css'

interface ResumeHeaderProps {
  name: string
  title: string
  contacts: ResumeContactItem[]
}

export const ResumeHeader = ({ name, title, contacts }: ResumeHeaderProps) => (
  <header className={styles.resumeHeader}>
    <h1>{name}</h1>
    <p>{title}</p>
    <address className={styles.contacts}>
      {contacts.map((contact) => (
        <span key={contact.label}>
          <strong>{contact.label}:</strong>{' '}
          {contact.href ? <a href={contact.href}>{contact.value}</a> : contact.value}
        </span>
      ))}
    </address>
  </header>
)
