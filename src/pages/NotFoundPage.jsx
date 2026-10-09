import { Navigate } from 'react-router-dom';

/** Unknown URLs fall back to the home page, like the original demo. */
export default function NotFoundPage() {
  return <Navigate to="/" replace />;
}
