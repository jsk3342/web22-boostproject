import { getStoredId } from '@utils/id';
import { Navigate } from 'react-router-dom';

export default function HostRedirect() {
  const userId = getStoredId();

  return <Navigate to={`/host/${userId}`} replace />;
}
