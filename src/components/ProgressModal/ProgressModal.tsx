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
  currentProgressArray: [boolean, ...number[]]
  closeModal: () => void
}

export const ProgressModal: FC<ProgressModalProps> = ({ courseId, workout, currentProgressArray, closeModal }) => {
  const [progressValue, setProgressValue] = useState<{ value: number }[]>(workout.exercises.map(() => ({ value: 0 })))
  // Делаю массив из чисел необходимого количества повторений
  const requiredProgress = workout.exercises.map((el) => el.quantity)
  // Делаю массив из чисел из заполненных сейчас значений инпутов
  const progressValueArray = progressValue.map((el) => el.value)
  // Делаю массив чисел из того прогресса, что пришел с сервера, без false в начале
  const [, ...shortCurrentProgressArray] = currentProgressArray
  // Суммирую массивы из того, что было + то, что заполнено в инпутах
  const resultProgressArray = progressValueArray.map((el, i) => el + shortCurrentProgressArray[i])
  // Делаю массив из разницы между выполненным количеством повторений и тем, что необходимо
  const diffArray = resultProgressArray.map((el, i) => el - requiredProgress[i])
// Выясняю есть ли хоть одно невыполненное упражнение (то есть количество требуемых повторений оказалось больше
// чем количество выполненных повторений) Восклицательным знаком инвертирую результат
// Этим я получаю переменную isDone - выполнен ли воркаут
  const isDone = !diffArray.some((el) => el < 0)
// Получаю итоговый массив, который можно отправлять на сервер
  const progressArrayForQuery: [boolean, ...number[]] = [isDone, ...resultProgressArray]
  
  const {
    // в этой строке я получаю функцию mutate и говорю, что теперь она называется updateUserProgress
    mutate: updateUserProgress,
    isError,
    isSuccess,
  } = useUpdateUserProgress({
    course: courseId,
    workoutId: workout._id,
    // Шаг 1
    // Нужно передать массив типа [boolean, number[]]
    // Для этого выше нужно создать массив, который будет принимать в себя сумму значений массивов progressValue и defaultProgressArray
    // Также созданный массив должен менять булевое значение false на true при достижении максимального прогресса в каждом упражнении тренировки
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
                      setProgressValue(
                        progressValue.map((el, i) => (i === index ? { value: inputValue as number } : el)),
                      )
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
