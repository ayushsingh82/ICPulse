import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Layout from '../components/Layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]); 