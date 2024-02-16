import styles from './Input.module.scss'
import type { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholderText: string
}

export const Input: FC<InputProps> = ({ placeholderText }) => {
  return <input className={styles.input} type="text" placeholder={placeholderText} />
}
