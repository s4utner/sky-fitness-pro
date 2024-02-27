import { useQuery } from '@tanstack/react-query'
import { getCourseById } from '../../services/api'

export const useCourseQuery = (id: string) => useQuery({ queryFn: () => getCourseById(id), queryKey: ['courses'] })
