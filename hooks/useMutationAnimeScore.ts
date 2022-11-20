import {useMutation, useQueryClient} from "react-query";
import {Anime, AnimeScore} from "../lib/aliases";
import {useWatchedAnime} from "./useWatchedAnime";
import axios from "axios";

export function useMutationAnimeScore() {
    const queryClient = useQueryClient()
    const watchedAnime = useWatchedAnime()
    return useMutation({
        mutationFn: async function({anime, animeScore}: { anime: Anime, animeScore: AnimeScore }) {
            const response = await axios.put(`/api/mal/rating`, {animeId: anime.node.id, score: animeScore})
            return response.data
        },
        onSuccess: (response, request) => {
            const {anime, animeScore} = request
            if (!watchedAnime) return

            const oldRatingList = watchedAnime.get(anime.list_status.score) ?? []
            watchedAnime.set(anime.list_status.score, oldRatingList.filter((a) => a.node.id !== anime.node.id))
            anime.list_status.score = animeScore
            const newRatingList = watchedAnime.get(animeScore) ?? []
            watchedAnime.set(animeScore, [...newRatingList, anime])
            queryClient.setQueryData("watchedAnime", watchedAnime)
        }
})
}