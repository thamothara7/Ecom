import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
    const isAdminAuthenticated = localStorage.getItem('adminToken') === 'mock-token-123';

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
