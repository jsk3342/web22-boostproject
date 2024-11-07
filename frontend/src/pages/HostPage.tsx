import { Setting, Chat, Header } from '@components/host';
import styled from 'styled-components';

export default function HostPage() {
  return (
    <>
      <Header />
      <FlexContainer>
        <Setting />
        <Chat />
      </FlexContainer>
    </>
  );
}

const FlexContainer = styled.div`
  display: flex;
`;
