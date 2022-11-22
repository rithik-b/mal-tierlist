import {Anime, AnimeScore, parseAnimeScore} from "../lib/aliases";
import {TierColor, TierColorForAnimeScore} from "../models/TierColor";
import AnimeComponent from "./AnimeComponent";
import React from "react";
import styled from "styled-components";
import {useMutationAnimeScore} from "../hooks/useMutationAnimeScore";
import {useDrop} from "react-dnd";

interface Props {
    animeList: Anime[] | undefined,
    animeScore: AnimeScore
}

const TierContainer = styled.div`
  display: grid;
  flex-direction: row;
  border: 2px solid black;
  background-color: #222222;
  grid-template-columns: 1fr 8fr;
`

const TierHeaderContainer = styled.div<{ tierColor: TierColor }>`
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr auto 1fr;
  grid-column: 1;
  background-color: ${props => props.tierColor};
`

const TierHeader = styled.h1`
  color: black;
  text-align: center;
  grid-column: 2;
  grid-row: 2;
`

const TierAnimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-column: 2;
`

const scoreList: string[] = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"]

const TierComponent : React.FunctionComponent<Props> = props => {
    const {animeList, animeScore} = props
    const { mutateAsync: mutateAnimeScoreAsync } = useMutationAnimeScore()

    const [, drop] = useDrop(
        () => ({
            accept: scoreList.filter(score => score !== animeScore.toString()),
            drop: (item, monitor) => handleDrop(item as Anime),
        }),
        [animeScore]
    )

    const handleDrop = async (anime: Anime) => {
        await mutateAnimeScoreAsync({anime: anime, animeScore: animeScore})
    }

    return (
        <TierContainer>
            <TierHeaderContainer tierColor={TierColorForAnimeScore(animeScore)}>
                <TierHeader>{animeScore !== 0 ? animeScore : "Not Rated"}</TierHeader>
            </TierHeaderContainer>
            <TierAnimeContainer ref={drop}>
                {animeList?.map(anime => (
                    <AnimeComponent anime={anime} key={anime.node.id} />
                ))}
            </TierAnimeContainer>
        </TierContainer>
    )
}

export default TierComponent