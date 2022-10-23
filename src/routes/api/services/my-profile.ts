import { BACKEND_API_URL } from "$env/static/private";
import { get_ } from "./common";

export const getUserById = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/patients/${userId}`;
    return await get_(sessionId, url);
};