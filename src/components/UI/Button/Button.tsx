import styles from './Button.module.scss'
import type { FC, PropsWithChildren } from 'react'

export const Button: FC<PropsWithChildren> = ({ children }) => <button className={styles.button}>{children}</button>
