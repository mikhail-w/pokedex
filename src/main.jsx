import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage.jsx';
import RandPokemonPage from './pages/RandPokemonPage.jsx';
import PokemonPage from './pages/PokemonPage.jsx';
import MyTeamPage from './pages/MyTeamPage.jsx';
import PokemonListPage from './pages/PokemonListPage.jsx';
import PokeFlipPage from './pages/PokeFlipPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="random/:randomID?" element={<RandPokemonPage />} />
          <Route path="pokemon/:name" element={<PokemonPage />} />
          <Route path="team" element={<MyTeamPage />} />
          <Route path="list" element={<PokemonListPage />} />
          <Route path="flip" element={<PokeFlipPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  </ChakraProvider>
);
