import {useQuery} from "react-query";
import axios from "axios";
import {Mal} from "node-myanimelist";

export function useWatchedAnime() {
    return useQuery(["watchedAnime"], async function() {
        const allAnime = []
        let page = 1

        while (true) {
            const { data } = await axios.get<Mal.User.AnimeListItem<Mal.Common.WorkBase, Mal.Anime.AnimeListStatusBase>[]>(`/api/mal/get-watched?page=${page}`)
            if (data.length === 0)
                break
            allAnime.push(...data)
            page++
        }

        return allAnime
    }, {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    }).data
}