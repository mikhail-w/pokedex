import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { getChoice } from './utils';

function App() {
  const [team, setTeam] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [randomChoice, setRandomChoice] = useState(getChoice(1025));

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
          randomChoice,
          setRandomChoice,
        }}
      />
    </>
  );
}

export default App;
