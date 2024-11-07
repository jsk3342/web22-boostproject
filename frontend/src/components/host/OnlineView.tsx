import styled from 'styled-components';

export default function OnlineView() {
  return (
    <LivePlayerActive>
      <p>스트리밍 중...</p>
    </LivePlayerActive>
  );
}

const LivePlayerActive = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;
