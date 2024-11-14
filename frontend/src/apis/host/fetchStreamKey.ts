import { BASE_URL, fetchInstance } from '..';

type NanoId = string;

export const fetchStreamKey = (userId: NanoId) => {
  return fetchInstance().post(`${BASE_URL}/host/key`, {
    userId
  });
};
