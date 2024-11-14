import styled from 'styled-components';
import Player from './Player';
import SettingForm from './SettingForm';
import { useState } from 'react';

export default function Setting() {
  const [onStreaming, setOnStreaming] = useState(false);
  const toggleStreaming = () => {
    setOnStreaming((prev) => !prev);
  };

  return (
    <Container>
      <Player onStreaming={onStreaming} />
      <SettingForm toggleStreaming={toggleStreaming} />
    </Container>
  );
}

const Container = styled.main`
  flex: 1;
  overflow-y: auto;
`;
