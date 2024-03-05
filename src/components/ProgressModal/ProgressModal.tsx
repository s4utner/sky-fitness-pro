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
  // Массив с текущим пользовательским прогрессом
  currentProgressArray: [boolean, ...number[]] | boolean[]
  closeModal: () => void
}

export const ProgressModal: FC<ProgressModalProps> = ({ courseId, workout, currentProgressArray, closeModal }) => {
  const [progressValue, setProgressValue] = useState<{ value: number | string }[]>(
    workout.exercises.map(() => ({ value: '' })),
  )

  function updateUserProgress() {
    // Шаг 2
    // По логике новый массив должен создаваться здесь, но в таком случае его не передать в хук useUpdateUserProgress

    // Может быть новый массив должен обновляться в useEffect после обновления значений progressValue, но так его в хук useUpdateUserProgress тоже не передать
    mutate()
  }

  const { mutate, isError, isSuccess } = useUpdateUserProgress({
    course: courseId,
    workoutId: workout._id,
    // Шаг 1
    // Нужно передать массив типа [boolean, number[]]
    // Для этого выше нужно создать массив, который будет принимать в себя сумму значений массивов progressValue и defaultProgressArray
    // Также созданный массив должен менять булевое значение false на true при достижении максимального прогресса в каждом упражнении тренировки
    progressArray: progressValue,
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
                      setProgressValue(progressValue.map((el, i) => (i === index ? { value: inputValue } : el)))
                      console.log(progressValue)
                    }}
                    placeholderText={'Введите значение'}
                  />
                </div>
              ))}
            </div>
            <Button fontSize={18} variant={'base'} children={'Отправить'} onClick={updateUserProgress} />
          </>
        )}
      </div>
    </div>
  )
}
