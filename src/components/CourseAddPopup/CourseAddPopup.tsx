import { Button, Logo } from 'components'
import type { FC, MouseEvent, PropsWithChildren } from 'react'
import style from 'components/CourseAddPopup/CourseAddPopup.module.scss'

interface CourseAddPopupProps {
  variant?: 'delete' | 'add' | null
  course: string[]
  closeFunc?: () => void
  agreeFunc?: () => void
}

export const CourseAddPopup: FC<PropsWithChildren & CourseAddPopupProps> = ({
  variant = 'add',
  closeFunc = () => {},
  course,
  agreeFunc = () => {},
}) =>
  variant ? (
    <div className={style.box} onClick={closeFunc}>
      <div onClick={(e: MouseEvent) => e.stopPropagation()} className={style.content}>
        <Logo />

        <p className={style.text}>
          {variant === 'add'
            ? `Добавить курс ${course[1]} в ваш профиль?`
            : `Внимание! После удаления курса ${course[1]} весь прогресс по нему будет безвозвратно утерян. Вы действительно желаете удалить курс из вашего профиля?`}
        </p>

        <div className={style.buttons}>
          <Button
            onClick={() => {
              agreeFunc()
              closeFunc()
            }}
            width={100}
            fontSize={18}
          >
            Да
          </Button>
          <Button onClick={closeFunc} width={100} variant="red" fontSize={18}>
            Нет
          </Button>
        </div>
      </div>
    </div>
  ) : null
