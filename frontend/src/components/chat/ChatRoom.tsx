import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import ChatQuestionSection from './ChatQuestionSection';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocket } from '@utils/createSocket';
import { CHATTING_SOCKET_DEFAULT_EVENT, CHATTING_SOCKET_RECIEVE_EVENT, CHATTING_TYPES } from '@constants/chat';
import { MessageReceiveData, MessageReceiveDataWithType } from '@type/chat';

const TEST_SOCKET_URL = 'http://localhost:8080';

export const ChatRoom = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageReceiveDataWithType[]>([]);

  const { id } = useParams();

  useEffect(() => {
    setMessages([]);

    const eventMap = {
      [CHATTING_SOCKET_RECIEVE_EVENT.NORMAL]: (newMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, { ...newMessage, msgType: CHATTING_TYPES.NORMAL }]);
      },
      [CHATTING_SOCKET_RECIEVE_EVENT.QUESTION]: (questionMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, { ...questionMessage, msgType: CHATTING_TYPES.QUESTION }]);
      },
      [CHATTING_SOCKET_RECIEVE_EVENT.NOTICE]: (noticeMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, { ...noticeMessage, msgType: CHATTING_TYPES.NOTICE }]);
      }
    };

    const newSocket = createSocket(TEST_SOCKET_URL, eventMap, (socket) => {
      socket.emit(CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM, id);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.emit(CHATTING_SOCKET_DEFAULT_EVENT.LEAVE_ROOM, id);
        newSocket.disconnect();
      }
    };
  }, [id]);

  return (
    <ChatRoomContainer>
      <ChatHeader />

      <ChatQuestionSection />

      <ChatListContainer>
        <ChatList messages={messages} socketId={socket?.id} />
      </ChatListContainer>

      <ChatInputContainer>
        <ChatInput socket={socket} />
      </ChatInputContainer>
    </ChatRoomContainer>
  );
};
export default ChatRoom;

const ChatRoomContainer = styled.aside`
  display: flex;
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
