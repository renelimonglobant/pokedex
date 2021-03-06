import { createUseStyles } from 'react-jss'
import Stat from './bar'

const useStyles = createUseStyles({
    statsBar: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 5,
        background: '#CC0000',
        alignItems: 'flex-end',
        height: 200,
        minHeight: 200,
        borderTop: 'solid 2px black',
        borderBottom: 'solid 2px black'
    }
})

type StatsBarProps = {
    stats: Array<any>
}

const StatsBar = (props: StatsBarProps) => {
    const classes = useStyles()
    const max = Math.max.apply(Math, props.stats.map(function(o) { return o.base_stat; }))
    return (
        <div className={classes.statsBar}>
            {props.stats.map((stat, i) => (
                <Stat key={i} name={stat.stat.name} base_stat={stat.base_stat} max={max} />
            ))}
        </div>
    )
}

export default StatsBar