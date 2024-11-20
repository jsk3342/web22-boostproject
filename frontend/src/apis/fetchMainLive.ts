import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';

type ChannelInfo = {
  channelId: string | null;
  channelName: string;
};

export type MainLive = {
  id: number;
  liveId: string;
  liveTitle: string;
  liveImageUrl: string;
  category: string;
  defaultThumbnailImageUrl: string;
  concurrentUserCount: number;
  channel: ChannelInfo;
};

type MainLiveResponse = {
  info: MainLive[];
};

export const fetchMainLive = async (): Promise<MainLive[]> => {
  const response: AxiosResponse<MainLiveResponse> = await fetchInstance().get('/streams/random');

  return response.data.info;
};
