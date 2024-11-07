import { MainHeader, MainLiveSection, RecommendLive, ServiceBanner } from '@components/main';
import { styled } from 'styled-components';

export default function MainPage() {
  return (
    <>
      <MainHeader />
      <MainPageContainer>
        <RecommendLive />
        <ServiceBanner />
        <MainLiveSection title="🚀 라이브 중인 컨퍼런스" type="live" />
        <MainLiveSection title="컨퍼런스 다시보기 👀" type="replay" />
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
