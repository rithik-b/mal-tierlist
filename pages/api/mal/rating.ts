import {NextApiRequest, NextApiResponse} from "next";
import {getMalAccount} from "../../../lib/getMalAccount";
import {withSessionRoute} from "../../../lib/withSessions";
import {SetRatingRequest} from "../../../models/SetRatingRequest";

async function route(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT")
        return res.status(405).json({error: "Method not allowed"})

    const body = req.body as SetRatingRequest

    if (!body.animeId || !body.score)
        return res.status(400).json({error: "Missing animeId or score"})

    const account = await getMalAccount(req.session)
    await account.anime.updateMyAnime(body.animeId, {score: body.score}).call()
    res.status(200).json({})
}

export default withSessionRoute(route)