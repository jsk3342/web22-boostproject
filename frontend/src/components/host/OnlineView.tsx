import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Hls from 'hls.js';

import { getHostURL } from '@utils/hostURL';

export default function OnlineView() {
  const hostURL = getHostURL();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !hostURL) {
      return;
    }
    const isNativeHLS = videoElement.canPlayType('application/vnd.apple.mpegurl');

    if (isNativeHLS) {
      videoElement.src = hostURL;
      videoElement.play();
      return;
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true
    });

    hls.loadSource(hostURL);
    hls.attachMedia(videoElement);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoElement.play();
    });

    return () => {
      hls.destroy();
    };
  }, [hostURL]);

  return (
    <LivePlayerActive>
      <Video ref={videoRef} controls tabIndex={0} autoPlay muted />
    </LivePlayerActive>
  );
}

const LivePlayerActive = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
