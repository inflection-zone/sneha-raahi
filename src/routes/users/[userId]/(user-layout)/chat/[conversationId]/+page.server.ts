import type { PageServerLoad } from "./$types";
import { getConversationById, getConversationMessages } from "../../../../../api/services/chat";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    const userId = event.params.userId;
    const sessionId = event.cookies.get('sessionId');
    const conversationId = event.params.conversationId;
    try {
        const messages = await getConversationMessages(sessionId, conversationId);
        const conversation = await getConversationById(sessionId, conversationId);
        return {
            messages,
            conversation,
        };
    }
    catch (error) {
        console.log(error.stack);
        console.error(`Error retrieving data related to conversation: ${error.message}`);
        return {
            location: `/users/${userId}/chat`,
        };
    }
};
