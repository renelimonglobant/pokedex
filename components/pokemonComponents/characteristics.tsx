import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    characteristics: {
        //border: 'solid 1px white',
        //borderRadius: 10,
        background: '#3B4CCA',
        boxShadow: '5px 4px 10px 1px rgba(0,0,0,0.4)',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: 15,
        padding: 15,
        '& > article': {
            flexGrow: 1,
            flexBasis: '5%',
            '& h4': {
                margin: '5px 0',
                fontSize: 17,
                '& span': {
                    marginLeft: 10,
                    color: 'yellow',
                    fontWeight: 400
                }
            },
            '& > div': {
                marginTop: 2
            }
        }
    }
})

type CharacteristicsProps = {
    height: number
    weight: number
    abilities: Array<any>
}

const Characteristics = (props: CharacteristicsProps) => {
    const classes = useStyles()
    return (
        <section className={classes.characteristics}>
            <article>
                <h4>Altura</h4>
                <p>
                    {` ${props.height}' 00''`}
                </p>
            </article>
            <article>
                <h4>Peso</h4>
                <p>{`${props.weight} lbs`}</p>
            </article>
            <article>
                <h4>Habilidades</h4>
                <div>
                    {props.abilities.map((ability) => (
                        <div key={ability.slot}>{ability.ability.name}</div>
                    ))}
                </div>
            </article>
        </section >
    )
}

export default Characteristics