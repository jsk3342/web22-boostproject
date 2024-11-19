import styled, { css } from 'styled-components';
import SpeechBubbleIcon from '@assets/icons/speech-bubble.svg';
import QuestionIcon from '@assets/icons/question.svg';
import SendIcon from '@assets/icons/send.svg';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { CHATTING_SOCKET_SEND_EVENT, CHATTING_TYPES } from '@constants/chat';
import { ChattingTypes, MessageSendData } from '@type/chat';

interface ChatInputProps {
  socket: Socket | null;
}

export const ChatInput = ({ socket }: ChatInputProps) => {
  const [hasInput, setHasInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [msgType, setMsgType] = useState<ChattingTypes>(CHATTING_TYPES.NORMAL);
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { id } = useParams();

  const handleMsgType = () => {
    setMsgType(msgType === CHATTING_TYPES.NORMAL ? CHATTING_TYPES.QUESTION : CHATTING_TYPES.NORMAL);
  };

  const handleMessageSend = () => {
    if (!socket || !message.trim()) return;

    const eventName =
      msgType === CHATTING_TYPES.NORMAL ? CHATTING_SOCKET_SEND_EVENT.NORMAL : CHATTING_SOCKET_SEND_EVENT.QUESTION;

    socket.emit(eventName, {
      roomId: id,
      userId: '테스트용',
      msg: message
    } as MessageSendData);

    setMessage('');
    setHasInput(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setHasInput(e.target.value.length > 0);
  };

  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = '14px';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight - 5}px`;
      }
    };

    if (textareaRef.current) {
      textareaRef.current.addEventListener('input', handleResize);
      handleResize();
    }

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener('input', handleResize);
      }
    };
  }, []);

  const handleBlur = () => {
    if (textareaRef.current) {
      setHasInput(textareaRef.current.value.length > 0);
      setIsFocused(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <ChatInputWrapper $hasInput={hasInput} $isFocused={isFocused}>
      <InputBtn aria-label={msgType} onClick={handleMsgType}>
        {msgType === CHATTING_TYPES.NORMAL ? (
          <StyledIcon as={SpeechBubbleIcon} />
        ) : msgType === CHATTING_TYPES.QUESTION ? (
          <StyledIcon as={QuestionIcon} />
        ) : (
          <StyledIcon as={SendIcon} />
        )}
      </InputBtn>

      <ChatInputArea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        placeholder={`${
          msgType === CHATTING_TYPES.NORMAL ? '채팅' : msgType === CHATTING_TYPES.QUESTION ? '질문' : '공지'
        }을 입력해주세요`}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <InputBtn aria-label="전송" onClick={handleMessageSend}>
        <StyledIcon as={SendIcon} />
      </InputBtn>
    </ChatInputWrapper>
  );
};

export default ChatInput;

const ChatInputWrapper = styled.div<{ $hasInput: boolean; $isFocused: boolean }>`
  min-height: 20px;
  display: flex;
  padding: 5px 10px;
  gap: 10px;
  border: 3px solid ${({ theme }) => theme.tokenColors['text-weak']};
  border-radius: 7px;
  background-color: transparent;

  ${({ $isFocused, $hasInput }) =>
    !$hasInput &&
    !$isFocused &&
    css`
      border: 3px solid transparent;
      background-color: #373a3f;
    `}
`;

const ChatInputArea = styled.textarea`
  width: 100%;
  max-height: 40px;
  scrollbar-width: none;
  resize: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-medium16']}
  background-color: transparent;
`;

const InputBtn = styled.button`
  display: flex;
  height: 25px;
  align-items: center;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  cursor: pointer;
`;

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
