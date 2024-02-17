import type { FC } from 'react'
import styles from './Input.module.scss'

interface InputProps {
  inputType: string
  value: string | number
  placeholderText: string
}

export const Input: FC<InputProps> = ({ inputType, value, placeholderText }) => {
  return <input className={styles.input} type={inputType} value={value} placeholder={placeholderText} />
}
