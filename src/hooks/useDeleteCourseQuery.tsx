import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeCourse } from '../services/api'

export const useDeleteCourseQuery = (courses: string[], course: string) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: () => removeCourse({ courses, course }),
    onSuccess: () => client.invalidateQueries({ queryKey: ['user', 'state'] }),
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message)
      }
    },
  })
}
