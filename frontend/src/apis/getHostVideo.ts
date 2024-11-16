import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';

export type StreamKeyResponse = {
  url: string;
};

export const getHostVideoURL = async (streamKey: string): Promise<StreamKeyResponse> => {
  const response: AxiosResponse<StreamKeyResponse> = await fetchInstance().get(`live/${streamKey}/index.m3u8`);
  return response.data;
};
