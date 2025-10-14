import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Mientras este cargando, hay que esperar que AuthProvider termine
  if (loading) return null;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
