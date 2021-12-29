import { createUseStyles } from 'react-jss'
import Link from 'next/link'
import TypeBadge from './typeBadge'

const useStyles = createUseStyles({
    pokebox: {
        background: 'white',
        display: 'inline',
        '& a': {
            display: 'block',
            '& h2': {
                background: 'black',
                padding: '5px 0',
                margin: 0,
                fontSize: 15,
                textAlign: 'center',
                color: 'white'
            },
            '& img': {
                display: 'block',
                margin: '0 auto',
                minHeight: 115
            },
            '& span': {
                fontWeight: 'bold'
            }
        },
    }
})

type PokemonProps = {
    name: string
    urlimg: string
    types: Array<any>
}

const Pokemon = (props: PokemonProps) => {
    const classes = useStyles()
    return (
        <div className={classes.pokebox}>
            <Link href={`/pokemons/${props.name}`}>
                <a>
                    <h2>
                        {props.name}
                    </h2>
                    <img src={props.urlimg} />
                    <TypeBadge badges={props.types} />
                </a>
            </Link>
        </div>
    )
}

export default Pokemon