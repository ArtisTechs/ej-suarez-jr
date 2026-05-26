import { Container } from '../../common/Container/Container'
import type { SocialLink } from '../../../types/portfolio.types'
import styles from './Footer.module.css'

interface FooterProps {
  name: string
  links: SocialLink[]
}

export const Footer = ({ name, links }: FooterProps) => (
  <footer className={styles.footer}>
    <Container>
      <p>{name} | Building practical software for people and systems.</p>
      <div className={styles.links}>
        {links.map((link) => (
          <a key={link.label} href={link.href} target='_blank' rel='noopener noreferrer' aria-label={link.label} title={link.label}>
            <span className={styles.icon} aria-hidden='true'>
              {link.label === 'GitHub' && (
                <svg viewBox='0 0 24 24' focusable='false'>
                  <path d='M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.9 1.7 2.9 2.4.9.6 2.3.5 2.8.3.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 9 9.8a3.6 3.6 0 0 1 .1-2.7s.9-.3 2.9 1.1a10 10 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.4.9.4 1.8.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.8 5 .4.3.7 1 .7 2.1V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z' />
                </svg>
              )}
              {link.label === 'LinkedIn' && (
                <svg viewBox='0 0 24 24' focusable='false'>
                  <path d='M6.9 8.4a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8zM5.2 9.8h3.4V20H5.2V9.8zm5.2 0h3.2v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20h-3.4v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V20h-3.4V9.8z' />
                </svg>
              )}
              {link.label === 'Facebook' && (
                <svg viewBox='0 0 24 24' focusable='false'>
                  <path d='M13.6 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.6 1.6-1.6h1.7V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8.4V14h2.3v8h2.9z' />
                </svg>
              )}
              {link.label !== 'GitHub' && link.label !== 'LinkedIn' && link.label !== 'Facebook' && (
                <svg viewBox='0 0 24 24' focusable='false'>
                  <circle cx='12' cy='12' r='5' />
                </svg>
              )}
            </span>
          </a>
        ))}
      </div>
      <small>&copy; {new Date().getFullYear()} {name}</small>
    </Container>
  </footer>
)
