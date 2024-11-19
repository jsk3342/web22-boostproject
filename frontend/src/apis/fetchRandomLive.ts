import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';

type ChannelInfo = {
  channelId: string | null;
  channelName: string;
};

export type RandomLive = {
  id: number;
  liveId: string;
  liveTitle: string;
  liveImageUrl: string;
  category: string;
  defaultThumbnailImageUrl: string;
  concurrentUserCount: number;
  channel: ChannelInfo;
};

type RandomLiveResponse = {
  info: RandomLive[];
};

export const fetchRandomLive = async (): Promise<RandomLive[]> => {
  const response: AxiosResponse<RandomLiveResponse> = await fetchInstance().get('/viewer/main/random');

  return response.data.info;
};
