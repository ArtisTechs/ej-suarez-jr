import { useEffect, useMemo, useState } from 'react'
import { NAV_ITEMS } from '../../../utils/constants'
import { getAppUrl } from '../../../utils/routing'
import { Container } from '../../common/Container/Container'
import { ThemeToggle } from '../../common/ThemeToggle/ThemeToggle'
import type { ThemeMode } from '../../../types/portfolio.types'
import styles from './Navbar.module.css'

interface NavbarProps {
  theme: ThemeMode
  onToggleTheme: () => void
  name: string
}

export const Navbar = ({ theme, onToggleTheme, name }: NavbarProps) => {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const sectionIds = useMemo(
    () => NAV_ITEMS.map((item) => item.href.replace('#', '')),
    [],
  )

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (!sections.length) return

    const onScroll = () => {
      const marker = window.scrollY + 120
      let current = sections[0].id

      for (const section of sections) {
        if (marker >= section.offsetTop) {
          current = section.id
        }
      }

      setActiveSection(current)

      if (window.location.hash !== `#${current}`) {
        window.history.replaceState(null, '', `${getAppUrl('/')}#${current}`)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds])

  return (
    <header className={styles.navbar}>
      <Container>
        <nav className={styles.nav} aria-label='Primary'>
          <a href='#home' className={styles.brand}>{name}</a>
          <button
            className={`${styles.menuBtn} ${open ? styles.menuOpen : ''}`}
            type='button'
            onClick={() => setOpen((prev) => !prev)}
            aria-label='Toggle menu'
            aria-expanded={open}
            aria-controls='mobile-nav-links'
          >
            <span />
            <span />
            <span />
          </button>
          <div id='mobile-nav-links' className={`${styles.links} ${open ? styles.open : ''}`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={activeSection === item.href.replace('#', '') ? styles.active : ''}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </nav>
      </Container>
    </header>
  )
}
