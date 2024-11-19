import { useQuery } from '@tanstack/react-query';
import { fetchRandomLive, RandomLive } from '@apis/fetchRandomLive';

export const useRandomLive = () => {
  return useQuery<RandomLive[], Error>({
    queryKey: ['randomLive'],
    queryFn: fetchRandomLive,
    refetchOnWindowFocus: false
  });
};
