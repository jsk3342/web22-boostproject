import ContentLoader from 'react-content-loader';

const RecommendLiveSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      height={370}
      width="100%"
      backgroundColor="#F3F3F3"
      foregroundColor="red"
      gradientRatio={3}
    >
      {/* 아바타나 이미지 영역 */}
      <rect x="0" y="0" rx="5" ry="5" width="70" height="70" fill="url(#wave)" />
      {/* 텍스트 라인들 */}
      <rect x="80" y="17" rx="4" ry="4" width="300" height="13" fill="url(#wave)" />
      <rect x="80" y="40" rx="3" ry="3" width="250" height="10" fill="url(#wave)" />
      <rect x="80" y="60" rx="3" ry="3" width="200" height="10" fill="url(#wave)" />

      {/* 애니메이션을 위한 그라데이션 정의 */}
      <defs>
        <linearGradient id="wave">
          <stop offset="0%" stopColor="#F3F3F3">
            <animate attributeName="offset" values="-2; 1" dur="5s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#ECEBEB">
            <animate attributeName="offset" values="-1.5; 1.5" dur="5s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#F3F3F3">
            <animate attributeName="offset" values="-1; 2" dur="5s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
    </ContentLoader>
  );
};

export default RecommendLiveSkeleton;
