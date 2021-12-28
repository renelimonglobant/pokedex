import Image from 'next/image'
import { createUseStyles } from 'react-jss'
import { useRouter } from 'next/router'
import { useState } from 'react'

const useStyles = createUseStyles({
    box: {
        background: 'black',
        display: 'block',
        '& .bordered': {
            margin: '5px 10px',
            display: 'inline-block',
            border: 'solid 1px black',
            background: 'white',
            padding: '0px 0px 0px 10px',
            borderRadius: 10
        },
        '& input': {
            background: 'white',
            color: 'black',
            fontSize: 16,
            height: '100%',
            border: 'none',
            outline: 0,
        },
        '& button': {
            background: 'black',
            color: 'white',
            outline: 0,
            padding: 0,
            borderRadius: '0px 10px 10px 0px',
            height: '100%',
            border: '1px solid black',
            '&:hover': {
                background: 'rgba(0,0,0,0.6)'
            }
        }
    },
    search: {
        color: 'white !important'
    }
})

const SearchBox = () => {
    const classes = useStyles()
    const router = useRouter()
    const [value, setValue] = useState('')

    const onHandleSend = (e: any) => {
        // ((console.log('hola'+value)
        if(value) router.push(`/pokemons/${value}`)
    }

    const onHandleSearch = (e: any) => {
        // if (e.target.value.match("^[a-zA-Z ]*$") != null) {
        //     console.log(e.target.value)
        // }
        setValue(e.target.value.toLowerCase())
    }

    const validateNumber = (e: any) => {
        let regex = /^[a-zA-Z ]*$/
        let theEvent = e || window.event;
        if (!regex.test(e.target.value)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    return (
        <div className={classes.box}>
            <div className='bordered'>
                <input
                    onChange={e => onHandleSearch(e)}
                    onKeyPress={e => validateNumber(e)}
                    pattern="[A-Za-z]{3}" />
                <button onClick={e => onHandleSend(e)}>
                    <Image className={classes.search} src="/search.svg" alt="search" width={35} height={15} />
                </button>
            </div>
        </div>

    )
}

export default SearchBox