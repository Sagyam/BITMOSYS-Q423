import Crypto from '@/pages/Crypto.tsx';
import Home from '@/pages/Home.tsx';
import NotFound from '@/pages/NotFound.tsx';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/crypto',
    element: <Crypto />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
