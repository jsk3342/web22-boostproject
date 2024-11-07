import styled from 'styled-components';
import SettingInfo from './SettingInfo';
import { usePortal } from '@hooks/usePortal';
import { useModal } from '@hooks/useModal';
import playerLoading from '@assets/player_loading.gif';
import StreamingView from './StreamingView';
import StreamingStatus from './StreamingStatus';

interface PlayerProps {
  onStreaming: boolean;
}

export default function Player({ onStreaming }: PlayerProps) {
  const { isOpen, closeModal, openModal } = useModal();
  const createPortal = usePortal();

  return (
    <>
      <Container onStreaming={onStreaming}>
        <StreamingView onStreaming={onStreaming} openModal={openModal} />
      </Container>
      <StreamingStatus onStreaming={onStreaming} />
      {isOpen && createPortal(<SettingInfo closeModal={closeModal} />)}
    </>
  );
}

const Container = styled.div<{ onStreaming: boolean }>`
  background: ${({ onStreaming }) => (onStreaming ? '#000' : `url(${playerLoading}) no-repeat center / cover`)};
  width: 100%;
  padding-top: 56.25%;
  position: relative;
`;
