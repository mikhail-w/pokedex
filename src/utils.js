export const colors = {
  grass: '#a8ff98',
  poison: '#d6a2e4',
  normal: '#dcdcdc',
  fire: '#ffb971',
  water: '#8cc4e2',
  electric: '#ffe662',
  ice: '#8cf5e4',
  fighting: '#da7589',
  ground: '#e69a74',
  flying: '#bbc9e4',
  // psychic: '#ffa5da',
  psychic: '#a29bfe',
  bug: '#bae05f',
  rock: '#C9BB8A',
  ghost: '#8291e0',
  dark: '#8e8c94',
  dragon: '#88a2e8',
  steel: '#9fb8b9',
  // steel: '#B8B8D0',
  fairy: '#fdb9e9',
};

// Modal Overlay Background Colors
export const bgs = {
  grass: 'rgba(120, 200, 80, 0.5)',
  poison: 'rgba(160, 64, 160, 0.5)',
  normal: ' rgba(168, 168, 120, 0.5)',
  fire: 'rgb(240, 128, 48, 0.5)',
  water: 'rgba(104, 144, 240, 0.5)',
  electric: 'rgba(248, 208, 48, 0.5)',
  ice: 'rgba(152, 216, 216, 0.5)',
  fighting: ' rgba(192, 48, 40, 0.5)',
  ground: 'rgba(224, 192, 104, 0.5)',
  flying: 'rgba(168, 144, 240, 0.5)',
  psychic: 'rgba(248, 88, 136, 0.5)',
  bug: 'rgba(168, 184, 32, 0.5)',
  rock: 'rgba(184, 160, 56, 0.5)',
  ghost: 'rgba(112, 88, 152, 0.5)',
  dark: 'rgba(58, 45, 38, 0.5)',
  dragon: 'rgba(112, 56, 248, 0.5)',
  steel: 'rgba(184, 184, 208, 0.5)',
  fairy: 'rgba(238, 153, 172, 0.5)',
};

export const releasePokemon = (myTeam, id) => {
  // console.log('----------------------------------------------\n');
  // console.log('***UTILS\n-----REMOVING POKEMON FROM myTeam');
  let res = myTeam.filter(member => {
    return member.card.id != id;
  });
  return res;
};

export const catchPokemon = (myTeam, id) => {
  console.log('\n\n=================== INSIDE UTIL ===================\n');
  console.log(`     ADDING POKEMON WITH ID ${id} TO myTeam`);
  console.log('=================== EXIT UTIL =====================\n\n');
  return [...myTeam, { id }];
};

export const isInTeam = (myTeam, card) => {
  // console.log('\n\n=================== INSIDE UTIL ===================\n');
  // console.log('** CHECK IF IN myTeam:', myTeam);
  // console.log('Current POKEMON ID:', card.id);

  let res = myTeam.filter(member => {
    return member.card.id === card.id;
  });
  if (res.length == 1) {
    // console.log(`POKEMON ID ${card.id} IS IN TEAM!!!`);
    // console.log('=================== EXIT UTIL ===================\n\n');
    return true;
  }
  // console.log(`POKEMON ID ${card.id} IS NOT IN TEAM!!!`);
  // console.log('=================== EXIT UTIL ===================\n\n');
  return false;
};

export const buildTeam = async teamResponse => {
  let urls = [];
  const teamMasterList = teamResponse.data.pokemon;
  let teamMasterListSize = teamMasterList.length;

  for (let i = 0; i < 5; i++) {
    let idx = getChoice(teamMasterListSize);
    let teamMember = teamMasterList[idx];
    let url = `https://pokeapi.co/api/v2/pokemon/${teamMember.pokemon.name}`;
    urls.push(url.toString());
  }

  await Promise.all(
    urls.map(async url => {
      return (await axios.get(url)).data;
    })
  ).then(values => {
    return values;
  });
};

export function getChoice(max) {
  return Math.floor(Math.random() * max);
}

export function capitalize(string) {
  if (typeof string == 'object') {
    let res = string.map(
      (val, idx) =>
        val.charAt(0).toUpperCase() +
        val.slice(1) +
        (idx != string.length - 1 ? ', ' : '')
    );
    return res;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getType(list) {
  const typeList = [];
  list.forEach(ele => {
    typeList.push(ele.type.name);
  });
  // console.log(typeList);
  return typeList;
}

export function getAbilities(list) {
  const abilityList = [];
  list.forEach(ele => {
    abilityList.push(ele.ability.name);
  });
  makeString(abilityList);
  return abilityList;
}

export function getMoves(list) {
  const movesList = [];
  list.forEach(ele => {
    movesList.push(ele.move.name);
  });
  makeString(movesList);
  return movesList;
}

export function makeString(list) {
  let newString = '';

  for (let i = 0; i < list.length; i++) {
    newString += list[i] + (i != list.length - 1 ? ', ' : '');
  }
  return newString;
}

export const getBackgroundColors = type => {
  if (type.length === 2) {
    return [colors[type[0]], colors[type[1]]];
  }
  return [colors[type[0]], colors[type[0]]];
};
