import styled from 'styled-components';
import CheckIcon from '@assets/icons/check.svg';

interface QuestionCardProps {
  type: 'normal' | 'question';
}

export const QuestionCard = ({ type }: QuestionCardProps) => {
  return (
    <QuestionCardContainer>
      <QuestionCardTop>
        <QuestionInfo>
          <span className="name_info">💟 J999_부스트</span>
          <span className="time_info">n분전</span>
        </QuestionInfo>
        {type === 'question' && (
          <CheckBtn>
            <StyledCheckIcon />
          </CheckBtn>
        )}
      </QuestionCardTop>

      <QuestionCardBottom>
        설명해주셨던 내용 중에 yarn-berry를 설정했던 방법이 인상깊었는데 거기서 생겼던 오류가 있나요?
      </QuestionCardBottom>
    </QuestionCardContainer>
  );
};
export default QuestionCard;

const QuestionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px;
  gap: 13px;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px #3c444b3c;
  background-color: #47336f;
  color: ${({ theme }) => theme.tokenColors['color-white']};
`;

const QuestionCardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionInfo = styled.div`
  display: flex;
  align-items: end;
  gap: 12px;
  .name_info {
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
  }
  .time_info {
    ${({ theme }) => theme.tokenTypographys['display-bold12']}
    color: ${({ theme }) => theme.tokenColors['text-strong']};
  }
`;

const CheckBtn = styled.button`
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  :hover {
    color: ${({ theme }) => theme.tokenColors['brand-default']};
  }
`;

const StyledCheckIcon = styled(CheckIcon)`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const QuestionCardBottom = styled.div`
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
`;
