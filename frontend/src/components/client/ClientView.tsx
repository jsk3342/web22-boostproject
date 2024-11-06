import styled from 'styled-components';

import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Footer from './Footer';

const ClientView = () => {
  return (
    <ClientViewContainer>
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
