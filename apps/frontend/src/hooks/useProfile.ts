import { useAppSelector } from '@/app/hooks'
import { selectProfile, selectLoading } from '@/features/Auth/authSlice'

export const useProfile = () => {
  const profile = useAppSelector(selectProfile)
  const loading = useAppSelector(selectLoading)
  return [profile, loading] as const
}
