import { getHostVideoURL } from '@apis/getHostVideo';
import { useQuery } from '@tanstack/react-query';

export default function useGetHostVideo(streamKey: string) {
  const { data } = useQuery({
    queryKey: ['hostVideo'],
    queryFn: () => getHostVideoURL(streamKey)
  });

  return data?.url ?? '';
}
