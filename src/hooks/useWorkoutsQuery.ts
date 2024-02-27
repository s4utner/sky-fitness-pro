import { useQuery } from '@tanstack/react-query'
import { getAllWorkouts } from '../services/api'

export const useWorkoutsQuery = () => useQuery({ queryFn: () => getAllWorkouts(), queryKey: ['workouts', 'all'] })
