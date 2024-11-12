import styled from 'styled-components';
import { useState } from 'react';
import playerLoading from '@assets/player_loading.gif';
import PlayIcon from '@assets/play_icon.svg';
const Player = () => {
  const [onStreaming, setOnStreaming] = useState(false);
  return (
    <Container $onStreaming={onStreaming}>
      <LivePlayerInner>
        {!onStreaming && (
          <PlayButton onClick={() => setOnStreaming(true)}>
            <PlayIcon />
          </PlayButton>
        )}
      </LivePlayerInner>
    </Container>
  );
};
export default Player;
const Container = styled.div<{ $onStreaming: boolean }>`
  background: ${({ $onStreaming, theme }) =>
    $onStreaming ? theme.tokenColors['surface-default'] : `url(${playerLoading}) no-repeat center / cover`};
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
const PlayButton = styled.button`
  width: 55px;
  height: 55px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    opacity: 0.8;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
