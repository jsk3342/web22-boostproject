import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => <StyledVideo ref={ref} {...props} />);

export default React.memo(Video);

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
