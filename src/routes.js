import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import BioFeedback from './pages/BioFeedback';
import Nutrition from './pages/Nutrition';
import MessocycleTracker from './pages/MessocycleTracker';
import HabitTracker from './pages/HabitTracker';
import Page404 from './pages/Page404';
import ResetPassword from './pages/ResetPassword';
import Periodization from './pages/Periodization';


export default function Router() {
  return useRoutes([
    { path: '/', element: <Login />, exect: true },
    { path: '/reset-password', element: <ResetPassword /> },

    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        { path: '/dashboard', element: <DashboardApp /> },
        { path: '/user', element: <UserPage /> },
        { path: '/admin', element: <AdminPage /> },
        { path: '/admin/:id', element: <AdminPage /> },
        { path: '/bio-feedback', element: <BioFeedback /> },
        { path: '/nutrition', element: <Nutrition /> },
        { path: '/mesocycle-tracker', element: <MessocycleTracker /> },
        { path: '/habit-tracker', element: <HabitTracker /> },
        { path: '/periodization-tracker', element: <Periodization /> },
        { path: '/404', element: <Page404 /> }
      ]
    },
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/404" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '/*', element: <Navigate to="/404" replace /> }
  ]);
}
