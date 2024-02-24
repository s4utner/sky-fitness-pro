import { Navigate, Outlet } from 'react-router-dom'
import type { FC } from 'react'

export const ProtectedRoute: FC<{ redirectPath?: string; show: boolean }> = ({ redirectPath = '/', show }) => {
  if (!show) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
