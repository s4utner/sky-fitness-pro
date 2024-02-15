import styles from './Button.module.scss'
import type { FC, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: string
  square?: boolean
  disabled?: boolean
  title?: string
  onClick: () => void
}

export const ButtonUI: FC<ButtonProps> = ({ title, disabled = false, onClick }) => (
  <button disabled={disabled} type="button" className={styles.btn} onClick={onClick}>
    {title}
  </button>
)
