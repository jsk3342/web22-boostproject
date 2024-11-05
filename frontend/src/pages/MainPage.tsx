import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>main page~~</h1>
      <button onClick={() => navigate('/host')}>호스트 페이지로 이동</button>
      <button onClick={() => navigate('/live')}>라이브 페이지로 이동</button>
    </>
  );
}
