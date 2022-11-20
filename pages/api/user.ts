import {NextApiRequest, NextApiResponse} from "next";
import {withSessionRoute} from "../../lib/withSessions";
import {getMalAccount} from "../../lib/getMalAccount";

async function route(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET")
        return res.status(405).json({error: "Method not allowed"})

    if (!req.session.malToken)
        return res.status(401).json({error: "Not logged in"})

    const account = await getMalAccount(req.session)
    res.status(200).json({name: (await account.user.info().call()).name})
}

export default withSessionRoute(route);