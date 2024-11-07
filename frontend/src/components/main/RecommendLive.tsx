import styled from 'styled-components';
import { LiveBadgeLarge } from './ThumbnailBadge';

const RecommendLive = () => {
  return (
    <RecommendLiveContainer>
      <RecommendLiveBox></RecommendLiveBox>

      <RecommendLiveWrapper>
        <RecommendLiveHeader>
          <div className="recommend_live_status">
            <LiveBadgeLarge />
            <span>1,204명 시청</span>
          </div>
          <p className="recommend_live_title">라이부로 배우는 동영상 스트리밍 서비스</p>
        </RecommendLiveHeader>

        <RecommendLiveInformation>
          <RecommendLiveProfile>
            <img />
          </RecommendLiveProfile>
          <RecommendLiveArea>
            <span className="video_card_name">네이버 부스트캠프</span>
            <span className="video_card_category">🧑🏻‍💻 기술 공유</span>
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
    ${({ theme }) => theme.typographyStyle['display-bold16']}
    color: ${({ theme }) => theme.tokenColor['red-default']};
  }
  .recommend_live_title {
    ${({ theme }) => theme.typographyStyle['display-bold24']}
    color: ${({ theme }) => theme.tokenColor['color-white']};
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
  background: ${({ theme }) => theme.tokenColor['surface-alt']} no-repeat 50% / cover;
  border: 4px solid ${({ theme }) => theme.tokenColor['brand-default']};
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
    ${({ theme }) => theme.typographyStyle['display-bold20']}
    color: ${({ theme }) => theme.tokenColor['text-strong']};
    margin-bottom: 8px;
  }
  .video_card_category {
    ${({ theme }) => theme.typographyStyle['display-bold16']}
    color: ${({ theme }) => theme.tokenColor['brand-default']};
    margin-bottom: 4px;
  }
`;
