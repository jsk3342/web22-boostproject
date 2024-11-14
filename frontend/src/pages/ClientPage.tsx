import styled from 'styled-components';

import { Chat, ClientView, Header } from '@components/client';

export default function ClientPage() {
  return (
    <>
      <Header />
      <ClientContainer>
        <ClientView />
        <Chat />
      </ClientContainer>
    </>
  );
}

const ClientContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
`;
