import { createUseStyles } from 'react-jss'
import Link from 'next/link'

const useStyles = createUseStyles({
    navigation: {
        color: 'white',
        background: 'black',
        borderRadius: '0px 0px 90px 90px',
        display: 'flex',
        marginBottom: 15,
        borderTop: 'solid 1px white',
        padding: 5,
        '& a:hover': {
            background: '#123',
        },
        '& > a, > div': {
            flexGrow: 1,
            flexBasis: '50%',
            boxShadow: '0px 9px 9px rgba(0,0,0,0.4)',
            '&:first-child': {
                borderRight: '1px solid white',
                borderRadius: '0px 0px 0px 90px',
            },
            '&:nth-child(2)': {
                borderRadius: '0px 0px 90px 0px',
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