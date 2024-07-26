import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import GetRandomPage from './pages/GetRandomPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/random/',
        element: <GetRandomPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
