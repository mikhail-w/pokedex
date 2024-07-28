'use client';
import '../assets/styles/NavBar.css';
import pokeball from '../assets/images/pokeballs/pokeball.png';
import Loading from './Loading';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { CgPokemon } from 'react-icons/cg';

import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from '@chakra-ui/react';

function NavBar({ myTeam, isLoading }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const inputRef = useRef();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const pokemonName = inputRef.current.value;
    setSearch('');

    return isLoading ? <Loading /> : navigate(`/pokemon/${pokemonName}`);
  }

  return (
    <>
      <Box
        className="navBar"
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link className="link" to="/">
            <Box className="logo-title">
              P
              <CgPokemon className="inline-img" />
              KEDEX
            </Box>
          </Link>

          <Flex alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Box maxW={'250px'} marginLeft={'10px'}>
                <InputGroup borderRadius={50} size="sm">
                  <InputLeftElement />
                  <Input
                    type="text"
                    placeholder="Search Pokemon..."
                    border="1px solid #949494"
                    onChange={e => setSearch(e.target.value)}
                    ref={inputRef}
                    value={search}
                  />
                  <InputRightAddon p={0} border="none">
                    <Button
                      size="sm"
                      onClick={handleSubmit}
                      borderLeftRadius={0}
                      borderRightRadius={3.3}
                      border="1px solid #949494"
                      colorScheme="red"
                      backgroundColor={useColorModeValue('#396bba', '#e53e3e')}
                    >
                      Search
                    </Button>
                  </InputRightAddon>
                </InputGroup>
              </Box>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  marginRight={'10px'}
                >
                  <Avatar size={'sm'} src={pokeball} />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar src={pokeball} />
                  </Center>
                  <br />
                  <Center>
                    <p>Menu</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {/* <MenuItem>Home</MenuItem> */}
                  <MenuItem>
                    <Link className="link" to="/">
                      Home
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link className="link" to="/random/">
                      Get Random Pokemon
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link className="link" to="/list/">
                      Pokemon List
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link className="link" to="/team">
                      My Team #{myTeam.length}
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default NavBar;
