import type { FC } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateUserProgress } from 'services/api'

interface useUpdateUserProgressProps {
  course: string
  workoutId: string
  progressArray: [boolean, ...number[]]
}

export const useUpdateUserProgress: FC<useUpdateUserProgressProps> = ({ course, workoutId, progressArray }) =>
  useMutation({
    mutationFn: () => updateUserProgress({ course, workoutId, progressArray }),
    //Насчет mutationKey вообще не уверен
    mutationKey: ['user', 'progress'],
  })
