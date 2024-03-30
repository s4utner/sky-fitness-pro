import { Header, Button, ProgressBar, UpdateProgressModal, SuccessProgressModal, LoaderSpinner } from 'components'
import { useWorkoutQuery, useUserStateQuery, useCourseQuery, useUpdateUserProgress } from 'hooks'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createValidVideoUrl } from 'helpers/helpers'
import styles from 'pages/workoutPage/workoutPage.module.scss'

export const WorkoutPage = () => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const { id = '', course = '' } = useParams()
  const navigate = useNavigate()

  const { data: userState, isLoading: isUserStateLoading } = useUserStateQuery()
  const { data: courseFromBD, isLoading: isCourseFromBDLoading } = useCourseQuery(course)
  const { data: workout, isLoading: isWorkoutLoading, isSuccess } = useWorkoutQuery(id)

  const progressArrayForQuery: [boolean, ...number[]] = [true]
  const { mutate: updateUserProgress, isSuccess: isSuccessUpdateUserProgress } = useUpdateUserProgress({
    course: course,
    workoutId: workout?._id as string,
    progressArray: progressArrayForQuery,
  })

  if (isUserStateLoading || isCourseFromBDLoading || isWorkoutLoading) {
    return <LoaderSpinner />
  }

  const courseName = courseFromBD?.nameRU
  const workouts = courseFromBD?.workouts
  const indexOfCurrentWorkout = workouts?.indexOf(id)
  const previousWorkout = workouts?.[(indexOfCurrentWorkout as number) - 1]
  const nextWorkout = workouts?.[(indexOfCurrentWorkout as number) + 1]
  const workoutNumber = (courseFromBD?.workouts.indexOf(id) as number) + 1
  const progressArray: [boolean, ...number[]] = userState ? userState.progress[course][id] : [false, 0]
  const [, ...currentProgress] = progressArray
  const isDone = progressArray[0]

  const handleOpenUpdateModal = () => {
    setIsUpdateModalVisible(true)
  }

  const handleOpenSuccessModal = () => {
    setIsSuccessModalVisible(true)
  }

  const handleCloseUpdateModal = () => {
    setIsUpdateModalVisible(false)
  }

  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false)
  }

  const handleButtonActive = () => {
    setIsButtonDisabled(false)
  }

  const handleButtonDisabled = () => {
    setIsButtonDisabled(true)
  }

  return workout ? (
    <div className={isUpdateModalVisible || isSuccessModalVisible ? styles.modalContainer : styles.courseContainer}>
      <div className={styles.content}>
        <Header />
        <nav className={styles.navigation}>
          {previousWorkout && (
            <p
              className={styles.previousWorkoutButton}
              onClick={() => {
                if (previousWorkout) {
                  navigate(`/workouts/${course}/${previousWorkout}`)
                }
              }}
            >
              ← Предыдущая тренировка
            </p>
          )}
          {nextWorkout && (
            <p
              className={styles.nextWorkoutButton}
              onClick={() => {
                if (nextWorkout) {
                  navigate(`/workouts/${course}/${nextWorkout}`)
                }
              }}
            >
              Следующая тренировка →
            </p>
          )}
        </nav>
        <h1 className={styles.title}>{courseName}</h1>
        <p className={styles.heading}>{isSuccess && workout.name}</p>
        <iframe
          className={styles.video}
          src={createValidVideoUrl(isSuccess ? workout.video : '')}
          frameBorder={0}
          width={'100%'}
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
            {!isDone && (
              <Button
                variant={'base'}
                fontSize={18}
                disabled={isButtonDisabled}
                onClick={() => {
                  handleButtonDisabled()

                  if (workout.exercises) {
                    handleOpenUpdateModal()
                  } else {
                    handleOpenSuccessModal()
                    updateUserProgress()
                  }
                }}
              >
                {workout.exercises ? 'Заполнить свой прогресс' : 'Завершить тренировку'}
              </Button>
            )}
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
      {isUpdateModalVisible && (
        <UpdateProgressModal
          courseId={course}
          workout={workout}
          currentProgressArray={progressArray as [boolean, ...number[]]}
          closeModal={handleCloseUpdateModal}
          activateButton={handleButtonActive}
        />
      )}
      {isSuccessUpdateUserProgress && isSuccessModalVisible && (
        <div
          className={styles.successModalBackground}
          onClick={() => {
            handleButtonActive()
            handleCloseSuccessModal()
          }}
        >
          <div className={styles.successModalContainer} onClick={(event) => event.stopPropagation()}>
            <SuccessProgressModal />
          </div>
        </div>
      )}
    </div>
  ) : null
}
