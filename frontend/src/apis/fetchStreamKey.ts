import { AxiosResponse } from 'axios';
import { BASE_URL, fetchInstance } from '.';

type NanoId = string;

export type StreamKeyResponse = {
  'stream-key': string;
  'session-key': string;
};

export const fetchStreamKey = async (userId: NanoId): Promise<StreamKeyResponse> => {
  const response: AxiosResponse<StreamKeyResponse> = await fetchInstance().post(`${BASE_URL}/host/key`, { userId });
  return response.data;
};
