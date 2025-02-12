import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Card,
  CardBody,
  Heading,
  Divider,
  Badge,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import backendApiClient from '../services/backendApiClient';
import Loading from '../components/Loading';
import { getType } from '../utils';
import { getPokemonById } from '../services/pokemonService';
import defaultImage from '../assets/images/default.png';
import DemoCard from '../components/DemoCard';
import { useColorModeValue } from '@chakra-ui/react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const headingColor = useColorModeValue('blue.900', 'white');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const response = await backendApiClient.getUserTeam(token);

        setUserData({
          username: username || 'Trainer',
          teamCount: response?.current_team?.length || 0,
          joinDate: new Date().toLocaleDateString(),
        });

        if (response?.current_team?.length > 0) {
          const pokemonResponses = await Promise.all(
            response.current_team.map(id => getPokemonById(id))
          );
          setPokemonData(pokemonResponses.filter(pokemon => pokemon !== null));
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        setUserData({
          username: username || 'Trainer',
          teamCount: 0,
          joinDate: new Date().toLocaleDateString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Box h="80vh" display="flex" alignItems="center" justifyContent="center">
        <Loading />
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      // bgGradient="linear(to-b, green.200, green.100, green.50)"
      pt={'70px'}
    >
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Profile Header */}
          <Card>
            <Box
              bgGradient="linear(to-r, yellow.400, yellow.300, yellow.400)"
              p={1}
              borderRadius="xl"
            >
              <Box bg="blue.600" p="2px" borderRadius="xl">
                <Box
                  bgGradient="linear(to-r, yellow.400, yellow.300, yellow.400)"
                  p={8}
                  borderRadius="xl"
                >
                  <VStack spacing={4}>
                    <Image
                      src={defaultImage}
                      alt="Profile"
                      width="150px"
                      height="150px"
                      objectFit="cover"
                    />
                    <Heading color="blue.900" size="lg">
                      {userData?.username}'s Profile
                    </Heading>
                    <Badge
                      colorScheme="purple"
                      color={'black'}
                      fontSize="md"
                      px={4}
                      py={1}
                      borderRadius="full"
                    >
                      Pokémon Trainer
                    </Badge>
                  </VStack>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Stats Section */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              {
                label: 'Team Size',
                value: userData?.teamCount || 0,
              },
              {
                label: 'Trainer Since',
                value: userData?.joinDate || '-',
              },
              {
                label: 'Team Power',
                value: pokemonData.reduce(
                  (sum, pokemon) => sum + (pokemon?.base_experience || 0),
                  0
                ),
              },
            ].map((stat, index) => (
              <Card key={index}>
                <CardBody>
                  <StatGroup>
                    <Stat>
                      <StatLabel color={headingColor} fontWeight="semibold">
                        {stat.label}
                      </StatLabel>
                      <StatNumber color="yellow.500">{stat.value}</StatNumber>
                    </Stat>
                  </StatGroup>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Current Team Section */}
          <Card>
            <CardBody>
              <Heading size="md" mb={4} color={headingColor}>
                Current Team
              </Heading>
              <Divider mb={10} />

              {pokemonData.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                  {pokemonData.map(
                    pokemon =>
                      pokemon && (
                        // <PokemonCard
                        //   key={pokemon.id}
                        //   card={pokemon}
                        //   src={
                        //     pokemon.sprites?.other?.['official-artwork']
                        //       ?.front_default
                        //   }
                        //   src2={pokemon.sprites?.other?.showdown?.front_default}
                        //   name={pokemon.name}
                        //   type={getType(pokemon.types)}
                        //   id={pokemon.id}
                        // />
                        <DemoCard
                          key={pokemon.id}
                          id={pokemon.id}
                          name={pokemon.name}
                          type={getType(pokemon.types)}
                          isCaught={'True'}
                          imageUrl={
                            pokemon.sprites?.other?.['official-artwork']
                              ?.front_default
                          }
                        ></DemoCard>
                      )
                  )}
                </SimpleGrid>
              ) : (
                <Text textAlign="center" color="gray.500">
                  No Pokémon in team yet
                </Text>
              )}
            </CardBody>
          </Card>

          {/* Navigation Buttons */}
          <HStack spacing={4} justify="center">
            <Button
              colorScheme="blue"
              onClick={() => navigate('/team')}
              size="lg"
              borderRadius="full"
            >
              Manage Team
            </Button>
            <Button
              colorScheme="green"
              onClick={() => navigate('/random')}
              size="lg"
              borderRadius="full"
            >
              Catch Pokémon
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProfilePage;
