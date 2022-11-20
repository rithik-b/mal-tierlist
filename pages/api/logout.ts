import {NextApiRequest, NextApiResponse} from "next";
import {withSessionRoute} from "../../lib/withSessions";
import {getMalAccount} from "../../lib/getMalAccount";

async function route(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET")
        return res.status(405).json({error: "Method not allowed"})

    await req.session.destroy()
    res.redirect("/")
}

export default withSessionRoute(route);