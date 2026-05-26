import { useEffect, useState } from 'react'
import type { ThemeMode } from '../types/portfolio.types'
import { THEME_STORAGE_KEY } from '../utils/constants'

const getInitialTheme = (): ThemeMode => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') {
    return stored
  }

  return 'dark'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
