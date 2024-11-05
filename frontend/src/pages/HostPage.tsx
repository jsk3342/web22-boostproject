import { HostSetting, Chat, Header } from '@components/host';
import styled from 'styled-components';

export default function HostPage() {
  return (
    <>
      <Header />
      <FlexContainer>
        <HostSetting />
        <Chat />
      </FlexContainer>
    </>
  );
}

const FlexContainer = styled.div`
  display: flex;
`;
