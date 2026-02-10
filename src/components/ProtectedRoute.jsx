import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="loading-screen">Verificando acceso...</div>;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && (!profile || !allowedRoles.includes(profile.role))) {
        // Redirect to their respective dashboard if they land in a wrong role path
        if (profile?.role === 'admin') return <Navigate to="/admin" replace />;
        if (profile?.role === 'collaborator') return <Navigate to="/collaborator" replace />;
        if (profile?.role === 'client') return <Navigate to="/client" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
}
