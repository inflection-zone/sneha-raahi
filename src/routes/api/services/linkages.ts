import { BACKEND_API_URL } from "$env/static/private";
import { get_} from "./common";
////////////////////////////////////////////////////////////////

export const getAllLinkages = async (sessionId: string) => {
    const url = BACKEND_API_URL + '/notices/search';
    return await get_(sessionId, url);
};

export const getLinkageById = async (sessionId: string, noticeId: string) => {
    const url = BACKEND_API_URL + `/notices/${noticeId}`;
    return await get_(sessionId, url);
};
