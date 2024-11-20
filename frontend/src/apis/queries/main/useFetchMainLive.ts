import { useQuery } from '@tanstack/react-query';
import { fetchMainLive, MainLive } from '@apis/fetchMainLive';

export const useMainLive = () => {
  return useQuery<MainLive[], Error>({
    queryKey: ['mainLive'],
    queryFn: fetchMainLive,
    refetchOnWindowFocus: false
  });
};
