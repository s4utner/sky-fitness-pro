import { Header, Button, ProgressBar, ProgressModal } from 'components'
import { useWorkoutQuery } from 'hooks'
import { useState } from 'react'
// import { useParams } from 'react-router-dom'
import { createValidVideoUrl } from 'helpers/helpers'
import styles from './WorkoutPage.module.scss'

export const WorkoutPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const { id } = useParams()
  const id = '3yvozj'

  const { data, isSuccess } = useWorkoutQuery(id)

  if (!data) {
    return
  }

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  return (
    <div className={isModalVisible ? styles.modalContainer : styles.courseContainer}>
      <div className={styles.content}>
        <Header />
        <h1 className={styles.title}>Йога</h1>
        <p className={styles.heading}>{isSuccess && data.name}</p>
        <iframe
          className={styles.video}
          src={createValidVideoUrl(isSuccess ? data.video : '')}
          frameBorder={0}
          allowFullScreen
        />
        <div className={styles.description}>
          <div className={styles.tasks}>
            <p className={styles.heading}>Упражнения</p>
            <ul className={styles.tasksList}>
              {isSuccess &&
                data.exercises.map((exercise) => (
                  <li key={data._id} className={styles.tasksListItem}>
                    {exercise.name}
                  </li>
                ))}
            </ul>
            <Button variant="base" fontSize={18} onClick={handleOpenModal}>
              Заполнить свой прогресс
            </Button>
          </div>
          <div className={styles.progress}>
            <p className={styles.heading}>Мой прогресс по тренировке 2:</p>
            <div className={styles.progressItems}>
              {isSuccess &&
                data.exercises.map((exercise) => (
                  <div key={data._id} className={styles.progressItem}>
                    <p className={styles.progressItemText}>{exercise.name.split(' (')[0]}</p>
                    <ProgressBar currentValue={0} maxValue={exercise.quantity} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && <ProgressModal closeModal={handleCloseModal} />}
    </div>
  )
}
