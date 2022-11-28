import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react";
import {useRouter} from "next/router";
import {withSessionSsr} from "../lib/withSessions";
import getUser from "../lib/getUser";

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        try {
            const user = await getUser(req.session)
            return {
                redirect: {
                    destination: "/tierlist",
                    permanent: false
                }
            }
        }
        catch (e) {
            return {
                props: {}
            }
        }
    },
)

export default function Home() {
    const router = useRouter()

    return (
        <div className={styles.container}>
            <Head>
                <title>Anime Tier List</title>
                <meta name="description" content="Tier your Anime!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Anime Tier List
                </h1>

                <div className={styles.grid}>
                    <a href={`${router.basePath}/api/mal/oauth-url`} className={styles.card}>
                        <h2>Login &rarr;</h2>
                        <p>Login to MyAnimeList to get started</p>
                    </a>
                </div>
            </main>
        </div>
  )
}
