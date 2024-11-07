import { useState } from 'react';
import styled from 'styled-components';

const PlayerInfo = () => {
  const [videoStatus, setVideoStatus] = useState(true);

  return (
    <PlayerInfoContainer>
      <VideoTitle>크롱의 클라이언트 상태관리 라이부</VideoTitle>
      <PlayerInfoBox>
        <ImageBox>{videoStatus && <LiveBox>LIVE</LiveBox>}</ImageBox>
        <VideoInfo>
          <VideoUploader>네이버 부스트캠프</VideoUploader>
          <Category>frontend</Category>
          {videoStatus && (
            <LiveInfo>
              <p>192명 시청 중</p>
              <p>·</p>
              <p>45:13 스트리밍 중</p>
            </LiveInfo>
          )}
        </VideoInfo>
      </PlayerInfoBox>
      <VideoDescription>
        <DescriptionTitle>컨퍼런스 설명</DescriptionTitle>
        <DescriptionContent>
          크롱님의 혼신의 상태관리 설명입니다. 어쩌구저쩌구 엄청 긴 내용의 설명도 감당할 수 있도록 컨테이너 크기를
          조절해야합니다.
        </DescriptionContent>
      </VideoDescription>
    </PlayerInfoContainer>
  );
};

export default PlayerInfo;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 0;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
`;

const VideoTitle = styled.h1`
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-bold24']};
  margin-bottom: 24px;
`;

const PlayerInfoBox = styled.div`
  display: flex;
  gap: 16px;
`;

const ImageBox = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.tokenColors['brand-default']};
`;

const LiveBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.tokenColors['red-default']};
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-bold16']};
  line-height: 1.2;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const VideoUploader = styled.p`
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-bold16']};
`;

const Category = styled.p`
  color: ${({ theme }) => theme.tokenColors['brand-default']};
  ${({ theme }) => theme.tokenTypographys['display-bold12']};
`;

const LiveInfo = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.tokenColors['text-bold']};
  ${({ theme }) => theme.tokenTypographys['display-bold12']};
`;

const VideoDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  margin-top: 24px;
  gap: 16px;
  border-radius: 7px;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  background-color: ${({ theme }) => theme.tokenColors['surface-alt']};
`;

const DescriptionTitle = styled.p`
  ${({ theme }) => theme.tokenTypographys['display-bold12']};
`;

const DescriptionContent = styled.p`
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
`;
