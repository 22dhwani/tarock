import { Navigate } from 'react-router-dom';

function AuthGuard(props) {
    if (!props.authenticated) {
        return <Navigate to="/" replace />;
    }
    return props.children;
};

export default AuthGuard;