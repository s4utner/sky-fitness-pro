import styles from './Button.module.scss'
import type { FC, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'base' | 'green' | 'transparent'
  width?: number
}

export const Button: FC<ButtonProps> = ({ children, variant = 'base', width = 275, ...otherProps }) => {
  const currentVariantClass: string = styles[variant]

  return (
    <button
      style={{ width: `${width}px` }}
      type="button"
      className={`${styles.btn} ${currentVariantClass}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}
