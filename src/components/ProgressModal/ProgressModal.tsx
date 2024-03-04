import { FC } from 'react'
import { Input, Button } from 'components'
import { useState } from 'react'
import { IWorkout } from 'types'
import sticker from './img/sticker.png'
import styles from './ProgressModal.module.scss'

interface ProgressModalProps {
  workout: IWorkout
  closeModal: () => void
}

export const ProgressModal: FC<ProgressModalProps> = ({ workout, closeModal }) => {
  const [progressValue, setProgressValue] = useState<string | number>('')

  const [isResponseFinished, setIsResponseFinished] = useState<boolean>(false)

  const handleSetIsResponseFinished = () => {
    setIsResponseFinished(true)
  }

  return (
    <div className={styles.background} onClick={closeModal}>
      <div className={styles.container} onClick={(event) => event.stopPropagation()}>
        {isResponseFinished ? (
          <div className={styles.finishedModal}>
            <p className={styles.finishedModalText}>
              Ваш прогресс <br /> засчитан!
            </p>
            <img className={styles.finishedModalSticker} src={sticker} />
          </div>
        ) : (
          <>
            <p className={styles.title}>Мой прогресс</p>
            <div className={styles.responseBlockContainer}>
              {workout.exercises.map((exercise) => (
                <div key={workout._id} className={styles.responseBlock}>
                  <p className={styles.responseBlockText}>
                    Сколько раз вы сделали {exercise.name.toLowerCase().split(' (')[0]}
                  </p>
                  <Input
                    inputType="number"
                    value={progressValue}
                    onValueChange={(event) => setProgressValue(event)}
                    placeholderText="Введите значение"
                  />
                </div>
              ))}
            </div>
            <Button fontSize={18} variant="base" children="Отправить" onClick={handleSetIsResponseFinished} />
          </>
        )}
      </div>
    </div>
  )
}
