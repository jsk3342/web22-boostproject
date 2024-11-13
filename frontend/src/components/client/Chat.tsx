import { useState } from 'react';
import styled from 'styled-components';

const Chat = () => {
  const [chatVisible, setChatVisible] = useState(true);

  const handleChatVisible = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <>
      {chatVisible && (
        <ChatContainer>
          <h3>채팅</h3>
          <button onClick={handleChatVisible}>채팅창아 사라져라!</button>
        </ChatContainer>
      )}
    </>
  );
};

export default Chat;

const ChatContainer = styled.section`
  width: 300px;
  border: 1px solid red;
  padding: 10px 20px;
`;
