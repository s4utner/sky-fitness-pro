import styles from './AuthPage.module.scss'
import { Input, Logo, Button } from 'components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from 'store/AuthStore'
import { createNewUser, loginUser } from 'services/api'
import { validatePassword } from 'helpers/helpersFunction'
import { validateEmail } from 'helpers//helpersFunction'

export function AuthPage() {
  // юзер: JohnDow@mail.mail пароль: asdfasdf
  const [login, setLogin] = useState<string | number>('JohnDow@mail.mail')
  const [password, setPassword] = useState<string | number>('asdfasdf')
  const [repeatPassword, setRepeatPassword] = useState<string | number>('')
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const navigate = useNavigate()

  interface login {
    value: string | number
    placeholder: string
  }

  const setUser = useStore((state) => state.setUser)

  // Переклчение между логином и регистрацией и сбрасывание ошибки
  const handleIsLoginMode = () => {
    setIsLoginMode(false)
  }

  // функция отправки ошибки
  const handleErrorMessage = (message: string) => {
    setErrorMessage(message)
  }

  //Валидация регуярными выражениями

  // Функция входа пользователя и валидация
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    switch (true) {
      case !login && !password: {
        handleErrorMessage('Все поля должны быть заполнены')
        return
      }
      case !login: {
        handleErrorMessage('Введите логин')
        return
      }
      case !password: {
        handleErrorMessage('Введите пароль')
        return
      }
      case !validateEmail(String(login)): {
        handleErrorMessage('Введите корректный email')
        return
      }
      case !validatePassword(String(password)): {
        handleErrorMessage('Пароль должен содержать от 6 до 64 символов')
        return
      }
      default: {
        try {
          const response = await loginUser({ email: String(login), password: String(password) })
          console.log(response, 'Это ответ на логин')

          setUser(response)
          navigate('/profile')
          return response
        } catch (error) {
          if (error instanceof Error) setErrorMessage(error.message)
        }
      }
    }
  }

  // Функция регистрации пользователя и валидация
  const handleRegistration = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    switch (true) {
      case !login && !password: {
        handleErrorMessage('Все поля должны быть заполнены')
        break
      }
      case !login: {
        handleErrorMessage('Введите логин')
        break
      }
      case !password: {
        handleErrorMessage('Введите пароль')
        break
      }
      case password !== repeatPassword: {
        handleErrorMessage('пароли должны совпадать!')
        break
      }
      case !validateEmail(String(login)): {
        handleErrorMessage('Введите корректный email')
        return
      }
      case !validatePassword(String(password)): {
        handleErrorMessage('Пароль должен содержать от 6 до 64 символов')
        return
      }
      default: {
        try {
          const response = await createNewUser({ email: String(login), password: String(password) })
          console.log(response, 'Это ответ на логин')

          setUser(response)
          navigate('/profile')
          return response
        } catch (error) {
          if (error instanceof Error) setErrorMessage(error.message)
        }
      }
    }
  }
  // Сбрасывает ошибку при вводе в инпут и при переключении на регистрацию
  useEffect(() => {
    setErrorMessage('')
  }, [login, password, repeatPassword, isLoginMode])

  return (
    <form className={styles.wrapper}>
      <div className={styles.AuthForm}>
        <Logo />
        {isLoginMode ? (
          <>
            <div className={styles.inputs}>
              <Input
                inputType={'text'}
                value={login}
                placeholderText={'Логин'}
                onValueChange={(login) => {
                  setLogin(login)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(password) => {
                  setPassword(password)
                }}
              />
            </div>

            <div className={styles.buttonBlock}>
              <Button fontSize={18} onClick={handleLogin}>
                Войти
              </Button>
              <Button fontSize={18} onClick={handleIsLoginMode} variant="transparent">
                Зарегистрироваться
              </Button>
            </div>
            {errorMessage && <div className={styles.errorInput}>{errorMessage}</div>}
          </>
        ) : (
          <>
            <div className={styles.inputs}>
              <Input
                inputType={'text'}
                value={login}
                placeholderText={'Логин'}
                onValueChange={(login) => {
                  setLogin(login)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(password) => {
                  setPassword(password)
                }}
              />
              <Input
                inputType={'password'}
                value={repeatPassword}
                placeholderText={'Повторите пароль'}
                onValueChange={(repeatPassword) => {
                  setRepeatPassword(repeatPassword)
                }}
              />
            </div>
            <div className={styles.buttonBlock}>
              <Button fontSize={18} onClick={handleRegistration}>
                Зарегистрироваться
              </Button>
            </div>
            {errorMessage && <div className={styles.errorInput}>{errorMessage}</div>}
          </>
        )}
      </div>
    </form>
  )
}
