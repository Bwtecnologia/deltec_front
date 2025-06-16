import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import Login from 'views/pages/authentication/authentication2/Login2';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <Login />
};

export default AuthenticationRoutes;
