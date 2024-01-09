import { RoutePaths } from '@/assets/constants/paths';
import Chat from '@/pages/Chat';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainCard from '../atoms/MainCard';

const router = createBrowserRouter([
  {
    path: RoutePaths.Home,
    element: <MainCard />,
    children: [
      {
        path: RoutePaths.Home,
        element: <Home />,
      },
      {
        path: RoutePaths.ChatSoureceId,
        element: <Chat />,
      },
      {
        path: RoutePaths.NotFound,
        element: <NotFound />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
