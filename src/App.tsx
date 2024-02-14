import { Providers } from 'providers/Providers.tsx'
import { AppRoutes } from 'routes.tsx'
import './App.scss'

export const App = () => (
  <Providers>
    <AppRoutes />
  </Providers>
)
