import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { createUseStyles } from 'react-jss'
import Head from 'next/head'
import Container from '../../components/grid/container'
import General from '../../components/grid/generalTemplate'
import Navigation from '../../components/pokemonComponents/navigation'
import Characteristics from '../../components/pokemonComponents/characteristics'
import TypeBadge from '../../components/typeBadge'
import StatsBar from '../../components/pokemonComponents/statsBar'
import Evolutions from '../../components/pokemonComponents/evolutions'
//import { runMain } from 'module'

const useStyles = createUseStyles({
    pokemonhead: {
        background: 'white',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontSize: 22,
        padding: 1,
        '& h2': {
            margin: 0,
            '& span': {
                marginLeft: '20px',
                color: 'gray',
                fontWeight: 500
            }
        },
    },
    pokemondescription: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        '& > div': {
            padding: 10
        },
        '& .left': {
            flexGrow: '1',
            background: '#f0f0f0',
            '& img': {
                background: 'black',
                display: 'block',
                margin: 'auto',
                minHeight: 115
            }
        },
        '& .right': {
            flexGrow: '2',
            color: 'white',
            background: '#3B4CCA'
        }
    },
    evolutionParent: {
        paddingBottom: 20
    }
})


type PokemonDescriptionProps = {
    //pokemon: Array<any>
    pokemon: {
        id: number
        image: string
        height: number
        weight: number
        abilities: Array<any>
        types: Array<any>
        stats: Array<any>
        evolutionChain: Array<any>
        previous: { name: string | null }
        next: { name: string | null }
    }
}

function PokemonDescription(props: PokemonDescriptionProps) {
    const classes = useStyles()
    const router = useRouter()

    // catch when content is requested to the server and waiting for render it
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <Container>
            <Head>
                <title>Pokedex - {router.query.pokemonName}</title>
                <meta name="description" content="Small project for learning purpouses" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <General>
                <div className={classes.pokemonhead}>
                    <Navigation
                        previousname={props.pokemon.previous.name}
                        previousid={props.pokemon.id - 1}
                        nextname={props.pokemon.next.name}
                        nextid={props.pokemon.id + 1}
                    />
                    <h2 className='name'>
                        {router.query.pokemonName}
                        <span>#{props.pokemon.id}</span>
                    </h2>
                </div>
                <section className={classes.pokemondescription}>
                    <div className='left'>
                        <img src={props.pokemon.image} />
                    </div>
                    <div className='right'>
                        <Characteristics
                            height={props.pokemon.height}
                            weight={props.pokemon.weight}
                            abilities={props.pokemon.abilities}
                        />
                        <div>
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
                    <h3>Evoluciones</h3>
                    <Evolutions evolution={props.pokemon.evolutionChain.evolutionChain.chain} />
                </section>
            </General>
        </Container>
    )
}

export default PokemonDescription


export const getStaticProps: GetStaticProps = async (context) => {
    const getExtraData: any = async (pkmnurl: string) => {
        try {
            let res = await fetch(pkmnurl);
            let data = await res.json();
            return {
                speciesUrl: data.evolution_chain.url
            };
        } catch (e) {
            console.log(e);
        }
    }

    const getEvolutionChain: any = async (pkmnurl: string) => {
        try {
            let res = await fetch(pkmnurl);
            let data = await res.json();
            return {
                evolutionChain: data
            };
        } catch (e) {
            console.log(e);
        }
    }

    const getPokemonName: any = async (pkmnurl: string) => {
        try {
            let res = await fetch(pkmnurl);
            let data = await res.json();
            return {
                name: data.name
            };
        } catch (e) {
            console.log(e);
        }
    }

    /*type paramsType = {
        pokemonName: string
    }*/
    const { params } = context
    //const { params: any } = context // error
    /*
    */
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`)
        const data = await response.json()
        console.log(data.id)
        if (!data.id) {
            return {
                notFound: true
            }
        }
        const species = await getExtraData(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
        const evolutionChain = await getEvolutionChain(species.speciesUrl);
        const previous = ((parseInt(data.id) - 1) < 1) ? { name: '' } : await getPokemonName(`https://pokeapi.co/api/v2/pokemon/${data.id - 1}`);
        const next = ((parseInt(data.id) + 1) > 898) ? { name: '' } : await getPokemonName(`https://pokeapi.co/api/v2/pokemon/${data.id + 1}`);
        Object.assign(data, {
            evolutionChain: evolutionChain,
            previous,
            next
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
                    next: data.next
                }
            }
        }
    
    } catch (e) {
        return {
            notFound: true
        }
    }


}

export async function getStaticPaths() {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()
    // const paths = data.map(post => {
    //   return {
    //     params: { postId: `${post.id}` }
    //   }
    // })

    return {
        paths: [
            { params: { pokemonName: 'bulbasaur' } },
            { params: { pokemonName: 'charmander' } },
        ],
        fallback: true
    }
}
