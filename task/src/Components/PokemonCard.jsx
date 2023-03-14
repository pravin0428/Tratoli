import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Image,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

import ButtonStyle from "./ButtonStyle";
const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const backgroundColor = useColorModeValue("#202020", "gray.800");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [name]);

  const boxShadowColor = useColorModeValue("#C48494", "#4A5568");
  const hoverBoxShadowColor = useColorModeValue("#FBD38D", "#ECC94B");
  return (
    <Box
      bg={backgroundColor}
      //   boxShadow="lg"
      rounded="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={handleOpenModal}
      boxShadow={`0px 0px 0px 3px ${boxShadowColor}`}
      transition="box-shadow 0.3s ease-in-out"
      _hover={{
        boxShadow: `0px 0px 0px 3px ${hoverBoxShadowColor}`,
      }}
    >
      {pokemon && (
        <>
          <Text fontWeight="bold" fontSize="2xl" color="white">
            {pokemon.name}
          </Text>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            w="100%"
            h="auto"
          />
          <Box p="4">
            <Box
              // border="2px solid red"
              display="flex"
              justifyContent="space-around"
            >
              {pokemon.types.map((type) => (
                <ButtonStyle key={uuidv4()} name={type.type.name} />
              ))}
            </Box>
          </Box>
        </>
      )}
      {loading && (
        <Box p="4">
          <Text fontWeight="bold" fontSize="2xl" mb="2">
            Loading...
          </Text>
        </Box>
      )}
      {error && (
        <Box p="4">
          <Text fontWeight="bold" fontSize="2xl" mb="2">
            Something went wrong...
          </Text>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{pokemon && pokemon.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center" backgroundColor="#6B6B53">
            {pokemon && (
              <>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  w="50%"
                  h="auto"
                  mx="auto"
                  mb="4"
                />

                <TableContainer boxShadow={"xl"} mt="10px" mb="25px">
                  <Table variant="striped" backgroundColor="black">
                    <Thead>
                      <Tr>
                        <Th>Abilities</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        {pokemon.abilities.map((elem) => (
                          <Td>{elem.ability.name}</Td>
                        ))}
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PokemonCard;
