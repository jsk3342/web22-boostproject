import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useClientLive } from '@apis/queries/client/useFetchLive';
import Footer from '@common/Footer';
import Header from '@common/Header';
import Player from './Player';
import PlayerInfo from './PlayerInfo';

const ReplayView = () => {
  const { id: liveId } = useParams();
  const { data: clientLiveData } = useClientLive({ liveId: liveId as string });

  if (!clientLiveData) {
    return <div>로딩 중...</div>;
  }

  return (
    <ReplayViewContainer>
      <Header />
      <h1 className="hidden">다시보기 페이지</h1>
      <Player videoUrl={`https://kr.object.ncloudstorage.com/web22/live/${liveId}/index.m3u8`} />
      <PlayerInfo clientLiveData={clientLiveData} />
      <Footer />
    </ReplayViewContainer>
  );
};

export default ReplayView;

const ReplayViewContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 0 60px;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
  scrollbar-width: none;
`;
