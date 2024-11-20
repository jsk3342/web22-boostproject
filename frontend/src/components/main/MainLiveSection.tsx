import styled from 'styled-components';

import VideoCard from './VideoCard';
import LoadMoreDivider from './LoadMoreDivider';
import { useRecentLive } from '@apis/queries/main/useFetchRecentLive';

interface MainLiveSectionProps {
  title: string;
  type: 'live' | 'replay';
}
const MainLiveSection = ({ title, type }: MainLiveSectionProps) => {
  // TODO: 다시보기가 만들어지면 useRecentReplay 삼항연산자로 변경
  const { data = [], isLoading, error } = useRecentLive();

  return (
    <MainSectionContainer>
      <MainSectionHeader>
        <p className="live_section_title">{title}</p>
        <button className="live_section_button">전체보기</button>
      </MainSectionHeader>

      {isLoading && <div>로딩 중...</div>}

      {data.length === 0 && !isLoading && <div>데이터가 없습니다.</div>}

      {data.length !== 0 && (
        <MainSectionContentList>
          {data.map((video) => (
            <VideoCard key={video.id} type={type} videoData={video} />
          ))}
        </MainSectionContentList>
      )}

      <LoadMoreDivider text="더보기" />
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
