import styles from './AuthPage.module.scss'
import { Input, Logo, Button } from 'components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from 'store/AuthStore'
import { createNewUser, loginUser } from 'services/api'

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
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const validateEmail = (login: string): boolean => {
    const emailRegex = /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/
    return login.length >= 6 && login.length <= 64 && emailRegex.test(login)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const loginStr = String(login)
    const passwordStr = String(password)
    if (validateEmail(loginStr) && loginStr.length >= 6 && passwordStr.length >= 6 && password === repeatPassword) {
      setErrorMessage('Вы в системе')
    } else {
      setErrorMessage('Неправильный email')
    }
  }
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
      default: {
        try {
          handleSubmit
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
      default: {
        try {
          handleSubmit
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
    <form onSubmit={handleSubmit} className={styles.wrapper}>
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
