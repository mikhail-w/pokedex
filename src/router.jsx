import { createBrowserRouter } from 'react-router-dom';
import React, { lazy } from 'react';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import RandPokemonPage from './pages/RandPokemonPage.jsx';
import PokemonPage from './pages/PokemonPage.jsx';
import MyTeamPage from './pages/MyTeamPage.jsx';
import PokemonListPage from './pages/PokemonListPage.jsx';
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
        element: <RandPokemonPage />,
      },
      {
        path: '/pokemon/:name',
        element: <PokemonPage />,
      },
      {
        path: '/team/',
        element: <MyTeamPage />,
      },
      {
        path: '/list/',
        element: <PokemonListPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
