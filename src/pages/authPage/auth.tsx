import styles from './Auth.module.scss'
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

  const handleIsLoginMode = () => {
    setIsLoginMode(false)
  }

  const toggleShow = useStore((state) => state.toggleShow)

  // Функция входа пользователя
  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    switch (true) {
      case !login && !password: {
        setErrorMessage('логин и пароль должны быть заполнены')
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
        navigate('/profile', { replace: true })
        toggleShow()
      }
    }
  }

  // Функция регистрации пользователя

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
            {errorMessage ? <div>{errorMessage}</div> : null}
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
            <Button fontSize={18}>Войти</Button>
          </>
        )}
      </div>
    </div>
  )
}
