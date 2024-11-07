import styled from 'styled-components';

export default function Header() {
  return (
    <Container>
      <h2>LiBoo STUDIO </h2>
    </Container>
  );
}

const Container = styled.header`
  background-color: #222222;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
`;
