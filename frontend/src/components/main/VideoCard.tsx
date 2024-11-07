import styled from 'styled-components';
import sampleThumbnail from '@assets/sampleThumbnail.png';
import { LiveBadge, LiveViewCountBadge, ReplayBadge, ReplayViewCountBadge } from './ThumbnailBadge';
import ShowInfoBadge from './ShowInfoBadge';

interface VideoCardProps {
  type: 'live' | 'replay';
}

const VideoCard = ({ type }: VideoCardProps) => {
  return (
    <VideoCardContainer>
      <VideoCardThumbnail>
        <VideoCardImage src={sampleThumbnail} />
        {type === 'live' ? (
          <VideoCardDescription>
            <LiveBadge />
            <LiveViewCountBadge count={1125} />
          </VideoCardDescription>
        ) : (
          <VideoCardDescription>
            <ReplayBadge />
            <ReplayViewCountBadge count={1125} />
          </VideoCardDescription>
        )}
      </VideoCardThumbnail>

      <VideoCardWrapper>
        <VideoCardProfile></VideoCardProfile>
        <VideoCardArea>
          <span className="video_card_title">방송 제목 방송 제목</span>
          <span className="video_card_name">라이부</span>
          <VideoCardInformation>
            <ShowInfoBadge badgeType="category" text="프론트엔드" />
            <ShowInfoBadge badgeType="tag" text="태그" />
          </VideoCardInformation>
        </VideoCardArea>
      </VideoCardWrapper>
    </VideoCardContainer>
  );
};

export default VideoCard;

const VideoCardContainer = styled.div`
  word-wrap: break-word;
  word-break: break-all;
`;

const VideoCardThumbnail = styled.div`
  background: #21242a url(${sampleThumbnail}) no-repeat center center / cover;
  overflow: hidden;
  border-radius: 12px;
  display: block;
  padding-top: 56.25%;
  position: relative;
`;

const VideoCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoCardDescription = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
`;

const VideoCardWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  min-width: 0;
`;

const VideoCardProfile = styled.div`
  margin-right: 10px;
  background: ${({ theme }) => theme.tokenColor['surface-alt']} no-repeat 50% / cover;
  border-radius: 50%;
  display: block;
  overflow: hidden;
  width: 40px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoCardArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .video_card_title {
    ${({ theme }) => theme.typographyStyle['display-bold16']}
    color: ${({ theme }) => theme.tokenColor['text-strong']};
    margin-bottom: 8px;
  }
  .video_card_name {
    ${({ theme }) => theme.typographyStyle['display-medium14']}
    color: ${({ theme }) => theme.tokenColor['text-bold']};
    margin-bottom: 6px;
  }
`;

const VideoCardInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
