import type { PageServerLoad, Action } from './$types';
import type {  RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getUserById} from '../../../../../routes/api/services/user';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
    const userId = event.params.userId;
    const _user = await getUserById(sessionId, userId);
    const user = _user.Patient;
    console.log('User...............', user);
    return {
      user,
      sessionId
    };
  
};
