import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [team, setTeam] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  return (
    <>
      <NavBar myTeam={myTeam} isLoading={isLoading} />
      <Outlet
        context={{
          team,
          setTeam,
          myTeam,
          setMyTeam,
          disabled,
          setDisabled,
          isLoading,
          setIsLoading,
          pokemon,
          setPokemon,
        }}
      />
    </>
  );
}

export default App;
