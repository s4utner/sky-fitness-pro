import { Title } from 'components/UI/Title/Title.tsx'
import { Button } from 'components/UI/Button/Button.tsx'
import style from './Main.module.scss'

const handleclick = () => console.log('Hello')

export const Main = () => (
  <div className={style.container}>
    <Title color="red">Заголовок</Title>
    <Button variant="green" onClick={handleclick}>
      навание кнопки
    </Button>
  </div>
)
