// components/AuthRoute/AuthRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Redirects an authenticated user *away* from sensitive auth routes (like Login or Signup).
 */
const AuthRoute = ({ isAuthenticated, redirectPath = '/', children }) => {
  if (isAuthenticated) {
    // Redirect already authenticated users to the home page
    return <Navigate to={redirectPath} replace />;
  }

  // Otherwise, render the child route (Login or Signup)
  if (children) {
    return children;
  }
  
  return <Outlet />;
};

export default AuthRoute;