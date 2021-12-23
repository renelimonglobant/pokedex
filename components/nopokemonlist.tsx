import { createUseStyles } from 'react-jss'
import Link from 'next/link'
import { GetStaticProps } from 'next'

const useStyles = createUseStyles({
    foot: {
        background: 'white',
        display: 'block',
        '& span': {
            fontWeight: 'bold'
        }
    }
})

type StaticProps = {
    posts: Array<any>
}

const PokemonList = (props: StaticProps) => {
    const classes = useStyles()
    return (
        <section className={classes.foot}>
            {props.posts.map(post => {
                return (
                    <div key={post.id}>
                        <Link href={`posts/${post.id}`}>
                            <h2>
                                {post.id} {post.title}
                            </h2>
                        </Link>
                        <hr />
                    </div>
                )
            })}
        </section>

    )
}

export default PokemonList

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()

    return {
        props: {
            posts: data
        }
    }
}