import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { RecentLive } from '@type/live';

type RecentLiveResponse = {
  info: RecentLive[];
};

export const fetchRecentLive = async (): Promise<RecentLive[]> => {
  const response: AxiosResponse<RecentLiveResponse> = await fetchInstance().get('/streams/live');

  return response.data.info;
};
