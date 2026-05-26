import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const normalizeInitialPath = () => {
  const { pathname, search, hash } = window.location

  const supportedPaths = ['/', '/resume']

  if (!supportedPaths.includes(pathname)) {
    window.history.replaceState(null, '', `/${search}${hash}`)
  }
}

normalizeInitialPath()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
