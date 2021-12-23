type PropsElement = {
    name: string
}

const Element = (props : PropsElement) => {
    return (
        <div>hola mundo {props.name}</div>
    )
}

export default Element