import type { FC, PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const Providers: FC<PropsWithChildren> = ({ children }) => <BrowserRouter>{children}</BrowserRouter>
