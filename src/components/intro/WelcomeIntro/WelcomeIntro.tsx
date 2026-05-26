import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IntroBackground } from './IntroBackground'
import { ScrambleText } from './ScrambleText'
import styles from './WelcomeIntro.module.css'

interface WelcomeIntroProps {
  name: string
  onComplete: () => void
}

const WORD_DURATION = 760
const WORD_GAP = 220
const GROUP_READ_HOLD = 1900
const OUTRO_DURATION = 700

export const WelcomeIntro = ({ name, onComplete }: WelcomeIntroProps) => {
  const [phase, setPhase] = useState<'welcome' | 'name' | 'group' | 'outro'>('welcome')
  const [isOutro, setIsOutro] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const groupCompletedRef = useRef(0)

  const sequence = useMemo(
    () => [
      'WELCOME',
      `I'M ${name.toUpperCase()}`,
      'FULL STACK DEVELOPER',
      'MOBILE & WEB DEVELOPER',
      'BUILDING SCALABLE DIGITAL EXPERIENCES',
    ],
    [name]
  )

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const handleSingleLineComplete = useCallback(() => {
    clearTimer()
    timeoutRef.current = window.setTimeout(() => {
      setPhase((current) => {
        if (current === 'welcome') {
          return 'name'
        }
        if (current === 'name') {
          groupCompletedRef.current = 0
          return 'group'
        }
        return current
      })
    }, WORD_GAP)
  }, [clearTimer])

  const handleGroupLineComplete = useCallback(() => {
    groupCompletedRef.current += 1
    if (groupCompletedRef.current === 3) {
      clearTimer()
      timeoutRef.current = window.setTimeout(() => {
        setIsOutro(true)
        setPhase('outro')
      }, GROUP_READ_HOLD)
    }
  }, [clearTimer])

  useEffect(() => {
    if (!isOutro) {
      return
    }

    clearTimer()
    timeoutRef.current = window.setTimeout(() => {
      onComplete()
    }, OUTRO_DURATION)

    return clearTimer
  }, [isOutro, onComplete, clearTimer])

  useEffect(
    () => () => {
      clearTimer()
    },
    [clearTimer]
  )

  return (
    <motion.section
      className={styles.intro}
      initial={{ opacity: 1 }}
      animate={{ opacity: isOutro ? 0 : 1 }}
      transition={{ duration: OUTRO_DURATION / 1000, ease: 'easeInOut' }}
    >
      <IntroBackground />

      <div className={styles.centerWrap}>
        <AnimatePresence mode='wait'>
          {phase === 'welcome' && (
            <motion.p
              key='welcome'
              className={`${styles.word} ${styles.wordPrimary}`}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(5px)' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ScrambleText text={sequence[0]} duration={WORD_DURATION} delay={90} onComplete={handleSingleLineComplete} />
            </motion.p>
          )}

          {phase === 'name' && (
            <motion.p
              key='name'
              className={`${styles.word} ${styles.wordSecondary}`}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(5px)' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ScrambleText text={sequence[1]} duration={WORD_DURATION} delay={90} onComplete={handleSingleLineComplete} />
            </motion.p>
          )}

          {phase === 'group' && (
            <motion.div
              key='group'
              className={styles.wordsGroup}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(5px)' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {[sequence[2], sequence[3], sequence[4]].map((line, index) => (
                <p key={line} className={`${styles.word} ${styles.wordSecondary}`}>
                  <ScrambleText text={line} duration={WORD_DURATION} delay={90 + index * 120} onComplete={handleGroupLineComplete} />
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
