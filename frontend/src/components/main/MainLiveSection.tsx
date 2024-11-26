import { useState } from 'react';
import styled from 'styled-components';

import ReplayVideoCard from './ReplayVideoCard';
import LiveVideoCard from './LiveVideoCard';
import LoadMoreDivider from './LoadMoreDivider';
import { useRecentLive } from '@apis/queries/main/useFetchRecentLive';
import { useRecentReplay } from '@apis/queries/main/useFetchRecentReplay';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';
import ChevronUpIcon from '@assets/icons/chevron-up.svg';
import { RecentLive } from '@type/live';
import { ReplayStream } from '@type/replay';

interface MainLiveSectionProps {
  title: string;
  type: 'live' | 'replay';
}

const MainLiveSection = ({ title, type }: MainLiveSectionProps) => {
  const [textStatus, setTextStatus] = useState<'더보기' | '접기'>('더보기');

  const {
    data: liveData = { info: [], appendInfo: [] },
    isLoading: isLiveLoading,
    error: liveError
  } = type === 'live' ? useRecentLive() : { data: undefined, isLoading: false, error: null };

  const {
    data: replayData = { info: [], appendInfo: [] },
    isLoading: isReplayLoading,
    error: replayError
  } = type === 'replay' ? useRecentReplay() : { data: undefined, isLoading: false, error: null };

  const isLoading = isLiveLoading || isReplayLoading;
  const error = liveError || replayError;

  const data = type === 'live' ? liveData : replayData;

  const displayedData = textStatus === '접기' ? [...data.info, ...data.appendInfo] : data.info;

  const handleTextChange = () => {
    setTextStatus(textStatus === '더보기' ? '접기' : '더보기');
  };

  if (error) {
    return <div>데이터를 가져오는 중 에러가 발생했습니다.</div>;
  }

  return (
    <MainSectionContainer>
      <MainSectionHeader>
        <p className="live_section_title">{title}</p>
        <button className="live_section_button">전체보기</button>
      </MainSectionHeader>

      {isLoading && <div>로딩 중...</div>}

      {displayedData.length === 0 && !isLoading && <div>데이터가 없습니다.</div>}

      <MainSectionContentList>
        {type === 'live'
          ? (displayedData as RecentLive[]).map((video) => <LiveVideoCard key={video.id} videoData={video} />)
          : (displayedData as ReplayStream[]).map((video) => <ReplayVideoCard key={video.videoNo} videoData={video} />)}
      </MainSectionContentList>

      <LoadMoreDivider
        text={textStatus}
        onClick={handleTextChange}
        component={textStatus === '더보기' ? <StyledChevronDown /> : <StyledChevronUp />}
      />
      <div className="parent">
        <div className="child"></div>
      </div>
    </MainSectionContainer>
  );
};

export default MainLiveSection;

const MainSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 25px;
  .live_section_title {
    ${({ theme }) => theme.tokenTypographys['display-bold20']}
    color: ${({ theme }) => theme.tokenColors['color-white']};
  }
  .live_section_button {
    ${({ theme }) => theme.tokenTypographys['display-bold14']}
    color: ${({ theme }) => theme.tokenColors['text-default']};
  }
`;

const MainSectionContentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 14px;
  row-gap: 30px;
  margin-bottom: 30px;

  > div {
    flex: 1 0 calc(20% - 14px);
    max-width: calc(20% - 10px);

    @media (max-width: 1700px) {
      flex: 1 0 calc(25% - 14px);
      max-width: calc(25% - 10px);
    }

    @media (max-width: 1500px) {
      flex: 1 0 calc(33.33% - 14px);
      max-width: calc(33.33% - 10px);
    }
  }
`;

const StyledChevronDown = styled(ChevronDownIcon)`
  width: 16px;
  height: 16px;
`;

const StyledChevronUp = styled(ChevronUpIcon)`
  width: 16px;
  height: 16px;
`;
