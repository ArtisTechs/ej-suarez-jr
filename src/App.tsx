import { AnimatePresence } from 'framer-motion'
import { GreetingIntro } from './components/intro/GreetingIntro/GreetingIntro'
import { useSessionIntro } from './hooks/useSessionIntro'
import { useTheme } from './hooks/useTheme'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { portfolioMock } from './data/portfolio.mock'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { isIntroComplete, completeIntro } = useSessionIntro()

  return (
    <AnimatePresence mode='wait'>
      {!isIntroComplete ? (
        <GreetingIntro key='intro' name={portfolioMock.profile.name} onComplete={completeIntro} />
      ) : (
        <LandingPage key='landing' theme={theme} onToggleTheme={toggleTheme} />
      )}
    </AnimatePresence>
  )
}

export default App
