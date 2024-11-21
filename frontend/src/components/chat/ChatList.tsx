import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { useContext, useEffect, useRef } from 'react';
import { MessageReceiveData } from '@type/chat';
import { CHATTING_TYPES } from '@constants/chat';
import { ChatContext } from 'src/contexts/chatContext';
import NoticeCard from './NoticeCard';

export interface ChatListProps {
  messages: MessageReceiveData[];
  userId: string | undefined;
}

export const ChatList = ({ messages, userId }: ChatListProps) => {
  const { state } = useContext(ChatContext);
  const chatListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatListSection>
      <ChatListWrapper ref={chatListRef}>
        {messages.map((chat, index) => (
          <ChatItemWrapper key={index}>
            {chat.msgType === CHATTING_TYPES.QUESTION ? (
              <QuestionCard type="client" question={chat} />
            ) : chat.msgType === CHATTING_TYPES.NOTICE ? (
              <NoticeChat>
                <span>📢</span>
                <span>{chat.msg}</span>
              </NoticeChat>
            ) : (
              <NormalChat $pointColor={chat.color}>
                {userId === chat.userId && <span className="text_point">🧀</span>}
                <span className="text_point">{chat.nickname}</span>
                <span>{chat.msg}</span>
              </NormalChat>
            )}
          </ChatItemWrapper>
        ))}
      </ChatListWrapper>
      {state.isNoticePopupOpen && (
        <PopupWrapper>
          <NoticeCard />
        </PopupWrapper>
      )}
    </ChatListSection>
  );
};

export default ChatList;

const ChatListSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  position: relative;
  height: 100%;
`;

const ChatListWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 20px 0 20px;
  overflow-y: auto;
  scrollbar-width: none;
  z-index: 100;
`;

const ChatItemWrapper = styled.div`
  margin-top: auto;
  padding: 5px 0;
`;

const NoticeChat = styled.div`
  display: flex;
  padding: 10px 15px;
  gap: 10px;
  ${({ theme }) => theme.tokenTypographys['display-medium12']};
  color: ${({ theme }) => theme.tokenColors['text-default']};
  background-color: #0e0f10;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const NormalChat = styled.div<{ $pointColor: string }>`
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ theme }) => theme.tokenColors['color-white']};
  .text_point {
    color: ${({ $pointColor }) => $pointColor};
    margin-right: 5px;
  }
  overflow-wrap: break-word;
  word-break: break-word;
`;

const PopupWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 5%;
  right: 5%;
  z-index: 1000;
`;
