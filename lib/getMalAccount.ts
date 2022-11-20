import {Mal} from "node-myanimelist";
import {IronSession} from "iron-session";

export async function getMalAccount(session: IronSession) {
    const auth = Mal.auth(process.env.CLIENT_ID)
    const token = Mal.MalToken.fromJsonString(session.malToken!)

    try {
        const account = await auth.loadToken(token)
        return account
    }
    catch (e) {
        const account = await auth.authorizeWithRefreshToken(token.refresh_token)
        session.malToken = account.stringifyToken()!
        await session.save()
        return account
    }
}