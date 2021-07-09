import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: '/', element: <Login />, exect: true },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        { path: '/dashboard', element: <DashboardApp /> },
        { path: '/user', element: <UserPage /> },
        { path: 'admin', element: <AdminPage /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/dashboard" /> }
      ]
    },
    { path: '/*', element: <Navigate to="/dashboard" replace /> }
  ]);
}
