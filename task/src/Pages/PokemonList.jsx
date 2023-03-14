import { useState, useEffect } from "react";
import { Grid, GridItem, Spinner, Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import PokemonCard from "../Components/PokemonCard";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  console.log(pokemonList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => {
        // console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonList((prevList) => [...prevList, ...data.results]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [offset, limit]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={6}
      p={4}
      backgroundColor="#040404"
      // border="2px solid green"
    >
      {pokemonList.map((pokemon) => (
        <GridItem key={uuidv4()} padding="10px">
          <PokemonCard name={pokemon.name} />
        </GridItem>
      ))}
      {loading && (
        <GridItem colSpan={{ base: 1, md: 2, lg: 3, xl: 4 }}>
          <Spinner size="xl" />
        </GridItem>
      )}
      {error && (
        <GridItem colSpan={{ base: 1, md: 2, lg: 3, xl: 4 }}>
          <p>Something went wrong...</p>
        </GridItem>
      )}
      {pokemonList.length > 0 && (
        <GridItem colSpan={{ base: 1, md: 2, lg: 3, xl: 4 }}>
          <Button onClick={handleLoadMore} w="100%">
            Load more
          </Button>
        </GridItem>
      )}
    </Grid>
  );
};

export default PokemonList;
