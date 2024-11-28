'use client';
import '../assets/styles/NavBar.css';
import pokeball from '../assets/images/pokeballs/pokeball.png';

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
  useMediaQuery,
} from '@chakra-ui/react';

function NavBar({ myTeam }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const inputRef = useRef();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const pokemonName = inputRef.current?.value.trim();
    if (pokemonName) {
      setSearch('');
      navigate(`/pokemon/${pokemonName}`);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const searchButtonColor = useColorModeValue('#396bba', '#e53e3e');
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const SearchBar = (
    <Box maxW="250px" ml={2}>
      <InputGroup borderRadius={50} size="sm">
        <InputLeftElement />
        <Input
          type="text"
          placeholder="Search Pokemon..."
          border="1px solid #949494"
          onChange={e => setSearch(e.target.value)}
          ref={inputRef}
          value={search}
          onKeyPress={handleKeyPress}
        />
        <InputRightAddon p={0} border="none">
          <Button
            size="sm"
            onClick={handleSubmit}
            borderLeftRadius={0}
            border="1px solid #949494"
            colorScheme="red"
            bg={searchButtonColor}
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Box>
  );

  return (
    <Box className="navBar" bg={bgColor} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo Section */}
        <Link className="link" to="/">
          <Box className="logo-title">
            P<CgPokemon className="inline-img" />
            KEDEX
          </Box>
        </Link>

        {/* Right Section */}
        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            {!isMobile && SearchBar}

            {/* Theme Toggle */}
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            {/* User Menu */}
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
                mr={2}
              >
                <Avatar size="sm" src={pokeball} />
              </MenuButton>
              <MenuList alignItems="center">
                <Center>
                  <Avatar src={pokeball} />
                </Center>
                <Center>
                  <p>Menu</p>
                </Center>
                <MenuDivider />
                {isMobile && (
                  <>
                    <Box p={2}>{SearchBar}</Box>
                    <MenuDivider />
                  </>
                )}
                <CustomMenuItem to="/">Home</CustomMenuItem>
                <CustomMenuItem to="/random/">
                  Get Random Pokemon
                </CustomMenuItem>
                <CustomMenuItem to="/list/">Pokemon List</CustomMenuItem>
                <CustomMenuItem to="/team">
                  My Team #{myTeam.length}
                </CustomMenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}

const CustomMenuItem = ({ to, children }) => (
  <MenuItem>
    <Link className="link" to={to}>
      {children}
    </Link>
  </MenuItem>
);

export default NavBar;
