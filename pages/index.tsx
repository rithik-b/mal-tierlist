import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react";
import {useOauthUrl} from "../hooks/useOauthUrl";
import {useQueryUser} from "../hooks/useQueryUser";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter()
    const { data: user, isFetched } = useQueryUser()
    const oauthUrl = useOauthUrl()

    if (user)
        router.push("/tierlist")

    return (
        isFetched && !user ? (
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

              {!!oauthUrl ? (
                  <div className={styles.grid}>
                      <a href={oauthUrl.url} className={styles.card}>
                          <h2>Login &rarr;</h2>
                          <p>Login to MyAnimeList to get started</p>
                      </a>
                  </div>
              ) : null}
          </main>
        </div>) : null
  )
}
