import {AnimeScore} from "../lib/aliases";

export type SetRatingRequest = {
    animeId?: number
    score?: AnimeScore
}