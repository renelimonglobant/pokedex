import Image from 'next/image'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    foot: {
        background: 'black',
        color: 'white',
        display: 'block',
        padding: 5,
        textAlign: 'center',
        '& span': {
            fontWeight: 'bold'
        }
    },
    '@media (min-width: 768px)': {
        foot: {
            width: 750,
            maxWidth: 750,
            margin: '0px auto',
        },
    }
})

const Footer = () => {
    const classes = useStyles()
    return (
        <footer className={classes.foot}>
            Powered by me {' '}
            <span>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
        </footer>

    )
}

export default Footer