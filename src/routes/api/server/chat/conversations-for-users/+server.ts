import { getConversationsBetweenTwoUsers } from "../../../services/chat";

//////////////////////////////////////////////////////////////

export const GET = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Getting conversation between two users...');
		const response = await getConversationsBetweenTwoUsers(
			data.sessionId,
            data.userId,
            data.otherUserId,
		);
        const c = response.Conversation;
        let conversation = {};
        if (c) {
            const otherUserId = data.userId === c.InitiatingUserId ? c.OtherUserId : c.InitiatingUserId;
            const otherUser = data.userId === c.InitiatingUserId ? {
                id: c.OtherUser.id,
                FirstName: c.OtherUser.FirstName,
                LastName: c.OtherUser.LastName,
                Prefix: c.OtherUser.Prefix,
                DisplayName: c.OtherUser.DisplayName,
            }: {
                id: c.InitiatingUser.id,
                FirstName: c.InitiatingUser.FirstName,
                LastName: c.InitiatingUser.LastName,
                Prefix: c.InitiatingUser.Prefix,
                DisplayName: c.InitiatingUser.DisplayName,
            };
            conversation = {
                id: c.id,
                Marked: c.Marked,
                UserId: data.userId === c.InitiatingUserId ? c.InitiatingUserId : c.OtherUserId,
                OtherUserId: otherUserId,
                OtherUser: otherUser,
            }
        }
		return new Response(JSON.stringify(conversation));
	} catch (err) {
		console.error(`Error updating user learning: ${err.message}`);
		return new Response(err.message);
	}
};
