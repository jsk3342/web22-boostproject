import { useQuery } from '@tanstack/react-query';

import { fetchRecentReplay } from '@apis/fetchRecentReplay';
import { ReplayStream } from '@type/replay';

export const useRecentReplay = () => {
  return useQuery<ReplayStream[], Error>({
    queryKey: ['recentReplay'],
    queryFn: fetchRecentReplay,
    refetchOnWindowFocus: false
  });
};
