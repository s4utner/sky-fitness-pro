import { Routes, Route } from 'react-router-dom'
import { Main } from 'pages/main'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
  </Routes>
)
