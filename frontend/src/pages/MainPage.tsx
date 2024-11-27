import { styled } from 'styled-components';

import { AsyncBoundary } from '@common/AsyncBoundary';
import Footer from '@common/Footer';
import ServiceBanner from '@common/ServiceBanner';
import { RecommendLiveError, VideoSectionError } from '@components/error';
import { MainHeader, MainLiveSection, MainReplaySection, RecommendLive } from '@components/main';
import { RecommendLiveSkeleton, VideoSectionSkeleton } from '@components/skeleton';

export default function MainPage() {
  return (
    <>
      <MainHeader />
      <MainPageContainer>
        <AsyncBoundary
          pendingFallback={<RecommendLiveSkeleton />}
          rejectedFallback={(error) => <RecommendLiveError error={error} />}
        >
          <RecommendLive />
        </AsyncBoundary>

        <ServiceBanner />
        <AsyncBoundary
          pendingFallback={<VideoSectionSkeleton />}
          rejectedFallback={(error) => <VideoSectionError error={error} />}
        >
          <MainLiveSection title="🚀 라이브 중인 컨퍼런스" />
        </AsyncBoundary>
        <AsyncBoundary
          pendingFallback={<VideoSectionSkeleton />}
          rejectedFallback={(error) => <VideoSectionError error={error} />}
        >
          <MainReplaySection title="컨퍼런스 다시보기 👀" />
        </AsyncBoundary>
        <Footer />
      </MainPageContainer>
    </>
  );
}

const MainPageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 90px 45px;
  gap: 40px;
  background: ${({ theme }) => theme.tokenColors['surface-default']};
`;
