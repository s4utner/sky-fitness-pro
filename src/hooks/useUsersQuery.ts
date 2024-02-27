import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/api'

export const useUsersQuery = () => useQuery({ queryFn: () => getAllUsers(), queryKey: ['users', 'all'] })
