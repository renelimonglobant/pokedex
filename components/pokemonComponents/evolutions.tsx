import { createUseStyles } from 'react-jss'
import Link from 'next/link'

const useStyles = createUseStyles({
    evolutions: {
        borderRadius: '5px 5px 5px 5px',
        display: 'flex',
        padding: 5,
        minHeight: '60px',
        background: '#CC0000',
        alignItems: 'center',
        textAlign: 'center',
        '& > div:not(:last-child)': {
            borderRight: '2px solid black'
        },
        '& > div': {
            flexGrow: 1,
            height: '100%',
            '& a': {
                color: 'white',
                flexGrow: 1,
                display: 'inline-block',
                padding: '10px 0px',
                width: '100%',
                marginBottom: 2,
                flexBasis: '50%',
                '&:hover': {
                    background: '#3B4cca'
                }
            }
        },
    }
})

type EvolutionsProps = {
    evolution: {
        species: {
            name: string
        },
        evolves_to: {
            species: {
                name: string
            },
            evolves_to: {
                species: {
                    name: string
                },
            }[]
        }[]
    }
}

const Evolutions = (props: EvolutionsProps) => {
    const classes = useStyles()
    return (
        <div className={classes.evolutions}>
            <div>
                <Link href={`/pokemons/${props.evolution.species.name}`}>
                    <a>
                        {props.evolution.species.name}
                    </a>
                </Link>
            </div>
            {(props.evolution.evolves_to.length < 2) ? props.evolution.evolves_to.map((specie, i: number) => (
                <>
                    <div key={i}>
                        <Link href={`/pokemons/${specie.species.name}`}>
                            <a>
                                {specie.species.name}
                            </a>
                        </Link>
                    </div>
                    {specie.evolves_to.map((subspecie, j: number) => (
                        <div key={j}>
                            <Link href={`/pokemons/${subspecie.species.name}`}>
                                <a>
                                    {subspecie.species.name}
                                </a>
                            </Link>
                        </div>
                    ))}
                </>
            )) :
                <div>
                    {props.evolution.evolves_to.map((specie, i: number) => (
                        <>
                            <div key={i}>
                                <Link href={`/pokemons/${specie.species.name}`}>
                                    <a>
                                        {specie.species.name}
                                    </a>
                                </Link>
                            </div>
                            {specie.evolves_to.map((subspecie, j: number) => (
                                <div key={j}>
                                    <Link href={`/pokemons/${subspecie.species.name}`}>
                                        <a>
                                            {subspecie.species.name}
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </>
                    ))}
                </div>
            }
        </div>
    )
}

export default Evolutions