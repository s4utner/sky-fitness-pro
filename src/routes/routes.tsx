import { Routes, Route } from 'react-router-dom'
import { CoursePage } from 'pages/coursePage/coursePage.tsx'
import { Main, AuthPage, ProfilePage, Course } from 'pages'
import { ProtectedRoute } from 'routes/protected-route'
import { useStore } from 'pages/authPage/AuthStore'

export function AppRoutes() {
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  console.log(isAuthenticated)
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={Boolean(isAuthenticated)} />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/courses/:name" element={<CoursePage />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  )
}
