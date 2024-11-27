interface RecommendLiveErrorProps {
  error: Error;
}

const RecommendLiveError = ({ error }: RecommendLiveErrorProps) => (
  <div style={{ backgroundColor: 'red' }}>
    <p>에러가 발생했습니다: {error.message}</p>
    <button onClick={() => window.location.reload()}>새로고침</button>
  </div>
);

export default RecommendLiveError;
