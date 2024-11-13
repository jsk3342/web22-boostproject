import styled from 'styled-components';

export const LayerPopup = () => {
  return (
    <LayerPopupContainer>
      <LayerPopupWrapper>
        <LayerPopupButton>📢 채팅 규칙</LayerPopupButton>
      </LayerPopupWrapper>
    </LayerPopupContainer>
  );
};
export default LayerPopup;

const LayerPopupContainer = styled.div`
  width: 262px;
  background-color: #373a3f;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px #3c444b3c;
  padding: 5px;
  gap: 1px;
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
  color: ${({ theme }) => theme.tokenColors['color-white']};
`;

const LayerPopupWrapper = styled.div`
  :hover {
    background-color: #5e5e61;
  }
`;

const LayerPopupButton = styled.button`
  width: 100%;
  text-align: start;
  padding: 8px;
  border-radius: 9px;
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
  color: ${({ theme }) => theme.tokenColors['color-white']};
  cursor: pointer;
`;
