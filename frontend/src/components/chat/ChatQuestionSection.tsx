import { useState } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';

export const ChatQuestionSection = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSection = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <SectionContainer>
      <QuestionCard
        type="host"
        user="부스트"
        message="설명해주셨던 내용 중에 yarn-berry를 설정했던 방법이 인상깊었는데 거기서 생겼던 오류가 있나요?"
      />
      {expanded && <QuestionCard type="host" user="라이부" message="다른 질문들" />}
      <SwipeBtn onClick={toggleSection} />
    </SectionContainer>
  );
};
export default ChatQuestionSection;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 95px;
  padding: 13px 20px 0px 20px;
  gap: 10px;
  border-top: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  border-bottom: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  overflow: hidden;
`;

const SwipeBtn = styled.button`
  position: relative;
  width: 100%;
  height: 25px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 35%;
    left: 50%;
    background-color: ${({ theme }) => theme.tokenColors['text-weak']};
    border-radius: 2px;
    height: 5px;
    width: 50px;
    transform: translate(-50%, -50%);
  }
`;
