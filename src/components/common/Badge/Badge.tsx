import type { PropsWithChildren } from 'react'
import styles from './Badge.module.css'

export const Badge = ({ children }: PropsWithChildren) => <span className={styles.badge}>{children}</span>
