import type { FC, PropsWithChildren } from 'react'
import styles from './FitnessCard.module.scss'
import { Button } from 'components'

interface FitnessCardProps {
  variant?: 'main' | 'myProfile'
  image?: string
  hasButton?: boolean
  buttonOnClick?: () => void
}

export const FitnessCard: FC<PropsWithChildren & FitnessCardProps> = ({
  children,
  image,
  hasButton = false,
  variant = 'main',
  buttonOnClick,
}) => (
  <div style={{ background: `url(${image})` }} className={`${styles.card} ${variant === 'myProfile' && styles.myProfile}`}>
    {children}

    {/* Здесь можно было бы использовать проверку variant === 'myProfile', но пока оставлю так
    возможно где-то придется разграничивать логику наличия кнопки и варианта отображения */}
    
    {hasButton && (
      <Button variant="green" width={150} onClick={buttonOnClick}>
        Перейти →
      </Button>
    )}
  </div>
)
