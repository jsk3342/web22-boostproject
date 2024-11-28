import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LiveBadgeLarge } from './ThumbnailBadge';
import { useMainLive } from '@queries/main/useFetchMainLive';
import sampleProfile from '@assets/sample_profile.png';
import useRotatingPlayer from '@hooks/useRotatePlayer';
import RecommendList from './RecommendList';
import { getLiveURL } from '@utils/getVideoURL';
import AnimatedProfileSection from './AnimatedProfileSection';
import AnimatedLiveHeader from './AnimatedLiveHeader';

const RecommendLive = () => {
  const navigate = useNavigate();
  const { videoRef, initPlayer } = useRotatingPlayer();
  const { data: mainLiveData, isLoading, error } = useMainLive();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const recommendListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainLiveData?.[currentUrlIndex]) return;

    const videoUrl = getLiveURL(mainLiveData[currentUrlIndex].liveId);
    initPlayer(videoUrl);
  }, [mainLiveData, currentUrlIndex, initPlayer]);

  const onSelect = useCallback((index: number) => {
    setCurrentUrlIndex(index);
  }, []);

  const currentLiveData = useMemo(() => mainLiveData?.[currentUrlIndex], [mainLiveData, currentUrlIndex]);

  if (error) return <div>데이터를 가져오는 중 에러가 발생했습니다.</div>;
  if (!mainLiveData?.length) return <div>추천 라이브 데이터가 없습니다.</div>;
  if (!currentLiveData) return null;

  const { liveId, liveTitle, concurrentUserCount, channel, category } = currentLiveData;

  return (
    <RecommendLiveContainer>
      <RecommendLiveBox $isLoading={isLoading}>
        <video ref={videoRef} autoPlay muted />
      </RecommendLiveBox>
      <RecommendLiveWrapper onClick={() => navigate(`/live/${liveId}`)}>
        <AnimatedLiveHeader concurrentUserCount={concurrentUserCount} liveTitle={liveTitle} />

        <RecommendLiveInformation>
          <AnimatedProfileSection channel={channel} category={category} profileImage={sampleProfile} />
          <RecommendList
            ref={recommendListRef}
            mainLiveData={mainLiveData}
            onSelect={onSelect}
            currentLiveId={liveId}
          />
        </RecommendLiveInformation>
      </RecommendLiveWrapper>
    </RecommendLiveContainer>
  );
};

export default RecommendLive;

const RecommendLiveContainer = styled.div`
  word-wrap: break-word;
  background: #141517;
  border-radius: 12px;
  height: 370px;
  overflow: hidden;
  position: relative;
  word-break: break-all;
  z-index: 0;
`;

const RecommendLiveBox = styled.div<{ $isLoading: boolean }>`
  background: ${({ $isLoading, theme }) => ($isLoading ? theme.tokenColors['surface-default'] : '')};
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  box-shadow: inset 180px -180px 300px 0px #141517;
  opacity: 0.6;

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    object-position: center;
  }
`;

const RecommendLiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  justify-content: space-between;
  padding: 22px 30px;
  position: relative;
  cursor: pointer;
`;

const RecommendLiveHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .recommend_live_status {
    display: flex;
    align-items: center;
    gap: 10px;
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
    color: ${({ theme }) => theme.tokenColors['red-default']};
  }
  .recommend_live_title {
    ${({ theme }) => theme.tokenTypographys['display-bold24']}
    color: ${({ theme }) => theme.tokenColors['color-white']};
  }
`;

const RecommendLiveInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
