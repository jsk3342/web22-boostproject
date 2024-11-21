import { useQuery } from '@tanstack/react-query';

import { fetchRecentLive } from '@apis/fetchRecentLive';
import { RecentLive } from '@type/live';

export const useRecentLive = () => {
  return useQuery<RecentLive[], Error>({
    queryKey: ['recentLive'],
    queryFn: fetchRecentLive,
    refetchOnWindowFocus: false
  });
};
