import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import ChatQuestionSection from './ChatQuestionSection';

export const ChatRoom = () => {
  return (
    <ChatRoomContainer>
      <ChatHeader />

      <ChatQuestionSection />

      <ChatListContainer>
        <ChatList />
      </ChatListContainer>

      <ChatInputContainer>
        <ChatInput type="normal" />
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
