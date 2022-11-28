import {UserResponse} from "../models/UserResponse";
import {getMalAccount} from "./getMalAccount";
import {IronSession} from "iron-session";

async function getUser(session: IronSession) : Promise<UserResponse> {
    if (!session.malToken)
        throw new Error("Not logged in")

    const account = await getMalAccount(session)
    return {name: (await account.user.info().call()).name}
}

export default getUser