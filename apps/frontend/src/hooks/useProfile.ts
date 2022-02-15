// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useAppSelector } from '@/app/hooks';
import { selectProfile, selectLoading } from '@kma-news/auth-slice';

export const useProfile = () => {
  const profile = useAppSelector(selectProfile);
  const loading = useAppSelector(selectLoading);
  return [profile, loading] as const;
};
