import {withSessionRoute} from "../../../lib/withSessions";
import {NextApiRequest, NextApiResponse} from "next";
import {GetWatchedRequest} from "../../../models/GetWatchedRequest";
import {getMalAccount} from "../../../lib/getMalAccount";

async function route(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query as GetWatchedRequest
    const offset = ((query.page ?? 1) - 1) * 100
    const account = await getMalAccount(req.session)
    const { data: list } = await account.user.animelist(undefined, undefined, undefined, {status: "completed", offset: offset, limit: 100}).call()
    res.status(200).json(list)
}

export default withSessionRoute(route)