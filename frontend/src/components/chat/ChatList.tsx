import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { useEffect, useRef } from 'react';

const sampleData = [
  { user: '고양이', message: 'ㅇㅅㅇ', type: 'normal' },
  { user: '강아지', message: 'ㅎㅇㅎㅇ', type: 'normal' },
  {
    user: '오리',
    message:
      '가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하',
    type: 'normal'
  }
];

function getRandomBrightColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 50) + 50;
  const lightness = Math.floor(Math.random() * 30) + 50;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const ChatList = () => {
  const chatListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, []);

  return (
    <ChatListWrapper ref={chatListRef}>
      {[...Array(6)].map((_, i) =>
        sampleData.map((chat, index) => (
          <ChatItemWrapper key={`${i}-${index}`}>
            {chat.type === 'normal' ? (
              <NormalChat $pointColor={getRandomBrightColor()}>
                <span className="text_point">{chat.user}</span>
                <span>{chat.message}</span>
              </NormalChat>
            ) : (
              <QuestionCard type="client" user={chat.user} message={chat.message} />
            )}
          </ChatItemWrapper>
        ))
      )}
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
