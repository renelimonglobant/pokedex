import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles<RuleNames, StatProps>({
    //stat: (props) => ({
    stat: ({base_stat, max}) => ({
        flexGrow: 1,
        fontSize: 13,
        fontWeight: '500',
        background: '#FFDE00',
        borderRadius: '5px 5px 0px 0px',
        boxShadow: '5px 4px 10px 1px rgba(0,0,0,0.4)',
        borderLeft: '2px solid #B3A125',
        borderTop: '3px solid #B3A125',
        marginRight: 1,
        marginLeft: 1,
        // height: `${(Math.floor(props.base_stat*100)/props.max)}%`,
        height: `${(Math.floor(base_stat*100)/max)}%`,
        color: 'black',
        textTransform: 'capitalize',
        textAlign: 'center',
        '& > div': {
            height: '100%',
            display: 'flex',
            flexDirection:'row',
            alignItems: 'flex-end',
            '& p': {width: '100%', '& span': { display: 'block' }}
        }
    })
})

type RuleNames = 'stat'
type StatProps = {
    base_stat: number
    max: number
    name: string
}

const Stat = (props: StatProps) => {
    const classes = useStyles(props)
    return (
        <span className={classes.stat}>
            <div>
                <p>{props.name.replace('-',' ')} <span>{props.base_stat}</span></p>
            </div>
        </span>
    )
}

export default Stat