import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { Agents } from 'views/pages/Agents';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/main',
    element: <MainLayout />,
    children: [
        {
            path: '/main/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/main/agentes',
            element: <Agents />
        }
    ]
};

export default MainRoutes;
