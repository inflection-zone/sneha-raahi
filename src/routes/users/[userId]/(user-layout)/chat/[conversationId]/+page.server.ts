import type { PageServerLoad } from "./$types";
import { getConversationById, getConversationMessages } from "../../../../../api/services/chat";
import hrt from 'human-readable-time';

////////////////////////////////////////////////////////////////////////

const getConversationDetails = (userId, conversation) => {
    //console.log(`x = ${JSON.stringify(conversation, null, 2)}`);
    const profileImage = userId === conversation.OtherUser.id ? conversation.InitiatingUser.ProfileImage : conversation.OtherUser.ProfileImage;
    return {
        id: conversation.id,
        favourite: conversation.Marked,
        otherUserId: userId === conversation.OtherUser.id ? conversation.InitiatingUser.id : conversation.OtherUser.id,
        displayName: userId === conversation.OtherUser.id ? conversation.InitiatingUser.DisplayName : conversation.OtherUser.DisplayName,
        firstName: userId === conversation.OtherUser.id ? conversation.InitiatingUser.FirstName : conversation.OtherUser.FirstName,
        lastName: userId === conversation.OtherUser.id ? conversation.InitiatingUser.LastName : conversation.OtherUser.LastName,
        prefix: userId === conversation.OtherUser.id ? conversation.InitiatingUser.Prefix : conversation.OtherUser.Prefix,
        profileImage: profileImage ?? null,
        lastChatDate: hrt(new Date(conversation.LastMessageTimestamp), '%relative% ago'),
    }
}

const getDateSegregatedMessages = (messages) => {
    //console.log(`Messages = ${JSON.stringify(messages, null, 2)}`)
    const messages_ = messages.map(x => {
            return {
            ...x,
            dateStr: new Date(x.UpdatedAt)?.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
            date: new Date(new Date(x.UpdatedAt)?.toISOString().split('T')[0])
        };
    });
    const segregatedMessages_ = Object.values(messages_.reduce((messages_, x) => {
        messages_[x.dateStr] = [...(messages_[x.dateStr] || []), x ];
        return messages_;
      }, {}));

    const sorter = (a, b) => {
        return (a.date as Date).getTime() - b.date.getTime()
    };

    const segregatedMessages = [];
    for (const sgArr of segregatedMessages_) {
        const x = {
            dateStr: sgArr[0].dateStr,
            date: sgArr[0].date,
            messagesForTheDay: (sgArr as []).sort(sorter),
        }
        segregatedMessages.push(x);
    }
    const sortedMessages = segregatedMessages.sort(sorter);
    //console.log(JSON.stringify(sortedMessages, null, 2));

    return sortedMessages;
}

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
