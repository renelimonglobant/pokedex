import type { NextPage } from 'next'
import Head from 'next/head'
import { createUseStyles } from 'react-jss'
import { GetStaticProps } from 'next'
import Container from '../components/grid/container'
import Pokemon from '../components/pokemon'
import General from '../components/grid/generalTemplate'
import Link from 'next/link'
// #f00000

type StaticProps = {
  //pokemons: Array<any>
  pokemons: {
    count: number
    next: string
    previous: string
    results: Array<any>
  }
}

const myStyles = createUseStyles({
  pokemonlist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    '& article': {
      background: 'white',
      width: '23%',
      marginBottom: 18
    }
  },
  pokemonpagination: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 10,
    '& a:first-child': {
        borderRight: 'solid 1px black'
    },
    '& a': {
        flexGrow: 1,
        textAlign: 'center',
        fontWeight: 700,
        background: 'white',
        '&:hover': {
            background: 'black',
            color: 'white'
        }
    }
}
})


const Home: NextPage<StaticProps> = (props: StaticProps) => {
  const styles = myStyles()
  //console.log(props.pokemons.results)
  return (
    <Container>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Small project for learning purpouses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <General>
        <section className={styles.pokemonlist}>
          {props.pokemons.results.map(pokemon => (
            <article key={pokemon.name}>
              <Pokemon name={pokemon.name} urlimg={pokemon.urlimg} types={pokemon.types} />
            </article>
          ))}
        </section>
        <section className={styles.pokemonpagination}>
            <Link href={`/2`}>
              <a>next</a>
            </Link>
        </section>
      </General>
    </Container>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const getExtraData: any = async (pkmnurl: string) => {
    try {
      let res = await fetch(pkmnurl);
      let data = await res.json();
      return {
        img: data.sprites.front_default,
        id: data.id,
        types: data.types
      };
    } catch (e) {
      console.log(e);
    }
  };

  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0')
  const data = await response.json()
  for (var i = 0; i < data.results.length; i++) {
    const { img, id, types } = await getExtraData(data.results[i].url);
    Object.assign(data.results[i], {
      urlimg: img,
      id,
      types
    });
  }

  return {
    props: {
      pokemons: {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results
      }
    }
  }
}