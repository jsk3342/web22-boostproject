import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import ChatQuestionSection from './ChatQuestionSection';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocket } from '@utils/createSocket';
import { CHATTING_SOCKET_DEFAULT_EVENT, CHATTING_SOCKET_RECEIVE_EVENT, CHATTING_TYPES } from '@constants/chat';
import { MessageReceiveData, MessageReceiveDataWithType } from '@type/chat';
import { ChatProvider } from 'src/contexts/chatContext';
import { getStoredId } from '@utils/id';

// const TEST_SOCKET_URL = 'http://localhost:8080';
const TEST_SOCKET_URL = 'http://192.168.10.27:3000';

export const ChatRoom = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageReceiveDataWithType[]>([]);
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(true);

  const { id } = useParams();

  const userId = getStoredId();

  useEffect(() => {
    setMessages([]);

    const eventMap = {
      [CHATTING_SOCKET_RECEIVE_EVENT.NORMAL]: (newMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, { ...newMessage, msgType: CHATTING_TYPES.NORMAL }]);
      },
      [CHATTING_SOCKET_RECEIVE_EVENT.QUESTION]: (questionMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, { ...questionMessage, msgType: CHATTING_TYPES.QUESTION }]);
      },
      [CHATTING_SOCKET_RECEIVE_EVENT.NOTICE]: (noticeMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, { ...noticeMessage, msgType: CHATTING_TYPES.NOTICE }]);
      }
    };

    const newSocket = createSocket(TEST_SOCKET_URL, eventMap, (socket) => {
      socket.emit(CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM, { roomId: id, userId });
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.emit(CHATTING_SOCKET_DEFAULT_EVENT.LEAVE_ROOM, id);
        newSocket.disconnect();
      }
    };
  }, [id, createSocket]);

  return (
    <ChatProvider>
      {/* 임시 버튼입니다 */}
      <ChatOpenBtn $isVisible={!isChatRoomVisible} onClick={() => setIsChatRoomVisible(true)}>
        채팅 보기
      </ChatOpenBtn>

      <ChatRoomContainer $isVisible={isChatRoomVisible}>
        <ChatHeader outBtnHandler={() => setIsChatRoomVisible(false)} />

        <ChatQuestionSection />

        <ChatListContainer>
          <ChatList messages={messages} userId={socket?.id} />
        </ChatListContainer>

        <ChatInputContainer>
          <ChatInput socket={socket} />
        </ChatInputContainer>
      </ChatRoomContainer>
    </ChatProvider>
  );
};
export default ChatRoom;

const ChatOpenBtn = styled.button<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  height: 15px;
  background-color: #505050;
`;

const ChatRoomContainer = styled.aside<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  flex-direction: column;
  height: 100%;
  width: 380px;
  border-left: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  background: ${({ theme }) => theme.tokenColors['surface-default']};
`;

const ChatListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: end;
  overflow-y: auto;
`;

const ChatInputContainer = styled.div`
  padding: 10px 20px;
`;
