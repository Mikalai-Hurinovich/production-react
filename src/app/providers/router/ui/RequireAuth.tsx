import { useSelector } from 'react-redux';
import { getUserAuthData, isAdmin, isManager } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { UserRole } from 'entities/User/model/types/user';
import { toast } from 'react-toastify';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const hasAdminRole = useSelector(isAdmin);
    const hasManagerRole = useSelector(isManager);
    const isAdminPanelVisible = hasAdminRole || hasManagerRole;
    if (!auth || !isAdminPanelVisible) {
        toast.info('You are not authorized to visit this page', { position: 'top-center' });
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children;
}
