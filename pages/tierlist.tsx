import {useWatchedAnime} from "../hooks/useWatchedAnime";

export default function TierListPage() {
    const watchedAnime = useWatchedAnime()
    return (
        <div>
            <span>
                {JSON.stringify(watchedAnime ?? [])}
            </span>
        </div>
    )
}