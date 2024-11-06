import { styled } from 'styled-components';

interface ThumbnailBadgeProps {
  text: string;
  backgroundColor: string;
}

const ThumbnailBadge = ({ text, backgroundColor }: ThumbnailBadgeProps) => {
  return <ThumbnailBadgeContainer backgroundColor={backgroundColor}>{text}</ThumbnailBadgeContainer>;
};

/** "LIVE" 뱃지 */
const LiveBadge = () => <ThumbnailBadge text="LIVE" backgroundColor="red-default" />;

/** "다시보기" 뱃지 */
const ReplayBadge = () => <ThumbnailBadge text="다시보기" backgroundColor="purple-default" />;

/** 라이브 조회수 뱃지 */
const LiveViewCountBadge = ({ count }: { count: number }) => (
  <ThumbnailBadge text={`${count}명`} backgroundColor="rgba(20, 21, 23, 0.9)" />
);

/** 다시보기 조회수 뱃지 */
const ReplayViewCountBadge = ({ count }: { count: number }) => (
  <ThumbnailBadge text={`${count}회 시청된 라이브`} backgroundColor="rgba(20, 21, 23, 0.9)" />
);

export { ThumbnailBadge, LiveBadge, ReplayBadge, LiveViewCountBadge, ReplayViewCountBadge };

const ThumbnailBadgeContainer = styled.div<{ backgroundColor: string }>`
  height: 20px;
  width: fit-content;
  padding: 0 7px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typographyStyle['display-bold12']}
  color: ${({ theme }) => theme.tokenColor['color-white']};

  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor.startsWith('#') || backgroundColor.startsWith('rgb')
      ? backgroundColor
      : theme.tokenColor[backgroundColor] || theme.tokenColor['gray-default']};
`;
