import styled from 'styled-components';
import { useState } from 'react';
import playerLoading from '@assets/player_loading.gif';
import { usePortal } from '@hooks/usePortal';
import SettingInfo from './SettingInfo';

interface ContainerProps {
  onStreaming: boolean;
}

export default function Player() {
  const [onStreaming, setOnStreaming] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const createPortal = usePortal();

  const toggleStreaming = () => {
    // setOnStreaming((prev) => !prev);
    setShowModal((prev) => !prev);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container onStreaming={onStreaming}>
        <LivePlayerInner>
          <PlayerTitle>라이브 스트리밍을 시작하려면 스트리밍 소프트웨어를 연결하세요.</PlayerTitle>
          <PlayerDescription>방송 시작 및 종료는 스트리밍 소프트웨어에서 가능합니다.</PlayerDescription>
          <PlayerWrapper>
            <Button type="button" onClick={toggleStreaming}>
              스트리밍 설정 안내
            </Button>
            {showModal && createPortal(<SettingInfo onClose={onClose} />)}
          </PlayerWrapper>
        </LivePlayerInner>
      </Container>
      <StatusContainer>
        <StatusIcon onStreaming={onStreaming} />
        {onStreaming ? '온라인' : '오프라인'}
      </StatusContainer>
    </>
  );
}

const Container = styled.div<ContainerProps>`
  background: ${({ onStreaming }) => (onStreaming ? '#000' : `url(${playerLoading}) no-repeat center / cover`)};
  width: 100%;
  padding-top: 56.25%;
  position: relative;
`;

const LivePlayerInner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const PlayerTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

const PlayerDescription = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 123px;
  height: 32px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #dddddd;
  font-size: 11.4375px;
  color: #697183;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusContainer = styled.strong`
  height: 40px;
  background: #222222;
  border-width: 1px 0;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const StatusIcon = styled.i<ContainerProps>`
  width: 8px;
  height: 8px;
  background: ${({ onStreaming }) => (onStreaming ? 'red' : 'rgba(255, 255, 255, 0.5)')};
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: -25%;
    right: -25%;
    top: -2px;
    bottom: -2px;
    border: 2px solid #ffffff;
    border-radius: 6px;
  }
`;

const Txt = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
`;
