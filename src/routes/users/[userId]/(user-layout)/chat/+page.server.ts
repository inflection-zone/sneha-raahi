import type { PageServerLoad } from "./$types";
import { getMyFavouriteConversations, getMyRecentConversations } from "../../../../api/services/chat";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        const userId = event.params.userId;
        const favouriteConversations = await getMyFavouriteConversations(sessionId, userId);
        const recentConversations = await getMyRecentConversations(sessionId, userId);
        return {
            sessionId,
            userId,
            favouriteConversations,
            recentConversations,
        };
    }
    catch (error) {
        console.log(error.stack)
        console.error(`Error retrieving data related to user's courses: ${error.message}`);
        return {
            location: `/sign-in`,
        };
    }
};
