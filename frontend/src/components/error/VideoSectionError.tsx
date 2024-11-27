interface VideoSectionErrorProps {
  error: Error;
}

const VideoSectionError = ({ error }: VideoSectionErrorProps) => (
  <div style={{ backgroundColor: 'red' }}>
    <p>에러가 발생했습니다: {error.message}</p>
    <button onClick={() => window.location.reload()}>새로고침</button>
  </div>
);

export default VideoSectionError;
