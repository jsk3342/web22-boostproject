import styled from 'styled-components';
import Player from './Player';
import SettingForm from './SettingForm';
import { useBroadcastStatusPolling } from '@apis/queries/host/useBroadcastStatusPolling';
import { getSessionKey } from '@utils/streamKey';

export default function Setting() {
  const { data: onStreaming } = useBroadcastStatusPolling(getSessionKey());

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
