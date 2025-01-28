import { createBrowserRouter } from 'react-router-dom';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            }
        ]
    }
]); 