import { useState } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { MessageReceiveData, MessageSendData } from '@type/chat';
import { Socket } from 'socket.io-client';
import { CHATTING_SOCKET_SEND_EVENT } from '@constants/chat';
import { useParams } from 'react-router-dom';
import { getStoredId } from '@utils/id';

export interface ChatQuestionSectionProps {
  questions: MessageReceiveData[];
  socket: Socket | null;
}

export const ChatQuestionSection = ({ questions, socket }: ChatQuestionSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const { id } = useParams();

  const userId = getStoredId();

  const toggleSection = () => {
    setExpanded((prev) => !prev);
  };

  const handleQuestionDone = (questionId: number) => {
    if (!socket) return;

    socket.emit(CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE, {
      roomId: id,
      userId,
      questionId
    } as MessageSendData);
  };

  return (
    <SectionContainer>
      {questions.length === 0 ? (
        <NoQuestionMessage>아직 질문이 없어요</NoQuestionMessage>
      ) : (
        <>
          <QuestionCard
            key={questions[0].questionId}
            type="host"
            question={questions[0]}
            handleQuestionDone={handleQuestionDone}
          />
          {expanded &&
            questions
              .slice(1)
              .map((question) => (
                <QuestionCard
                  key={question.questionId}
                  type="host"
                  question={question}
                  handleQuestionDone={handleQuestionDone}
                />
              ))}
          <SwipeBtn onClick={toggleSection} />
        </>
      )}
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

const NoQuestionMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.tokenColors['text-weak']};
  font-size: 14px;
  padding: 20px 0;
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
