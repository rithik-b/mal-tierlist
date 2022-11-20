import {Mal} from "node-myanimelist";

export type Anime = Mal.User.AnimeListItem<Mal.Common.WorkBase, Mal.Anime.AnimeListStatusBase>
export type AnimeScore =  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export function parseAnimeScore(score: string): AnimeScore {
    return parseInt(score) as AnimeScore
}