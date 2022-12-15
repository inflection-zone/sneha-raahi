import type { PageServerLoad} from './$types';
import type {  RequestEvent } from '@sveltejs/kit';
import { getUserById} from '../../../../../routes/api/services/user';
import { searchUserConversations } from '../../../../../routes/api/services/chat';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
    const userId = event.params.userId;
    const _user = await getUserById(sessionId, userId);
    const _allConversations = await searchUserConversations(sessionId, userId);
    const user = _user.Patient;
    const allConversations = _allConversations.UserConversations.Items;
    console.log("All conversation",allConversations);
    return {
      user,
      sessionId,
      allConversations
    };
  
};
