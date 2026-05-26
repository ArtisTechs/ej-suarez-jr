import { useEffect, useRef, useState } from 'react'

interface ScrambleTextProps {
  text: string
  duration: number
  delay?: number
  onComplete?: () => void
}

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*_+-=<>?/|'

const randomChar = () => RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]

export const ScrambleText = ({ text, duration, delay = 0, onComplete }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text)
  const frameRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const completeCalledRef = useRef(false)

  useEffect(() => {
    const source = text.toUpperCase()
    setDisplayText(source)
    completeCalledRef.current = false

    const startedAt = performance.now() + delay

    const run = (now: number) => {
      if (now < startedAt) {
        frameRef.current = requestAnimationFrame(run)
        return
      }

      const progress = Math.min((now - startedAt) / Math.max(duration, 1), 1)
      const revealCount = Math.floor(progress * source.length)
      const scrambled = source
        .split('')
        .map((char, index) => {
          if (char === ' ') {
            return ' '
          }
          if (index < revealCount) {
            return char
          }
          return randomChar()
        })
        .join('')

      setDisplayText(scrambled)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(run)
        return
      }

      setDisplayText(source)
      if (!completeCalledRef.current) {
        completeCalledRef.current = true
        onComplete?.()
      }
    }

    timeoutRef.current = window.setTimeout(() => {
      frameRef.current = requestAnimationFrame(run)
    }, 0)

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [text, duration, delay, onComplete])

  return <span>{displayText}</span>
}
