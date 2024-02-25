import styles from './AuthPage.module.scss'
import { Input } from 'components/UI/Input/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from 'components/UI/Button/Button'
import { Logo } from 'components/UI/Logo/Logo'
import { useStore } from 'pages/authPage/AuthStore'

export function AuthPage() {
  const [login, setLogin] = useState<string | number>('')
  const [password, setPassword] = useState<string | number>('')
  const [repeatPassword, setRepeatPassword] = useState<string | number>('')
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  // Переклчение между логином и регистрацией и сбрасывание ошибки
  const handleIsLoginMode = () => {
    setIsLoginMode(false)
    setErrorMessage('')
  }
  // Данные из Zustand
  const toggleShow = useStore((state) => state.toggleShow)

  // Функция входа пользователя и валидация
  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    switch (true) {
      case !login && !password: {
        setErrorMessage('Все поля должны быть заполнены')
        return
      }
      case !login: {
        setErrorMessage('Введите логин')
        return
      }
      case !password: {
        setErrorMessage('Введите пароль')
        return
      }
      default: {
        localStorage.setItem('login', JSON.stringify(login))
        localStorage.setItem('password', JSON.stringify(password))
        toggleShow()
        navigate('/profile', { replace: false })
      }
    }
  }

  // Функция регистрации пользователя и валидация
  const handleRegistration = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    switch (true) {
      case !login && !password: {
        setErrorMessage('Все поля должны быть заполнены')
        break
      }
      case !login: {
        setErrorMessage('Введите логин')
        break
      }
      case !password: {
        setErrorMessage('Введите пароль')
        break
      }
      case password !== repeatPassword: {
        setErrorMessage('пароли должны совпадать!')
        break
      }
      default: {
        localStorage.setItem('login', JSON.stringify(login))
        localStorage.setItem('password', JSON.stringify(password))
        toggleShow()
        navigate('/profile', { replace: false })
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.AuthForm}>
        <Link to="/">
          <Logo />
        </Link>
        {isLoginMode ? (
          <>
            <div className={styles.inputs}>
              <Input
                inputType={'text'}
                value={login}
                placeholderText={'Логин'}
                onValueChange={(login: string | number) => {
                  setLogin(login)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(password: string | number) => {
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
            {errorMessage ? <div className={styles.errorInput}>{errorMessage}</div> : null}
          </>
        ) : (
          <>
            <div className={styles.inputs}>
              <Input
                inputType={'text'}
                value={login}
                placeholderText={'Логин'}
                onValueChange={(login: string | number) => {
                  setLogin(login)
                  console.log(login)
                }}
              />
              <Input
                inputType={'password'}
                value={password}
                placeholderText={'Пароль'}
                onValueChange={(password: string | number) => {
                  setPassword(password)
                }}
              />
              <Input
                inputType={'password'}
                value={repeatPassword}
                placeholderText={'Повторите пароль'}
                onValueChange={(repeatPassword: string | number) => {
                  setRepeatPassword(repeatPassword)
                }}
              />
            </div>
            <div className={styles.buttonBlock}>
              <Button fontSize={18} onClick={handleRegistration}>
                Войти
              </Button>
            </div>
            {errorMessage ? <div className={styles.errorInput}>{errorMessage}</div> : null}
          </>
        )}
      </div>
    </div>
  )
}
