import styled from 'styled-components';

export default function Header() {
  return (
    <Container>
      <h2>LiBoo STUDIO </h2>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: #222222;
  color: #fff;
  font-weight: bold;
  z-index: 11000;
`;
