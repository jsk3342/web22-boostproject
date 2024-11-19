import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';

export interface HostInfo {
  userId: string;
  liveTitle: string;
  defaultThumbnailImageUrl: string;
  category: string;
  tags: string[];
}

export const updateHost = async (hostInfo: HostInfo): Promise<HostInfo> => {
  const response: AxiosResponse<HostInfo> = await fetchInstance().post('/host/update', hostInfo);

  return response.data;
};
