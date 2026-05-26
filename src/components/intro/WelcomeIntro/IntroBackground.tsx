import styles from './WelcomeIntro.module.css'

export const IntroBackground = () => (
  <>
    <div className={styles.vignette} />
    <div className={styles.grid} />
    <div className={styles.glowCore} />
    <div className={styles.glowAmbient} />
  </>
)
