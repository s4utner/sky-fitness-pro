import { Routes, Route } from 'react-router-dom'
import { Main } from 'pages'
import { AuthPage } from 'pages/authPage/auth'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/auth" element={<AuthPage />} />
  </Routes>
)
