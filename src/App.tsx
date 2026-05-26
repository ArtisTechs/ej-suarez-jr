import { AnimatePresence } from 'framer-motion'
import { WelcomeIntro } from './components/intro/WelcomeIntro/WelcomeIntro'
import { useSessionIntro } from './hooks/useSessionIntro'
import { useTheme } from './hooks/useTheme'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { ResumePage } from './pages/ResumePage/ResumePage'
import { portfolioMock } from './data/portfolio.mock'
import { getAppPath } from './utils/routing'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { isIntroComplete, completeIntro } = useSessionIntro()
  const isResumePage = getAppPath() === '/resume'

  if (isResumePage) {
    return <ResumePage />
  }

  return (
    <AnimatePresence mode='wait'>
      {!isIntroComplete ? (
        <WelcomeIntro key='intro' name={portfolioMock.profile.name} onComplete={completeIntro} />
      ) : (
        <LandingPage key='landing' theme={theme} onToggleTheme={toggleTheme} />
      )}
    </AnimatePresence>
  )
}

export default App
