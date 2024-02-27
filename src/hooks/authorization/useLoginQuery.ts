import { useQuery } from '@tanstack/react-query'
import { fetchLogin } from '../../services/api'

export const useLoginQuery = ({ login, password }: { login: string | number; password: string | number }) =>
  useQuery({ queryFn: () => fetchLogin({ login, password }), queryKey: ['authorization', 'login'] })
