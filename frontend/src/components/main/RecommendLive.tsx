import styled from 'styled-components';

import { LiveBadgeLarge } from './ThumbnailBadge';
import { useRandomLive } from '@apis/queries/main/useFetchRandomLive';

const RecommendLive = () => {
  const { data: randomLiveData, isLoading, error } = useRandomLive();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>데이터를 가져오는 중 에러가 발생했습니다.</div>;
  }

  if (!randomLiveData || randomLiveData.length === 0) {
    return <div>추천 라이브 데이터가 없습니다.</div>;
  }

  const liveData = randomLiveData[0];
  console.log("liveData", liveData);
  return (
    <RecommendLiveContainer>
      <RecommendLiveBox></RecommendLiveBox>
      <RecommendLiveWrapper>
        <RecommendLiveHeader>
          <div className="recommend_live_status">
            <LiveBadgeLarge />
            <span>{liveData.concurrentUserCount}명 시청</span>
          </div>
          <p className="recommend_live_title">{liveData.liveTitle}</p>
        </RecommendLiveHeader>

        <RecommendLiveInformation>
          <RecommendLiveProfile>
            <img />
          </RecommendLiveProfile>
          <RecommendLiveArea>
            <span className="video_card_name">{liveData.channel.channelName}</span>
            <span className="video_card_category">{liveData.category}</span>
            {/* <span className="video_card_category">기술 공유</span> */}
          </RecommendLiveArea>
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

const RecommendLiveBox = styled.div`
  background: #4f4f4f;
  padding-top: 56.25%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: -1;
  box-shadow: inset 180px -180px 300px 0px #141517;
`;

const RecommendLiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 24px 30px 30px;
  position: relative;
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
  height: fit-content;
  display: flex;
  align-items: center;
  flex-grow: 0.5;
`;

const RecommendLiveProfile = styled.div`
  margin-right: 10px;
  background: ${({ theme }) => theme.tokenColors['surface-alt']} no-repeat 50% / cover;
  border: 4px solid ${({ theme }) => theme.tokenColors['brand-default']};
  border-radius: 50%;
  display: block;
  overflow: hidden;
  position: relative;
  width: 70px;
  height: 70px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecommendLiveArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .video_card_name {
    ${({ theme }) => theme.tokenTypographys['display-bold20']}
    color: ${({ theme }) => theme.tokenColors['text-strong']};
    margin-bottom: 8px;
  }
  .video_card_category {
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
    color: ${({ theme }) => theme.tokenColors['brand-default']};
    margin-bottom: 4px;
  }
`;
