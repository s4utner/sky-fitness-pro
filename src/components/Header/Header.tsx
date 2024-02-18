import type { FC, PropsWithChildren } from 'react'
import { Logo, Button } from 'components'
import styles from './Header.module.scss'

interface HeaderProps {
  color?: 'black' | 'white'
}

export const Header: FC<PropsWithChildren & HeaderProps> = ({color = 'black'}) => (
  <header className={styles.header}>
    <Logo color={color} />{' '}
    <Button variant="green" width={120}>
      Войти
    </Button>
  </header>
)
