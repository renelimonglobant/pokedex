import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles<RuleNames, StatProps>({
    stat: (props) => ({
        flexGrow: 1,
        fontSize: 12,
        fontWeight: '500',
        background: '#FFDE00',
        borderRadius: '5px 5px 0px 0px',
        marginRight: 1,
        marginLeft: 1,
        height: props.base_stat,
        color: 'black',
        textTransform: 'capitalize',
        textAlign: 'center',
        '& > div': {
            height: '100%',
            display: 'flex',
            flexDirection:'row',
            alignItems: 'flex-end',
            '& div': {width: '100%'}
        }
    })
})

type RuleNames = 'stat'
type StatProps = {
    base_stat: number
    name: string
}

const Stat = (props: StatProps) => {
    const classes = useStyles(props) // props.base_stat
    return (
        <span className={classes.stat}>
            <div>
                <div>{props.name}</div>
            </div>
        </span>
    )
}

export default Stat