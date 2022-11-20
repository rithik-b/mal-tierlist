import type { NextApiRequest, NextApiResponse } from 'next'
import {OauthUrlResponse} from "../../models/OauthUrlResponse"
import pkceChallenge from "pkce-challenge"
import {withSessionRoute} from "../../../lib/withSessions";

async function route(req: NextApiRequest, res: NextApiResponse<OauthUrlResponse>) {
  const pkce = pkceChallenge()
  req.session.codeVerifier = pkce.code_challenge
  await req.session.save()

  const oauthUrl = new URL("https://myanimelist.net/v1/oauth2/authorize")
  oauthUrl.searchParams.append("response_type", "code")
  oauthUrl.searchParams.append("client_id", process.env.CLIENT_ID!)
  oauthUrl.searchParams.append("code_challenge", pkce.code_challenge)
  oauthUrl.searchParams.append("code_challenge_method", "plain")
  oauthUrl.searchParams.append("redirect_uri", `${process.env.BASE_URL}/api/mal/oauth-callback`)

  res.status(200).json({ url: oauthUrl.href })
}

export default withSessionRoute(route);