import { getConversationMessages } from "../../../services/chat";

//////////////////////////////////////////////////////////////

export const GET = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Getting conversation messages...');
		const response = await getConversationMessages(
			data.sessionId,
            data.conversationId,
		);
        const messages = response.ConversationMessages;
        const sorted = messages.sort((a, b)=> {
            return a.CreatedAt > b.CreatedAt;
        });
		return new Response(JSON.stringify(sorted));
	} catch (err) {
		console.error(`Error updating user learning: ${err.message}`);
		return new Response(err.message);
	}
};
