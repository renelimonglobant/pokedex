import Link from 'next/link'
import { createUseStyles, useTheme } from 'react-jss'

const useStyles = createUseStyles<RuleNames, HeaderType, CustomTheme>({
    head: {
        background: ({ theme }) => theme.mainRed,
        color: 'white',
        display: 'block',
        borderBottom: 'solid 2px black',
        '& a': { display: 'block', textAlign: 'center' },
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

type RuleNames = 'head' | '@media (min-width: 768px)'

type HeaderType = {
    children: React.ReactNode
}
interface CustomTheme {
    mainRed: string
}

const Header = (props: HeaderType) => {
    const theme: CustomTheme = useTheme()
    const classes = useStyles({ ...props, theme })
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