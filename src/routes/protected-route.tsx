import { Navigate, Outlet } from 'react-router-dom'
import type { FC } from 'react'

export const ProtectedRoute: FC<{ redirectPath?: string; isAuthenticated: boolean }> = ({
  redirectPath = '/',
  isAuthenticated,
}) => isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />
