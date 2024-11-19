import styled from 'styled-components';
import Logo from '@assets/logo.gif';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoContainer onClick={() => navigate('/')}>
        <img src={Logo} alt="로고" />
      </LogoContainer>
      STUDIO
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 20px;

  background: ${({ theme }) => theme.tokenColors['surface-default']};
  color: #fff;
  font-weight: bold;
  z-index: 11000;
`;

const LogoContainer = styled.div`
  height: 20px;
  cursor: pointer;

  img {
    height: 100%;
  }
`;
