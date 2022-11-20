import {useQuery} from "react-query";
import axios from "axios";
import {Anime, AnimeScore} from "../lib/aliases";

export function useWatchedAnime() {
    return useQuery(["watchedAnime"], async function() {
        const allAnime = []
        let page = 1

        while (true) {
            const { data } = await axios.get<Anime[]>(`/api/mal/get-watched?page=${page}`)
            if (data.length === 0)
                break
            allAnime.push(...data)
            page++
        }

        const animeByScore = new Map<AnimeScore, Anime[]>()
        for (const anime of allAnime) {
            const score = anime.list_status.score
            if (animeByScore.has(score))
                animeByScore.get(score)!.push(anime)
            else
                animeByScore.set(score, [anime])
        }

        return animeByScore
    }, {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    }).data
}