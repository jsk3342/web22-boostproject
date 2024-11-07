import styled from 'styled-components';

import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Footer from './Footer';

const ClientView = () => {
  return (
    <ClientViewContainer>
      {/* <h1 class='hidden'>클라이언트 페이지</h1> */}
      <Player />
      <PlayerInfo />
      <Footer />
    </ClientViewContainer>
  );
};

export default ClientView;

const ClientViewContainer = styled.main`
  flex: 7;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
`;
