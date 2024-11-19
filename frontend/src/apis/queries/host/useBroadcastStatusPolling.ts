import { useQuery } from '@tanstack/react-query';
import { fetchBroadcastStatus } from '@apis/fetchBroadcastStatus';

export const useBroadcastStatusPolling = (pollingInterVal = 10000) => {
  return useQuery({
    queryKey: ['broadcastStatus'],
    queryFn: fetchBroadcastStatus,
    refetchInterval: pollingInterVal,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    retry: 3,
    initialData: { status: false },
    select: (data) => data.status
  });
};
