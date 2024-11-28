import ContentLoader from 'react-content-loader';

const RecommendLiveSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      height={370}
      width="100%"
      backgroundColor="#1a1a1a"
      foregroundColor="#363636"
      gradientRatio={2}
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" fill="url(#wave)" />
    </ContentLoader>
  );
};

export default RecommendLiveSkeleton;
