import { useQuery } from "react-query";
import axios from "axios";
import {OauthUrlResponse} from "../models/OauthUrlResponse";

export function useOauthUrl() {
    return useQuery(["oauthUrl"], async function() {
        const { data } = await axios.get<OauthUrlResponse>("/api/mal/oauth-url")
        return data
    }).data
}