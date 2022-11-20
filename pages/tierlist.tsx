import {useWatchedAnime} from "../hooks/useWatchedAnime";
import {Anime, AnimeScore} from "../lib/aliases";
import AnimeElement from "../components/AnimeElement";
import styled from "styled-components";
import {TierColor, TierColorForAnimeScore} from "./models/TierColor";

const TierContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid black;
  background-color: #222222;
`

const TierHeaderContainer = styled.div<{ tierColor: TierColor }>`
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr auto 1fr;
  background-color: ${props => props.tierColor};
`

const TierHeader = styled.h1`
  width: 250px;
  height: 80px;
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

export default function TierListPage() {
    const watchedAnime = useWatchedAnime()

    const renderAnime = (animeByScore: Map<AnimeScore, Anime[]>, animeScore: AnimeScore) => {
        return (
            <TierContainer>
                <TierHeaderContainer tierColor={TierColorForAnimeScore(animeScore)}>
                    <TierHeader>{animeScore !== 0 ? animeScore : "Not Rated"}</TierHeader>
                </TierHeaderContainer>
                <TierAnimeContainer>
                    {animeByScore.get(animeScore)?.map(anime => (
                        <AnimeElement anime={anime} key={anime.node.id} />
                    ))}
                </TierAnimeContainer>
            </TierContainer>
        )
    }

    return (
        <div>
            {!!watchedAnime ?
                <>
                    {renderAnime(watchedAnime, 10)}
                    {renderAnime(watchedAnime, 9)}
                    {renderAnime(watchedAnime, 8)}
                    {renderAnime(watchedAnime, 7)}
                    {renderAnime(watchedAnime, 6)}
                    {renderAnime(watchedAnime, 5)}
                    {renderAnime(watchedAnime, 4)}
                    {renderAnime(watchedAnime, 3)}
                    {renderAnime(watchedAnime, 2)}
                    {renderAnime(watchedAnime, 1)}
                    {renderAnime(watchedAnime, 0)}
                </>
                : "Loading..."}
        </div>
    )
}