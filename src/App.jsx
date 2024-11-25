import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { getRandomID } from './utils';

function App() {
  const [team, setTeam] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [valid, setValid] = useState(false);
  const [passed, setPassed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [randomID, setrandomID] = useState(getRandomID(999));

  return (
    <>
      <NavBar myTeam={myTeam} isLoading={isLoading} />
      <Outlet
        context={{
          team,
          setTeam,
          passed,
          setPassed,
          myTeam,
          valid,
          setValid,
          setMyTeam,
          disabled,
          setDisabled,
          isLoading,
          setIsLoading,
          pokemon,
          setPokemon,
          randomID,
          setrandomID,
        }}
      />
    </>
  );
}

export default App;
