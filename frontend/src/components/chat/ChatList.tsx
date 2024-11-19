import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { useEffect, useRef } from 'react';
import { MessageReceiveDataWithType } from '@type/chat';
import { CHATTING_TYPES } from '@constants/chat';

export interface ChatListProps {
  messages: MessageReceiveDataWithType[];
  socketId: string | undefined;
}

export const ChatList = ({ messages, socketId }: ChatListProps) => {
  const chatListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatListWrapper ref={chatListRef}>
      {messages.map((chat, index) => (
        <ChatItemWrapper key={index}>
          {chat.msgType === CHATTING_TYPES.QUESTION ? (
            <QuestionCard type="client" user={chat.nickname} message={chat.msg} />
          ) : (
            <NormalChat $pointColor={'skyblue'}>
              {socketId === chat.socketId && <span className="text_point">🧀</span>}
              <span className="text_point">{chat.nickname}</span>
              <span>{chat.msg}</span>
            </NormalChat>
          )}
        </ChatItemWrapper>
      ))}
    </ChatListWrapper>
  );
};

export default ChatList;

const ChatListWrapper = styled.div`
  max-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 50px 20px 0 20px;
  scrollbar-width: none;
`;

const ChatItemWrapper = styled.div`
  margin-top: auto;
  padding: 5px 0;
`;

const NormalChat = styled.div<{ $pointColor: string }>`
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ theme }) => theme.tokenColors['color-white']};
  .text_point {
    color: ${({ $pointColor }) => $pointColor};
    margin-right: 5px;
  }
`;
