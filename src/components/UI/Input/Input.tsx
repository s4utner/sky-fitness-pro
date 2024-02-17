import styles from './Input.module.scss'
import type { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholderText: string
  value: string
}

export const Input: FC<InputProps> = ({ placeholderText, value }) => {
  return <input className={styles.input} type="text" placeholder={placeholderText} value={value} />
}
