import { useQuery } from '@tanstack/react-query';

import { fetchMainLive } from '@apis/fetchMainLive';
import { MainLive } from '@type/live';

export const useMainLive = () => {
  return useQuery<MainLive[], Error>({
    queryKey: ['mainLive'],
    queryFn: fetchMainLive,
    refetchOnWindowFocus: false
  });
};
