import styled from 'styled-components';

const MainHeader = () => {
  return <HeaderContainer>MainHeader</HeaderContainer>;
};

export default MainHeader;

const HeaderContainer = styled.div`
  height: 60px;
  min-width: 800px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 11000;
  background: ${({ theme }) => theme.tokenColor['surface-default']};
  color: ${({ theme }) => theme.tokenColor['text-strong']};
`;
