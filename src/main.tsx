import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getAppPath, getAppUrl } from './utils/routing'

const normalizeInitialPath = () => {
  const { search, hash } = window.location

  const supportedPaths = ['/', '/resume']

  if (!supportedPaths.includes(getAppPath())) {
    window.history.replaceState(null, '', `${getAppUrl('/')}${search}${hash}`)
  }
}

normalizeInitialPath()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
