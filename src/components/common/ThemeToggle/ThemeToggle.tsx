import type { ThemeMode } from '../../../types/portfolio.types'
import styles from './ThemeToggle.module.css'

interface ThemeToggleProps {
  theme: ThemeMode
  onToggle: () => void
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <button
    className={`${styles.toggle} ${theme === 'light' ? styles.light : ''}`}
    onClick={onToggle}
    aria-label='Toggle theme'
    aria-pressed={theme === 'light'}
    type='button'
  >
    <span className={styles.thumb}>
      <svg
        className={`${styles.icon} ${styles.sun}`}
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='4.2' />
        <path d='M12 2.2v2.2M12 19.6v2.2M2.2 12h2.2M19.6 12h2.2M4.8 4.8l1.6 1.6M17.6 17.6l1.6 1.6M4.8 19.2l1.6-1.6M17.6 6.4l1.6-1.6' />
      </svg>
      <svg
        className={`${styles.icon} ${styles.moon}`}
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path d='M20.2 14.3A8.7 8.7 0 1 1 9.7 3.8a7.2 7.2 0 1 0 10.5 10.5Z' />
      </svg>
    </span>
  </button>
)
