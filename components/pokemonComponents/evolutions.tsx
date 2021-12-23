import { createUseStyles } from 'react-jss'
import Link from 'next/link'

const useStyles = createUseStyles({
    evolutions: {
        borderRadius: '5px 5px 5px 5px',
        display: 'flex',
        padding: 5,
        '&> div': {
            flexGrow: 1,
            '& a': {
                color: 'white',
                flexGrow: 1,
                display: 'block',
                width: '100%',
                marginBottom: 2,
                flexBasis: '50%',
                background: 'black',
                '&:hover': {
                    color: 'black',
                    background: 'white'
                }
            }
        },
    }
})

type EvolutionsProps = {
    //evolution: Array<any>
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
                            <>
                                <div key={j}>
                                    <Link href={`/pokemons/${subspecie.species.name}`}>
                                        <a>
                                            {subspecie.species.name}
                                        </a>
                                    </Link>
                                </div>
                            </>
                        ))}
                    </>
                ))}
            </div>
        </div>
    )
}

export default Evolutions