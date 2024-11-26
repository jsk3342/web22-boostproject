import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { RecentReplayResponse } from '@type/replay';

export const fetchRecentReplay = async (): Promise<RecentReplayResponse> => {
  const response: AxiosResponse<RecentReplayResponse> = await fetchInstance().get('/replay/latest');

  return { info: response.data.info, appendInfo: response.data.appendInfo };
};
