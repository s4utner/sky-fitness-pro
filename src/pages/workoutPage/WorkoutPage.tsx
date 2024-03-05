import { Header, Button, ProgressBar, UpdateProgressModal } from 'components'
import { useWorkoutQuery, useUserStateQuery, useCourseQuery, useUpdateUserProgress } from 'hooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createValidVideoUrl } from 'helpers/helpers'
import styles from './WorkoutPage.module.scss'

export const WorkoutPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { id = '', course = '' } = useParams()

  const { data: userState } = useUserStateQuery()
  const { data: courseFromBD } = useCourseQuery(course)
  const { data: workout, isSuccess } = useWorkoutQuery(id)

  const progressArrayForQuary: [boolean] = [true]
  const { mutate: updateUserProgress, isSuccess: isSuccessUpdateUserProgress } = useUpdateUserProgress({
    course: courseFromBD?._id as string,
    workoutId: workout?._id as string,
    progressArray: progressArrayForQuary,
  })

  console.log(isSuccessUpdateUserProgress)

  const courseName = courseFromBD?.nameRU
  const workoutNumber = (courseFromBD?.workouts.indexOf(id) as number) + 1
  const progressArray: [boolean, ...number[]] = userState ? userState.progress[course][id] : [false, 0]
  const [, ...currentProgress] = progressArray

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  return workout ? (
    <div className={isModalVisible ? styles.modalContainer : styles.courseContainer}>
      <div className={styles.content}>
        <Header />
        <h1 className={styles.title}>{courseName}</h1>
        <p className={styles.heading}>{isSuccess && workout.name}</p>
        <iframe
          className={styles.video}
          src={createValidVideoUrl(isSuccess ? workout.video : '')}
          frameBorder={0}
          allowFullScreen
        />
        <div className={styles.description}>
          <div className={styles.tasks}>
            {workout.exercises && (
              <>
                <p className={styles.heading}>Упражнения</p>
                <ul className={styles.tasksList}>
                  {isSuccess &&
                    workout.exercises &&
                    workout.exercises.map((exercise) => (
                      <li key={workout._id + exercise.name} className={styles.tasksListItem}>
                        {exercise.name}
                      </li>
                    ))}
                </ul>
              </>
            )}
            <Button
              variant={'base'}
              fontSize={18}
              onClick={() => {
                if (workout.exercises) {
                  handleOpenModal()
                } else {
                  updateUserProgress()
                }
              }}
            >
              {workout.exercises ? 'Заполнить свой прогресс' : 'Завершить тренировку'}
            </Button>
          </div>
          {workout.exercises && (
            <div className={styles.progress}>
              <p className={styles.heading}>Мой прогресс по тренировке {workoutNumber}:</p>
              <div className={styles.progressItems}>
                {isSuccess &&
                  workout.exercises.map((exercise, index) => (
                    <div key={workout._id + exercise.name} className={styles.progressItem}>
                      <p className={styles.progressItemText}>{exercise.name.split(' (')[0]}</p>
                      <ProgressBar currentValue={currentProgress[index] as number} maxValue={exercise.quantity} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalVisible && (
        <UpdateProgressModal
          courseId={course}
          workout={workout}
          currentProgressArray={progressArray as [boolean, ...number[]]}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  ) : null
}
