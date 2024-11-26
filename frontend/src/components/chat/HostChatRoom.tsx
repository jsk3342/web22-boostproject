import { ChatRoomLayout } from './ChatRoomLayout';
import { getStoredId } from '@utils/id';
import useFetchStreamKey from '@apis/queries/host/useFetchStreamKey';
import { useEffect, useState } from 'react';

import { ChatProvider } from 'src/contexts/chatContext';

const HostChatRoom = () => {
  const userId = getStoredId();
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const { mutate: fetchSessionKey } = useFetchStreamKey({
    onSuccess: ({ sessionKey }) => setSessionKey(sessionKey)
  });

  useEffect(() => {
    if (userId && !sessionKey) fetchSessionKey(userId);
  }, [userId, fetchSessionKey, sessionKey]);

  if (!sessionKey) return <div>세션 키 로딩 중...</div>;

  return (
    <ChatProvider>
      <ChatRoomLayout userType={'host'} roomId={sessionKey} />
    </ChatProvider>
  );
};

export default HostChatRoom;
