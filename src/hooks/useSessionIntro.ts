import { useState } from 'react'

export const useSessionIntro = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  const completeIntro = () => {
    setIsIntroComplete(true)
  }

  return { isIntroComplete, completeIntro }
}
