import styled from 'styled-components';
import ThreePointIcon from '@assets/icons/three-point.svg';
import OutIcon from '@assets/icons/out.svg';

interface ChatHeaderProps {
  outBtnHandler?: () => void;
}

export const ChatHeader = ({ outBtnHandler }: ChatHeaderProps) => {
  return (
    <ChatHeaderContainer>
      <HeaderBtn onClick={outBtnHandler}>
        <StyledIcon as={OutIcon} />
      </HeaderBtn>
      <h2>채팅</h2>
      <HeaderBtn>
        <StyledIcon as={ThreePointIcon} />
      </HeaderBtn>
    </ChatHeaderContainer>
  );
};
export default ChatHeader;

const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;
  border-top: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  color: ${({ theme }) => theme.tokenColors['color-white']};
  ${({ theme }) => theme.tokenTypographys['display-bold20']};
`;

const HeaderBtn = styled.button`
  display: flex;
  color: ${({ theme }) => theme.tokenColors['text-bold']};
  cursor: pointer;
`;

const StyledIcon = styled.svg`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
