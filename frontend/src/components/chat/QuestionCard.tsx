import styled from 'styled-components';
import CheckIcon from '@assets/icons/check.svg';
import { MessageReceiveData } from '@type/chat';

interface QuestionCardProps {
  type: 'host' | 'client';
  question: MessageReceiveData;
  handleQuestionDone?: (questionId: number) => void;
}

export const QuestionCard = ({ type, question, handleQuestionDone }: QuestionCardProps) => {
  return (
    <QuestionCardContainer>
      <QuestionCardTop>
        <QuestionInfo>
          <span className="name_info">💟 {question.nickname}</span>
          <span className="time_info">n분전</span>
        </QuestionInfo>
        {type === 'host' && handleQuestionDone && (
          <CheckBtn onClick={() => handleQuestionDone(question.questionId as number)}>
            <StyledCheckIcon />
          </CheckBtn>
        )}
      </QuestionCardTop>

      <QuestionCardBottom>{question.msg}</QuestionCardBottom>
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
  overflow-wrap: break-word;
  word-break: break-word;
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
