import {useQuery} from "react-query";
import axios from "axios";
import {UserResponse} from "../models/UserResponse";

export function useQueryUser() {
    return useQuery(["user"], async function() {
        const { data } = await axios.get<UserResponse>(`/api/user`)
        return data
    }, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        retry: false,
    })
}