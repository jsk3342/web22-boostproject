import styled from 'styled-components';
import VideoCard from './VideoCard';
import LoadMoreDivider from './LoadMoreDivider';

interface MainLiveSectionProps {
  title: string;
  type: 'live' | 'replay';
}
const MainLiveSection = ({ title, type }: MainLiveSectionProps) => {
  return (
    <MainSectionContainer>
      <MainSectionHeader>
        <p className="live_section_title">{title}</p>
        <button className="live_section_button">전체보기</button>
      </MainSectionHeader>
      <MainSectionContentList>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <VideoCard key={index} type={type} />
        ))}
      </MainSectionContentList>
      <LoadMoreDivider text="더보기" />
    </MainSectionContainer>
  );
};

export default MainLiveSection;

const MainSectionContainer = styled.section`
  width: 100%;
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
    ${({ theme }) => theme.typographyStyle['display-bold20']}
    color: ${({ theme }) => theme.tokenColor['color-white']};
  }
  .live_section_button {
    ${({ theme }) => theme.typographyStyle['display-bold14']}
    color: ${({ theme }) => theme.tokenColor['text-default']};
  }
`;

const MainSectionContentList = styled.div`
  width: 100%;
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
