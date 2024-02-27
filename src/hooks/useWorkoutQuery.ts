import { useQuery } from '@tanstack/react-query'
import { getWorkoutById } from '../services/api'

export const useWorkoutQuery = (id: string) => useQuery({ queryFn: () => getWorkoutById(id), queryKey: ['workouts'] })
