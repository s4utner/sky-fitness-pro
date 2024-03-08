import { Button, Input } from 'components'
import { useState } from 'react'
import image from 'assets/images/applicationImage.png'
import style from './Application.module.scss'

export const Application = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState<string | number>('')
  const [phone, setPhone] = useState<string | number>('')
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsModalOpen(false)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`${name}\n${phone}`)
    handleCloseModal()
  }
  const handleChangeName = (value: string | number) => {
    setName(value)
  }
  const handleChangePhone = (value: string | number) => {
    setPhone(value)
  }
  return (
    <>
      <div className={style.container}>
        <p className={style.text}>
          Оставьте заявку на пробное занятие, мы свяжемся с вами,
          <br /> поможем с выбором направления и тренер, <br /> с которым тренировки принесут здоровье и радость!
        </p>
        <Button width={275} fontSize={18} onClick={handleOpenModal}>
          Записаться на тренировку
        </Button>
        <img className={style.image} src={image} alt="application" />
      </div>
      {isModalOpen ? (
        <>
          <div className={style.overlay} onClick={handleCloseModal} />
          <div className={style.modal}>
            <form className={style.form} onSubmit={handleSubmit}>
              <Input inputType="text" placeholderText="Ваше Имя" value={name} onValueChange={handleChangeName} />
              <Input inputType="tel" placeholderText="Ваш телефон" value={phone} onValueChange={handleChangePhone} />
              <Button type="submit">Отправить</Button>
            </form>
          </div>
        </>
      ) : null}
    </>
  )
}