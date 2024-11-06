import { styled } from 'styled-components';

interface ThumbnailBadgeProps {
  text: string;
  backgroundColor: string;
  size?: 'small' | 'large';
}

const ThumbnailBadge = ({ text, backgroundColor, size = 'small' }: ThumbnailBadgeProps) => {
  return (
    <ThumbnailBadgeContainer $backgroundColor={backgroundColor} $size={size}>
      {text}
    </ThumbnailBadgeContainer>
  );
};

/** "LIVE" 뱃지 */
const LiveBadge = () => <ThumbnailBadge text="LIVE" backgroundColor="red-default" size="small" />;
const LiveBadgeLarge = () => <ThumbnailBadge text="LIVE" backgroundColor="red-default" size="large" />;

/** "다시보기" 뱃지 */
const ReplayBadge = () => <ThumbnailBadge text="다시보기" backgroundColor="purple-default" size="small" />;

/** 라이브 조회수 뱃지 */
const LiveViewCountBadge = ({ count }: { count: number }) => (
  <ThumbnailBadge text={`${count}명`} backgroundColor="rgba(20, 21, 23, 0.9)" size="small" />
);

/** 다시보기 조회수 뱃지 */
const ReplayViewCountBadge = ({ count }: { count: number }) => (
  <ThumbnailBadge text={`${count}회 시청된 라이브`} backgroundColor="rgba(20, 21, 23, 0.9)" size="small" />
);

export { ThumbnailBadge, LiveBadge, LiveBadgeLarge, ReplayBadge, LiveViewCountBadge, ReplayViewCountBadge };

const ThumbnailBadgeContainer = styled.div<{ $backgroundColor: string; $size: 'small' | 'large' }>`
  height: ${({ $size }) => ($size === 'large' ? '25px' : '20px')};
  width: fit-content;
  padding: ${({ $size }) => ($size === 'large' ? '0 12px' : '0 7px')};
  ${({ theme, $size }) => theme.typographyStyle[$size === 'large' ? 'display-bold16' : 'display-bold12']}
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.tokenColor['color-white']};

  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor.startsWith('#') || $backgroundColor.startsWith('rgb')
      ? $backgroundColor
      : theme.tokenColor[$backgroundColor] || theme.tokenColor['gray-default']};
`;
