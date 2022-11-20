import {useWatchedAnime} from "../hooks/useWatchedAnime";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TierComponent from "../components/TierComponent";
import {AnimeScore} from "../lib/aliases";

const scoreList: AnimeScore[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

export default function TierListPage() {
    const watchedAnime = useWatchedAnime()

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {!!watchedAnime ?
                    <>
                        {scoreList.map((score) =>
                            <TierComponent key={score} animeList={watchedAnime?.get(score)} animeScore={score} />
                        )}
                    </>
                    : "Loading..."}
            </div>
        </DndProvider>
    )
}