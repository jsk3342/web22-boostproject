import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import styled from 'styled-components';

import playerLoading from '@assets/player_loading.gif';
import CustomPlayIcon from '@assets/custom_play_icon.svg';
import PauseIcon from '@assets/icons/pause_icon.svg';
import PlayIcon from '@assets/icons/play_icon.svg';

const Player = ({ videoUrl, isLive }: { videoUrl: string; isLive: boolean }) => {
  const [onHLSReady, setOnHLSReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setOnHLSReady(true);
        videoRef.current?.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.play();
      setOnHLSReady(true);
    }
  }, [onHLSReady, videoUrl]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === videoRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setIsPaused(false);
      } else {
        setIsPaused(true);
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 1000);
    }
  };

  return (
    <PlayerContainer $onHLSReady={onHLSReady}>
      <LivePlayerInner>
        {onHLSReady ? (
          <>
            <Video ref={videoRef} controls onClick={handlePlayPause} />
            {showIcon && (
              <IconOverlay $isFullscreen={isFullscreen}>{isPaused ? <PlayIcon /> : <PauseIcon />}</IconOverlay>
            )}
          </>
        ) : (
          <PlayButton onClick={() => setOnHLSReady(true)}>
            <CustomPlayIcon />
          </PlayButton>
        )}
      </LivePlayerInner>
    </PlayerContainer>
  );
};

export default Player;

const PlayerContainer = styled.div<{ $onHLSReady: boolean }>`
  background: ${({ $onHLSReady, theme }) =>
    $onHLSReady ? theme.tokenColors['surface-default'] : `url(${playerLoading}) no-repeat center / cover`};
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
`;

const IconOverlay = styled.div<{ $isFullscreen: boolean }>`
  position: ${({ $isFullscreen }) => ($isFullscreen ? 'fixed' : 'absolute')};
  width: 75px;
  height: 75px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.tokenColors['color-white']};
  border-radius: 50%;
  opacity: 0.8;
  transition: opacity 0.3s;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  display: block;

`;
