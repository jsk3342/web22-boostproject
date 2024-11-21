import styled from 'styled-components';

import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Footer from '@components/common/Footer';

const ClientView = () => {
  return (
    <ClientViewContainer>
      <h1 className="hidden">클라이언트 페이지</h1>
      <Player videoUrl={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} />
      <PlayerInfo />
      <Footer />
    </ClientViewContainer>
  );
};

export default ClientView;

const ClientViewContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 0 60px;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
  scrollbar-width: none;
`;
