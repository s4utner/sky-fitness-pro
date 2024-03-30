import { Button, Logo, Input, LoaderSpinner } from 'components'
import { useEffect, useState } from 'react'
import { useStore } from 'store/AuthStore'
import { updateLogin, updateUserPassword } from 'services/api'
import type { FC, MouseEvent, PropsWithChildren } from 'react'
import style from './ProfileEdit.module.scss'
import { validateEmail, validatePassword } from 'helpers/helpersFunction'

interface ProfileEditProps {
  variant?: 'login' | 'password' | null
  closeFunc: () => void
}

export const ProfileEdit: FC<PropsWithChildren & ProfileEditProps> = ({ variant = 'login', closeFunc }) => {
  const [loginValue, setLoginValue] = useState<string | number>('')
  const [passValue, setPassValue] = useState<string | number>('')
  const [repeatValue, setRepeatValue] = useState<string | number>('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const user = useStore((store) => store.user)
  const setUser = useStore((store) => store.setUser)
  const closeFunction = () => {
    setLoginValue('')
    setPassValue('')
    setRepeatValue('')
    closeFunc()
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const saveButtonHandler = async () => {
    if (variant === 'login') {
      if (!loginValue) {
        setErrorMessage('Введите новый логин')
        return
      }

      if (!validateEmail(loginValue as string)) {
        setErrorMessage('Введите корректный e-mail')
        return
      }

      setIsLoading(true)
      try {
        await updateLogin({ email: String(loginValue) })
        if (user) setUser({ ...user, email: String(loginValue) })
      } catch (error) {
        console.warn(error)
      }
      setIsLoading(false)

      closeFunction()
    }

    if (variant === 'password') {
      if (!passValue) {
        setErrorMessage('Введите новый пароль')
        return
      }

      if (!validatePassword(passValue as string)) {
        setErrorMessage('Длина пароля должна быть не меннее 6 и не более 64 символов')
        return
      }

      if (!repeatValue) {
        setErrorMessage('Повторите пароль')
        return
      }

      if (passValue !== repeatValue) {
        setErrorMessage('Пароли не совпадают')
        return
      }
      setIsLoading(true)
      try {
        await updateUserPassword({ password: String(passValue) })
        if (user) setUser({ ...user, password: String(passValue) })
      } catch (error) {
        console.warn(error)
      }
      setIsLoading(false)

      closeFunction()
    }
  }

  useEffect(() => {
    setErrorMessage('')
  }, [loginValue, passValue, repeatValue])

  if (variant === null) return

  return (
    <div className={style.box} onClick={closeFunction}>
      {isLoading && <LoaderSpinner />}
      {errorMessage && <div className={style.error}>{errorMessage}</div>}
      <div onClick={(e: MouseEvent) => e.stopPropagation()} className={style.content}>
        <Logo />

        <div className={style.inputs}>
          {variant === 'login' ? (
            <label className={style.text}>
              Новый логин:
              <Input
                inputType="text"
                value={loginValue}
                placeholderText="Логин"
                onValueChange={(loginValue) => setLoginValue(loginValue)}
              />
            </label>
          ) : (
            <>
              <label className={style.text}>
                Новый пароль:
                <Input
                  inputType="text"
                  value={passValue}
                  placeholderText="Пароль"
                  onValueChange={(passValue) => setPassValue(passValue)}
                />
              </label>

              <label>
                <Input
                  inputType="text"
                  value={repeatValue}
                  placeholderText="Повторите пароль"
                  onValueChange={(repeatValue) => setRepeatValue(repeatValue)}
                />
              </label>
            </>
          )}
        </div>

        <Button onClick={saveButtonHandler} fontSize={18}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
