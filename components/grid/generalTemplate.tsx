import { createUseStyles, ThemeProvider } from 'react-jss'
import Footer from './footer'
import Header from './header'
import SearchBox from '../searchbox'
import Image from 'next/image'
import Main from './main'

const useStyles = createUseStyles({
    principal: {
        width: '100%',
        maxWidth: '100%',
        margin: '0px auto',
    },
})

const theme = {
    mainRed: '#ee1515'
}

type GeneralProps = {
    children: React.ReactNode
}

export default function General(props: GeneralProps) {
    const classes = useStyles()
    return (
        <div className={classes.principal}>
            <ThemeProvider theme={theme}>
                <Header>
                    <Image src="/pokedeex.png" alt="Vercel Logo" width={240} height={90} />
                </Header>
                <Main>
                    <SearchBox />
                    {props.children}
                </Main>
                <Footer />
            </ThemeProvider>
        </div>
    )
}