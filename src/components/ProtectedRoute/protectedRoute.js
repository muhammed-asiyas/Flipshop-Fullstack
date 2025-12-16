import { Navigate, Outlet} from 'react-router-dom';

/**
 * A wrapper component that checks if a user is authenticated.
 * If authenticated, it renders the child routes via <Outlet /> or the `children` prop.
 * If not authenticated, it redirects to a login page.
 *
 * @param {object} props
 * @param {boolean} props.isAuthenticated - A boolean flag indicating user authentication status.
 * @param {string} [props.redirectPath='/login'] - The path to redirect to if not authenticated.
 * @param {React.ReactNode} [props.children] - Child components to render (alternative to Outlet).
 */
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login', children }) => {
  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to={redirectPath} replace />;
  }

  // If children are passed, render them directly
  if (children) {
    return children
  }
  
  // Otherwise, use <Outlet /> for nested routes
  return <Outlet />;
};

export default ProtectedRoute;