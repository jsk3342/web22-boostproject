import styled from 'styled-components';

import Header from '@components/client/Header';
import ClientView from '@components/client/ClientView';
import Chat from '@components/client/Chat';

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
`;
