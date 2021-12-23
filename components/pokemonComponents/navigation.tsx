import { createUseStyles } from 'react-jss'
import Link from 'next/link'

const useStyles = createUseStyles({
    navigation: {
        color: 'white',
        background: 'black',
        borderRadius: '0px 0px 90px 90px',
        display: 'flex',
        marginBottom: 15,
        padding: 5,
        '& > a, > div': {
            flexGrow: 1,
            flexBasis: '50%',
            '&:first-child': {
                borderRight: '1px solid white'
            },
            '& h3': {
                margin: '5px 0',
                fontSize: 17,
                '& span': {
                    marginLeft: 10,
                    color: 'yellow',
                    fontWeight: 400
                }
            }
        }
    }
})

type NavigationProps = {
    previousname: string | null
    previousid: number
    nextname: string | null
    nextid: number
}

const Navigation = (props: NavigationProps) => {
    const classes = useStyles()
    return (
        <div className={classes.navigation}>
            {props.previousname ? (
                <Link href={`/pokemons/${props.previousname}`}>
                    <a>
                        <section>
                            <h3> &lsaquo; {`#${props.previousname}`} <span>{`#${props.previousid}`}</span></h3>
                        </section>
                    </a>
                </Link>
            ) : (
                <div></div>
            )}
            {props.nextname ? (
                <Link href={`/pokemons/${props.nextname}`}>
                    <a>
                        <section>
                            <h3>{`#${props.nextname}`} <span>{`#${props.nextid}`}</span> &rsaquo; </h3>
                        </section>
                    </a>
                </Link>
            ) : (
                <div></div>
            )}

        </div>
    )
}

export default Navigation