import type { NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import { createUseStyles } from 'react-jss'
import { GetStaticProps } from 'next'
import Container from '../components/grid/container'
import Pokemon from '../components/pokemon'
import General from '../components/grid/generalTemplate'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface IParams extends ParsedUrlQuery {
    pagination: string
}

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
            width: '49%',
            boxShadow: '5px 4px 10px 1px rgba(0,0,0,0.4)',
            marginBottom: 18
        }
    },
    '@media (min-width: 576px)': {
        pokemonlist: {
            '& article': {
                width: '32%',
            }
        }
    },
    '@media (min-width: 768px)': {
        pokemonlist: {
            '& article': {
                width: '23%',
            }
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


const Pagination: NextPage<StaticProps> = (props: StaticProps) => {
    const styles = myStyles()
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <Container>
            <Head>
                <title>Pokedex - page {router.query.pagination}</title>
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
                    <Link href={(parseInt(router.query.pagination as string) === 2) ? `/` : `/${parseInt(router.query.pagination as string) - 1}`}>
                        <a>previous</a>
                    </Link>
                    <Link href={`/${parseInt(router.query.pagination as string) + 1}`}>
                        <a>next</a>
                    </Link>
                </section>
            </General>
        </Container>
    )
}

export default Pagination

export const getStaticProps: GetStaticProps = async (context) => {
    const getExtraData: any = async (pkmnurl: string) => {
        try {
            let res = await fetch(pkmnurl);
            let data = await res.json();
            return {
                img: data.sprites.front_default,
                id: data.id,
                types: data.types,
            }
        } catch (e) {
            console.log(e);
        }
    };

    const { pagination } = context.params as IParams
    //const { params } = context
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(parseInt(pagination) - 1) * 20}`)
    //console.log(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${params.pagination}`)
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
        //revalidate: 30 /// time(seconds) to regenerate code
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { pagination: '1' } },
            { params: { pagination: '2' } },
            { params: { pagination: '3' } },
            { params: { pagination: '4' } },
            { params: { pagination: '5' } },
        ],
        fallback: true
        //fallback: false // don't allow to create pages that doesn't exits, if so, then go to 404 page
        //fallback: 'blocking' // works like tru but wothout loading transition
    }
}