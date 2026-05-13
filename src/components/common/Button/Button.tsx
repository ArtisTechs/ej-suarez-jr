import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => (
  <button className={`${styles.button} ${styles[variant]} ${className}`.trim()} {...props} />
)
