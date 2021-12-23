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