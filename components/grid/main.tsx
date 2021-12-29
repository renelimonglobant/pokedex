import { createUseStyles, useTheme } from 'react-jss'

const useStyles = createUseStyles<RuleNames, MainProps, CustomTheme>({
    myMain: {
        background: ({ theme }) => theme.mainRed,
        padding: {
            top: 10,
            right: 20,
            left: 20
        }
    },
    '@media (min-width: 768px)': {
        myMain: {
            width: 750,
            maxWidth: 750,
            margin: '0px auto',
        },
    }
})

/*
// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) { ... }*/

type RuleNames = 'myMain' | '@media (min-width: 768px)'

interface CustomTheme {
    mainRed: string
}

type MainProps = {
    children: React.ReactNode
}

export default function Main(props: MainProps) {
    const theme: CustomTheme = useTheme()
    const classes = useStyles({ ...props, theme })
    return (
        <main className={classes.myMain}>
            {props.children}
        </main>
    )
}