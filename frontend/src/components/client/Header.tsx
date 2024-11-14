import styled from 'styled-components';

const Header = () => {
  return <HeaderContainer />;
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
  z-index: 11000;
`;
