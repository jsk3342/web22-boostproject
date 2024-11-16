import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';

export type StreamKeyResponse = {
  'stream-key': string;
  'session-key': string;
};

export const fetchHostVideoURL = async (streamKey: string): Promise<StreamKeyResponse> => {
  const response: AxiosResponse<StreamKeyResponse> = await fetchInstance().get(`live/${streamKey}/index.m3u8`);
  return response.data;
};
