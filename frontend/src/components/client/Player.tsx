import styled from 'styled-components';
import { useState } from 'react';

import playerLoading from '@assets/player_loading.gif';
import PlayIcon from '@assets/play_icon.svg';

interface ContainerProps {
  onStreaming: boolean;
}

const Player = () => {
  const [onStreaming, setOnStreaming] = useState(false);

  return (
    <Container $onStreaming={onStreaming}>
      <LivePlayerInner>{!onStreaming && <PlayButton onClick={() => setOnStreaming(true)} />}</LivePlayerInner>
    </Container>
  );
};

export default Player;

const Container = styled.div<ContainerProps>`
  background: ${({ onStreaming, theme }) =>
    onStreaming ? theme.tokenColors['surface-default'] : `url(${playerLoading}) no-repeat center / cover`};
  padding-top: 56.25%;
  position: relative;
`;

const LivePlayerInner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled(PlayIcon)`
  width: 55px;
  height: 55px;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;
