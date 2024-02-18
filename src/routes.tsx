import { Routes, Route } from 'react-router-dom'
import { Main } from 'pages'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
  </Routes>
)
