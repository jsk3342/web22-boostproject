import styled from 'styled-components';

import { ClientView, Header } from '@components/client';
import { ChatRoom } from '@components/chat';

export default function ClientPage() {
  return (
    <>
      <Header />
      <ClientContainer>
        <ClientView />
        <ChatRoom />
      </ClientContainer>
    </>
  );
}

const ClientContainer = styled.div`
  box-sizing: border-box;
  padding: 60px 10px 0 10px;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.tokenColors['susrface-default']};
`;
