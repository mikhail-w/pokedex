import { createHashRouter } from 'react-router-dom';
import React, { lazy } from 'react';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import RandPokemonPage from './pages/RandPokemonPage.jsx';
import PokemonPage from './pages/PokemonPage.jsx';
import MyTeamPage from './pages/MyTeamPage.jsx';
import PokemonListPage from './pages/PokemonListPage.jsx';
import PokeFlipPage from './pages/PokeFlipPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/random/:randomID?',
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
      {
        path: '/flip/',
        element: <PokeFlipPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
