import { BACKEND_API_URL } from "$env/static/private";
import { get_} from "./common";
////////////////////////////////////////////////////////////////

export const getAllNotifications = async (sessionId: string) => {
    const url = BACKEND_API_URL + '/general/notifications/search';
    return await get_(sessionId, url);
};

