import {useWatchedAnime} from "../hooks/useWatchedAnime";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TierComponent from "../components/TierComponent";
import {AnimeScore} from "../lib/aliases";
import Head from "next/head";
import React from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import getUser from "../lib/getUser";
import {withSessionSsr} from "../lib/withSessions";
import {UserResponse} from "../models/UserResponse";

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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const LoadingSpinner = styled.div`
  border: 16px solid #808080;
  border-top: 16px solid #ffffff;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        try {
            const user = await getUser(req.session)
            return {
                props: {
                    user
                }
            }
        }
        catch (e) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }
    },
)

export default function TierListPage({user} : {user: UserResponse}) {
    const router = useRouter()
    const watchedAnime = useWatchedAnime()
    const title = user.name + "'s Anime Tier List"

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content="Tier your Anime!" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <HeaderContainer>
                    <Header>{title}</Header>
                    <Header><a href={`${router.basePath}/api/logout`}>Logout</a></Header>
                </HeaderContainer>
                {!!watchedAnime ?
                    <>
                        {scoreList.map((score) =>
                            <TierComponent key={score} animeList={watchedAnime?.get(score)} animeScore={score} />
                        )}
                    </>
                    :
                    <LoadingContainer>
                        <h1>Loading</h1>
                        <LoadingSpinner />
                    </LoadingContainer>}
            </div>
        </DndProvider>
    )
}