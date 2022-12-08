import type { PageServerLoad } from "./$types";
import { getConversationById, getConversationMessages } from "../../../../../api/services/chat";
import { getConversationDetails, getDateSegregatedMessages } from './conversation.utils';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    const userId = event.params.userId;
    const sessionId = event.cookies.get('sessionId');
    const conversationId = event.params.conversationId;
    try {
        const messages_ = await getConversationMessages(sessionId, conversationId);
        const messages = await getDateSegregatedMessages(messages_.ConversationMessages);
        const conversation_ = await getConversationById(sessionId, conversationId);
        const conversation = getConversationDetails(userId, conversation_.Conversation);
        return {
            sessionId,
            userId,
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
