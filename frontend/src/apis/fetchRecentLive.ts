import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { RecentLiveResponse } from '@type/live';

export const fetchRecentLive = async (): Promise<RecentLiveResponse> => {
  const response: AxiosResponse<RecentLiveResponse> = await fetchInstance().get('/streams/latest');

  return { info: response.data.info, appendInfo: response.data.appendInfo };
};
