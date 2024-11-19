import { fetchInstance } from '.';

export type BroadcastStatusResponse = {
  status: boolean;
};

export const fetchBroadcastStatus = async (): Promise<BroadcastStatusResponse> => {
  const response = await fetchInstance().get<BroadcastStatusResponse>('/host/status');
  return {
    status: response.data.status
  };
};
