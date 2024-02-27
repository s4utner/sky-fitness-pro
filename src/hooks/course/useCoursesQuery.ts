import { useQuery } from '@tanstack/react-query'
import { getAllCourses } from '../../services/api'

export const useCoursesQuery = () => useQuery({ queryFn: () => getAllCourses(), queryKey: ['courses', 'all'] })
