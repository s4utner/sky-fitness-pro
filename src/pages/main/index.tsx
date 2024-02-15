import { Title } from 'components/UI/Title/Title.tsx'
import { Button } from 'components/UI/Button/Button.tsx'

const handleclick = () => console.log('Hello')

export const Main = () => (
  <div>
    <Title color="red">Заголовок</Title>
    <Button title="dasdas" disabled={false} onClick={handleclick} />
  </div>
)
