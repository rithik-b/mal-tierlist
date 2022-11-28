import {Anime, AnimeScore} from "../lib/aliases";
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

const TierContainer = styled.tr`
  border: 2px solid black;
  background-color: #222222;
  height: 0px; // Need hack for auto height
`

const TierHeaderContainer = styled.div<{ tierColor: TierColor }>`
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr auto 1fr;
  background-color: ${props => props.tierColor};
  height: 100%;
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
            <td style={{height: "inherit"}}>
                <TierHeaderContainer tierColor={TierColorForAnimeScore(animeScore)}>
                    <TierHeader>{animeScore !== 0 ? animeScore : "Not Rated"}</TierHeader>
                </TierHeaderContainer>
            </td>
            <td>
                <TierAnimeContainer ref={drop}>
                    {animeList?.map(anime => (
                        <AnimeComponent anime={anime} key={anime.node.id} />
                    ))}
                </TierAnimeContainer>
            </td>
        </TierContainer>
    )
}

export default TierComponent