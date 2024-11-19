import styled from 'styled-components';
import Player from './Player';
import SettingForm from './SettingForm';
import { useBroadcastStatusPolling } from '@apis/queries/host/useBroadcastStatusPolling';

export default function Setting() {
  const { data: onStreaming } = useBroadcastStatusPolling();

  return (
    <Container>
      <Player onStreaming={onStreaming} />
      <SettingForm />
    </Container>
  );
}

const Container = styled.main`
  flex: 1;
  overflow-y: auto;
`;
