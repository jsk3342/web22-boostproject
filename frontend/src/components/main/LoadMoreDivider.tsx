import styled from 'styled-components';

interface LoadMoreDividerProps {
  text: string;
  onClick?: () => void;
  component?: React.ReactNode;
}

const MoreButton = ({ text, onClick, component }: LoadMoreDividerProps) => {
  return (
    <MoreButtonBox onClick={onClick}>
      <span>{text}</span>
      {component}
    </MoreButtonBox>
  );
};

const LoadMoreDivider = ({ text, onClick = () => {}, component }: LoadMoreDividerProps) => {
  return (
    <LoadMoreDividerBox>
      <MoreButton text={text} onClick={onClick} component={component} />
    </LoadMoreDividerBox>
  );
};

export default LoadMoreDivider;

const MoreButtonBox = styled.button`
  width: 87px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.tokenColors['text-default']};
  ${({ theme }) => theme.tokenTypographys['display-medium12']}
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
  border: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  border-radius: 15px;
  margin: 0 16px;
  cursor: pointer;
  span {
    padding-left: 5px;
  }
`;

const LoadMoreDividerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:before,
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.tokenColors['surface-alt']};
  }
`;
