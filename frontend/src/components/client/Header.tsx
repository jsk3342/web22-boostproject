import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return <HeaderContainer />;
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  height: 60px;
  padding: 0 60px;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
`;
