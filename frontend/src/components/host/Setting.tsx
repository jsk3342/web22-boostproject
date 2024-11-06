import styled from 'styled-components';
import Player from './Player';
import SettingForm from './SettingForm';

export default function Setting() {
  return (
    <Container>
      <Player />
      <SettingForm />
    </Container>
  );
}

const Container = styled.main`
  flex: 7;
`;
