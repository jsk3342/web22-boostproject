import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { ReplayStream } from '@type/replay';

type RecentReplayResponse = {
  info: ReplayStream[];
};

export const fetchRecentReplay = async (): Promise<ReplayStream[]> => {
  const response: AxiosResponse<RecentReplayResponse> = await fetchInstance().get('/replay/latest');

  return response.data.info;
};
