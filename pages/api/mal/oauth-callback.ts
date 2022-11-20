import {NextApiRequest, NextApiResponse} from "next";
import {OauthCallbackRequest} from "../../models/OauthCallbackRequest";
import {withSessionRoute} from "../../../lib/withSessions";
import axios from "axios";
import * as queryString from "querystring";
import {OauthAuthenticationResponse} from "../../models/OauthAuthenticationResponse";

async function route(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const query = req.query as OauthCallbackRequest

    const params = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: query.code,
        redirect_uri: `${process.env.BASE_URL}/api/mal/oauth-callback`,
        code_verifier: req.session.authentication!.codeVerifier,
    }

    const authenticationResponse = await axios.post<OauthAuthenticationResponse>("https://myanimelist.net/v1/oauth2/token", queryString.stringify(params),{
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })

    req.session.user = {
        accessToken: authenticationResponse.data.access_token,
        refreshToken: authenticationResponse.data.refresh_token,
    }
    await req.session.save()

    res.redirect("/tierlist")
}

export default withSessionRoute(route);