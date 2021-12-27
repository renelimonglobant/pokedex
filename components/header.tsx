import Link from 'next/link'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    head: {
        background: '#ee1515',
        color: 'white',
        display: 'block',
        borderBottom: 'solid 2px black',
        '& h1': {
            fontWeight: 'bold',
            letterSpacing: 2,
            margin: {
                top: 0, bottom: 0
            },
            padding: {
                top: 15,
                bottom: 15
            },
            textAlign: 'center'
        }
    },
    '@media (min-width: 768px)': {
        head: {
            width: 750,
            maxWidth: 750,
            margin: '0px auto',
        },
    }
})

type HeaderType = {
    children: React.ReactNode
}
const Header = (props: HeaderType) => {
    const classes = useStyles()
    return (
        <header className={classes.head}>
            <Link href={`/`}>
                <a>
                    {props.children}
                </a>
            </Link>
        </header>
    )
}

export default Header