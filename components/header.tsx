import Link from 'next/link'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    head: {
        background: 'white',
        display: 'block',
        '& h1': {
            fontWeight: 'bold',
            margin: {
                top: 0, bottom: 0
            },
            padding: {
                top: 20,
                bottom: 20
            },
            textAlign: 'center'
        }
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