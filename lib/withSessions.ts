import {GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler} from "next";
import {withIronSessionApiRoute, withIronSessionSsr} from "iron-session/next";

const sessionOptions = {
    password: "kPUCB99GbY2BfTDd4gNrfMehWCRbdTRQ",
    cookieName: "mal-tierlist",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<
    P extends { [key: string]: unknown } = { [key: string]: unknown },
    >(
    handler: (
        context: GetServerSidePropsContext,
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
    return withIronSessionSsr(handler, sessionOptions)
}

declare module "iron-session" {
    interface IronSessionData {
        authentication?: {
            codeVerifier?: string
        }
        user?: {
            accessToken?: string,
            refreshToken?: string,
        }
    }
}