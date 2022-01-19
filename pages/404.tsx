import { useRouter } from "next/router";
import { createUseStyles } from "react-jss";
import Head from "next/head";
import Link from "next/link";

const useStyles = createUseStyles({
  pokemonhead: {
    background: "white",
    textAlign: "center",
    fontSize: 22,
    padding: "5px 0px",
    "& a": {
      color: "gray",
      textDecoration: "underline",
      fontWeight: 500,
    },
  },
});

type Custom404Props = {
  //pokemon: Array<any>
};

function Custom404(props: Custom404Props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 Pokedex - {router.query.pokemonName}</title>
        <meta
          name="description"
          content="Small project for learning purpouses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.pokemonhead}>
        <h3>Pokemon not found</h3>
        <h4>
          Go to{" "}
          <Link href={`/`}>
            <a>Home</a>
          </Link>{" "}
          or search in the box above
        </h4>
      </div>
    </>
  );
}

export default Custom404;
