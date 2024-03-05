import type { FC } from 'react'
import { useState } from 'react'
import { Input, Button } from 'components'
import { useUpdateUserProgress } from 'hooks'
import type { IWorkout } from 'types'
import sticker from './img/sticker.png'
import styles from './UpdateProgressModal.module.scss'

interface UpdateProgressModalProps {
  courseId: string
  workout: IWorkout
  currentProgressArray: [boolean, ...number[]]
  closeModal: () => void
}

export const UpdateProgressModal: FC<UpdateProgressModalProps> = ({
  courseId,
  workout,
  currentProgressArray,
  closeModal,
}) => {
  const [progressValue, setProgressValue] = useState<{ value: number | string }[]>(
    workout.exercises.map(() => ({ value: '' })),
  )

  const requiredProgress = workout.exercises.map((el) => el.quantity)
  const progressValueArray = progressValue.map((el) => Number(el.value))
  const [, ...shortCurrentProgressArray] = currentProgressArray
  const resultProgressArray = progressValueArray.map((el, i) => el + shortCurrentProgressArray[i])
  const diffArray = resultProgressArray.map((el, i) => el - requiredProgress[i])
  const isDone = !diffArray.some((el) => el < 0)

  const progressArrayForQuery: [boolean, ...number[]] = [isDone, ...resultProgressArray]

  const { mutate: updateUserProgress, isSuccess } = useUpdateUserProgress({
    course: courseId,
    workoutId: workout._id,
    progressArray: progressArrayForQuery,
  })

  return (
    <div className={styles.background} onClick={closeModal}>
      <div className={styles.container} onClick={(event) => event.stopPropagation()}>
        {isSuccess ? (
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
                      setProgressValue(progressValue.map((el, i) => (i === index ? { value: Number(inputValue) } : el)))
                      console.log(progressValue)
                    }}
                    placeholderText={'Введите значение'}
                  />
                </div>
              ))}
            </div>
            <Button fontSize={18} variant={'base'} onClick={() => updateUserProgress()}>
              Отправить
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
