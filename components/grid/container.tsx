import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  container: {
    background: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#222224'
  }
})

type ContainerProps = {
  children: React.ReactNode
}

export default function Container(props: ContainerProps) {
  const classes = useStyles()
  return (
    <div className={classes.container}>{props.children}</div>
  )
}