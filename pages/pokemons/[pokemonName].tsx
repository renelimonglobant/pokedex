import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { createUseStyles } from "react-jss";
import Head from "next/head";
import Navigation from "../../components/pokemonComponents/navigation";
import Characteristics from "../../components/pokemonComponents/characteristics";
import TypeBadge from "../../components/typeBadge";
import StatsBar from "../../components/pokemonComponents/statsBar";
import Evolutions from "../../components/pokemonComponents/evolutions";

const useStyles = createUseStyles({
  pokemonhead: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 25,
    padding: 0,
    "& h2": {
      fontWeight: 800,
      letterSpacing: 2,
      margin: { top: 20, bottom: 25 },
      "& span": {
        marginLeft: "25px",
        color: "white",
        fontWeight: 400,
      },
    },
  },
  pokemondescription: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    "& .left": {
      flexGrow: "1",
      background: "#dcd7d6",
      boxShadow: "5px 4px 10px 1px rgba(0,0,0,0.4)",
      border: "1px solid black",
      verticalAlign: "middle",
      padding: 30,
      "& div": {
        display: "flex",
        alignItems: "center",
        height: "100%",
        background: "black",
        "& img": {
          display: "block",
          margin: "auto",
          minHeight: 150,
        },
      },
    },
    "& .right": {
      paddingLeft: 0,
      flexGrow: "2",
      color: "white",
      "& .typeBadge": {
        background: "#0abde9",
        marginTop: 35,
        padding: "5px 15px",
        boxShadow: "5px 4px 10px 1px rgba(0,0,0,0.4)",
      },
    },
  },
  "@media (min-width: 576px)": {
    pokemondescription: {
      "& .right": {
        paddingLeft: 30,
      },
    },
  },
  evolutionParent: {
    paddingBottom: 20,
    "& > div": {
      marginTop: 35,
    },
  },
});

interface IParams extends ParsedUrlQuery {
  pokemonName: string;
}

type PokemonDescriptionProps = {
  pokemon: {
    id: number;
    image: string;
    height: number;
    weight: number;
    abilities: Array<any>;
    types: Array<any>;
    stats: Array<any>;
    evolutionChain: {
      evolutionChain: {
        chain: {
          species: {
            name: string;
          };
          evolves_to: {
            species: {
              name: string;
            };
            evolves_to: {
              species: {
                name: string;
              };
            }[];
          }[];
        };
      };
    };
    previous: { name: string | null };
    next: { name: string | null };
  };
};

function PokemonDescription(props: PokemonDescriptionProps) {
  const classes = useStyles();
  const router = useRouter();

  // catch when content is requested to the server and waiting for render it
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Pokedex - {router.query.pokemonName}</title>
        <meta
          name="description"
          content="Small project for learning purpouses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.pokemonhead}>
        <Navigation
          previousname={props.pokemon.previous.name}
          previousid={props.pokemon.id - 1}
          nextname={props.pokemon.next.name}
          nextid={props.pokemon.id + 1}
        />
        <h2 className="name">
          {router.query.pokemonName}
          <span>#{props.pokemon.id}</span>
        </h2>
      </div>
      <section className={classes.pokemondescription}>
        <div className="left">
          <div>
            <img src={props.pokemon.image} />
          </div>
        </div>
        <div className="right">
          <Characteristics
            height={props.pokemon.height}
            weight={props.pokemon.weight}
            abilities={props.pokemon.abilities}
          />
          <div className="typeBadge">
            <h3>Type</h3>
            <TypeBadge badges={props.pokemon.types} />
          </div>
        </div>
      </section>
      <section className={classes.evolutionParent}>
        <div>
          <h3>Stats</h3>
          <StatsBar stats={props.pokemon.stats} />
        </div>
        <div>
          <h3>Evoluciones</h3>
          <Evolutions
            evolution={props.pokemon.evolutionChain.evolutionChain.chain}
          />
        </div>
      </section>
    </>
  );
}

export default PokemonDescription;

export const getStaticProps: GetStaticProps = async (context) => {
  const getExtraData: any = async (pkmnurl: string) => {
    try {
      let res = await fetch(pkmnurl);
      let data = await res.json();
      return {
        speciesUrl: data.evolution_chain.url,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const getEvolutionChain: any = async (pkmnurl: string) => {
    try {
      let res = await fetch(pkmnurl);
      let data = await res.json();
      return {
        evolutionChain: data,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const getPokemonName: any = async (pkmnurl: string) => {
    try {
      let res = await fetch(pkmnurl);
      let data = await res.json();
      return {
        name: data.name,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const { pokemonName } = context.params as IParams;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await response.json();
    console.log(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!data.id) {
      return {
        notFound: true,
      };
    }
    const species = await getExtraData(
      `https://pokeapi.co/api/v2/pokemon-species/${data.id}`
    );
    const evolutionChain = await getEvolutionChain(species.speciesUrl);
    const previous =
      parseInt(data.id) - 1 < 1
        ? { name: "" }
        : await getPokemonName(
            `https://pokeapi.co/api/v2/pokemon/${data.id - 1}`
          );
    const next =
      parseInt(data.id) + 1 > 898
        ? { name: "" }
        : await getPokemonName(
            `https://pokeapi.co/api/v2/pokemon/${data.id + 1}`
          );
    Object.assign(data, {
      evolutionChain: evolutionChain,
      previous,
      next,
    });

    return {
      props: {
        pokemon: {
          id: data.id,
          image: data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
          types: data.types,
          stats: data.stats,
          evolutionChain: data.evolutionChain,
          previous: data.previous,
          next: data.next,
        },
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export async function getStaticPaths() {
  const list: { params: { pokemonName: string } }[] = [];
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((res) => res.json())
    .then((data) => {
      type Poke = {
        name: string;
        url: string;
      };
      data.results.map((el: Poke) => {
        let name = { params: { pokemonName: `${el.name}` } };
        console.log(name);
        list.push(name);
      });
    })
    .catch((e) => console.log(e));

  return {
    paths: list,
    fallback: true,
  };
  // return {
  //     paths: [
  //         { params: { pokemonName: 'bulbasaur' } },
  //         { params: { pokemonName: 'charmander' } },
  //     ],
  //     fallback: true
  // }
}
