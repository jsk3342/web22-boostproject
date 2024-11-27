import styled from 'styled-components';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';
import { MessageReceiveData } from '@type/chat';
import HostIconGreen from '@assets/icons/host_icon_green.svg';

interface ChatAutoScrollProps {
  currentChat?: MessageReceiveData | null;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ChatAutoScroll = ({ currentChat, isAtBottom, scrollToBottom }: ChatAutoScrollProps) => {
  return !isAtBottom ? (
    <ScrollToBottomButton $hasMsg={!!currentChat} onClick={scrollToBottom}>
      {currentChat && (
        <NormalChat
          $isHost={currentChat.owner === 'host'}
          $pointColor={currentChat.owner === 'host' ? '#0ADD91' : currentChat.color}
        >
          {currentChat.owner === 'me' ? (
            <span className="text_point">🧀</span>
          ) : currentChat.owner === 'host' ? (
            <StyledIcon as={HostIconGreen} />
          ) : null}
          <span className="text_point">{currentChat.nickname}</span>
          <span className="chat_message">{currentChat.msg}</span>
        </NormalChat>
      )}
      <StyledChevronDown />
    </ScrollToBottomButton>
  ) : null;
};

export default ChatAutoScroll;

const ScrollToBottomButton = styled.button<{ $hasMsg: boolean }>`
  position: absolute;
  bottom: 5px;
  right: 20px;
  height: 36px;
  width: ${({ $hasMsg }) => ($hasMsg ? '90%' : '36px')};
  display: flex;
  align-items: center;
  justify-content: ${({ $hasMsg }) => ($hasMsg ? 'space-between' : 'center')};
  padding: ${({ $hasMsg }) => ($hasMsg ? '0 4px 0 10px' : '0')};
  background-color: #1d1f22;
  color: ${({ theme }) => theme.tokenColors['text-default']};
  border-radius: ${({ $hasMsg }) => ($hasMsg ? '7px' : '100%')};
  cursor: pointer;
  font-size: 14px;
  z-index: 200;

  &:hover {
    background-color: ${({ theme }) => theme.tokenColors['primary-hover']};
  }
`;

const StyledChevronDown = styled(ChevronDownIcon)`
  width: 28px;
  height: 28px;
`;

const NormalChat = styled.div<{ $isHost: boolean; $pointColor: string }>`
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ $isHost, theme }) => ($isHost ? theme.tokenColors['color-accent'] : theme.tokenColors['color-white'])};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;

  .chat_message {
    color: ${({ $isHost }) => $isHost && '#82e3c4'};
    flex: 1 1;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .text_point {
    color: ${({ $pointColor }) => $pointColor};
    margin-right: 5px;
    ${({ theme }) => theme.tokenTypographys['display-bold14']};
  }
`;

const StyledIcon = styled.svg`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0 5px -3px 0;
`;
