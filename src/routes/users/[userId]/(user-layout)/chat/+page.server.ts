import type { PageServerLoad } from "./$types";
import { getMyFavouriteConversations, getMyRecentConversations } from "../../../../api/services/chat";
import hrt from 'human-readable-time';

////////////////////////////////////////////////////////////////////////

const getConversationDetails = (userId, x) => {
    const profileImage = userId === x.OtherUser.id ? x.InitiatingUser.ProfileImage : x.OtherUser.ProfileImage;
    return {
        id: x.id,
        favourite: x.Marked,
        otherUserId: userId === x.OtherUser.id ? x.InitiatingUser.id : x.OtherUser.id,
        displayName: userId === x.OtherUser.id ? x.InitiatingUser.DisplayName : x.OtherUser.DisplayName,
        firstName: userId === x.OtherUser.id ? x.InitiatingUser.FirstName : x.OtherUser.FirstName,
        lastName: userId === x.OtherUser.id ? x.InitiatingUser.LastName : x.OtherUser.LastName,
        prefix: userId === x.OtherUser.id ? x.InitiatingUser.Prefix : x.OtherUser.Prefix,
        profileImage: profileImage ?? null,
        lastChatDate: hrt(new Date(x.LastMessageTimestamp), '%relative% ago'),
    }
}

export const load: PageServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        const userId = event.params.userId;
        const favouriteConversations_ = await getMyFavouriteConversations(sessionId, userId);
        const recentConversations_ = await getMyRecentConversations(sessionId, userId);
        const favouriteConversations = favouriteConversations_.Conversations.map(x => getConversationDetails(userId, x));
        const recentConversations = recentConversations_.Conversations.map(x => getConversationDetails(userId, x));
        return {
            sessionId,
            userId,
            favouriteConversations,
            recentConversations,
        };
    }
    catch (error) {
        console.log(error.stack)
        console.error(`Error retrieving data related to user's favourite and recent conversations: ${error.message}`);
        return {
            location: `/sign-in`,
        };
    }
};
