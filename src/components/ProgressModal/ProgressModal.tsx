import type { FC } from 'react'
import { useState } from 'react'
import { Input, Button } from 'components'
import { useUpdateUserProgress } from 'hooks/useUpdateUserProgress'
import type { IWorkout } from 'types'
import sticker from './img/sticker.png'
import styles from './ProgressModal.module.scss'

interface ProgressModalProps {
  courseId: string
  workout: IWorkout
  closeModal: () => void
}

export const ProgressModal: FC<ProgressModalProps> = ({ courseId, workout, closeModal }) => {
  const [progressValue, setProgressValue] = useState<{ value: number | string }[]>(
    workout.exercises.map(() => ({ value: '' })),
  )
  const [isResponseFinished, setIsResponseFinished] = useState<boolean>(false)

  const {} = useUpdateUserProgress({ course: courseId, workoutId: workout._id, progressArray: progressValue })

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
              {workout.exercises.map((exercise, index) => (
                <div key={'modal' + index} className={styles.responseBlock}>
                  <p className={styles.responseBlockText}>
                    Сколько раз вы сделали {exercise.name.toLowerCase().split(' (')[0]}?
                  </p>
                  <Input
                    inputType={'number'}
                    value={progressValue[index].value}
                    onValueChange={(inputValue) => {
                      setProgressValue(progressValue.map((el, i) => (i === index ? { value: inputValue } : el)))
                      console.log(progressValue)
                    }}
                    placeholderText={'Введите значение'}
                  />
                </div>
              ))}
            </div>
            <Button fontSize={18} variant={'base'} children={'Отправить'} onClick={handleSetIsResponseFinished} />
          </>
        )}
      </div>
    </div>
  )
}
