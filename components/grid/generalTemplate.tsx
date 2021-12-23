import { createUseStyles } from 'react-jss'
import Footer from '../footer'
import Header from '../header'
import SearchBox from '../searchbox'

const useStyles = createUseStyles({
    principal: {
        width: '100%',
        maxWidth: '100%',
        margin: '0px auto',
    },
    myMain: {
        background: '#ee1515',
        padding: {
            top: 10,
            right: 20,
            left: 20
        },
        '& .pokemonlist': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 10,
            '& article': {
                background: 'white',
                width: '23%',
                marginBottom: 18
            }
        }
    },
    '@media (min-width: 768px)': {
        myMain: {
            width: 750,
            maxWidth: 750,
            margin: '0px auto',
            //background: '#3b4cca'
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


type GeneralProps = {
    children: React.ReactNode
}

export default function General(props: GeneralProps) {
    const classes = useStyles()
    return (
        <div className={classes.principal}>
            <Header>
                <h1>Pokedex</h1>
            </Header>
            <main className={classes.myMain}>
                <SearchBox />
                {props.children}
            </main>
            <Footer />
        </div>
    )
}