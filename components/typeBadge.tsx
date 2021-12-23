import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    badge: {
        '& > span': {
            display: 'inline-block',
            fontSize: 12,
            fontWeight: '500',
            background: 'gainsboro',
            borderRadius: 10,
            padding: '1px 9px',
            marginRight: 5,
            marginLeft: 5,
            marginBottom: 5,
            color: 'white',
            '&.normal': { color: 'black' },
            '&.grass': { background: 'yellowgreen', color: 'black' },
            '&.flying': { background: 'indigo' },
            '&.fire': { background: 'red' },
            '&.poison': { background: 'purple' },
            '&.bug': { background: 'darkolivegreen' },
            '&.electric': { background: 'gold', color: 'black' },
            '&.ground': { background: 'maroon' },
            '&.water': { background: 'royalblue' },
            '&.fairy': { background: 'hotpink' },
            '&.fighting': { background: 'lightsalmon', color: 'black' },
            '&.rock': { background: 'saddlebrown' },
            '&.psychic': { background: 'darkblue' },
            '&.ghost': { background: 'plum' },
            '&.dragon': { background: 'tomato' },
            '&.ice': { background: 'skyblue', color: 'black' },
            '&.steel': { background: 'slategray' },
            '&.dark': { background: 'black' },
        }
    }
})

type TypeBadgeProps = {
    badges: Array<any>
}

const TypeBadge = (props: TypeBadgeProps) => {
    const classes = useStyles()
    return (
        <div className={classes.badge}>
            {props.badges.map(badge => (
                <span key={badge.type.slot} className={badge.type.name}>{badge.type.name}</span>
            ))}
        </div>
    )
}

export default TypeBadge