import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({
  isAuthorized,
  children
}: {
  isAuthorized: boolean;
  children: any;
}) => {
  if (!isAuthorized) {
    return <Navigate to='/login' />;
  }

  return children;
};
