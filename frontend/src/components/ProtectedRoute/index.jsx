import AuthGuard from '../AuthGuard';
import { useContext} from "react";
import { GlobalContext } from '../../context';

function ProtectedRoute({component}) {
    const { userData } = useContext(GlobalContext);
  return (
        <AuthGuard authenticated={userData.isAuthorized}>
            {component}
        </AuthGuard>
  );
}

export default ProtectedRoute;
