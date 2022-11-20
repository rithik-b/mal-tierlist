import {withSessionRoute} from "../../../lib/withSessions";
import {NextApiRequest, NextApiResponse} from "next";
import {Mal} from "node-myanimelist";
import {GetWatchedRequest} from "../../models/GetWatchedRequest";

async function route(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query as GetWatchedRequest
    const offset = ((query.page ?? 1) - 1) * 100

    const auth = Mal.auth(process.env.CLIENT_ID)
    const token = Mal.MalToken.fromJsonString(req.session.malToken!)
    const account = await auth.loadToken(token)

    const { data: list } = await account.user.animelist(undefined, undefined, undefined, {status: "completed", offset: offset, limit: 100}).call()
    res.status(200).json(list)
}

export default withSessionRoute(route)