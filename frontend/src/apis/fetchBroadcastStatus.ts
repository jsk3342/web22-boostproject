import { getSessionKey } from '@utils/streamKey';
import { fetchInstance } from '.';

export type BroadcastStatusResponse = {
  state: boolean;
};

export const fetchBroadcastStatus = async (): Promise<BroadcastStatusResponse> => {
  const sessionKey = getSessionKey();

  const response = await fetchInstance().get<BroadcastStatusResponse>('/host/state', {
    params: {
      sessionKey
    }
  });

  return {
    state: response.data.state
  };
};
