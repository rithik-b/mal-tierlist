import {useWatchedAnime} from "../hooks/useWatchedAnime";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TierComponent from "../components/TierComponent";
import {AnimeScore} from "../lib/aliases";
import Head from "next/head";
import React from "react";
import {useQueryUser} from "../hooks/useQueryUser";
import {useRouter} from "next/router";
import styled from "styled-components";

const scoreList: AnimeScore[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 30px;
`

const Header = styled.h2`
    color: white;
`

export default function TierListPage() {
    const router = useRouter()
    const { data: user, error } = useQueryUser()
    const watchedAnime = useWatchedAnime()

    if (!!error)
        router.push("/")

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <Head>
                    <title>{user?.name ? `${user.name}'s ` : ""}Anime Tier List</title>
                    <meta name="description" content="Tier your Anime!" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <HeaderContainer>
                    <Header>{user?.name ? `${user.name}'s ` : ""}Anime Tier List</Header>
                    <Header><a href={`${router.basePath}/api/logout`}>Logout</a></Header>
                </HeaderContainer>
                {!!watchedAnime ?
                    <>
                        {scoreList.map((score) =>
                            <TierComponent key={score} animeList={watchedAnime?.get(score)} animeScore={score} />
                        )}
                    </>
                    : "Loading..."}
            </div>
        </DndProvider>
    )
}