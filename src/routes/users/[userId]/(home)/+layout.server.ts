import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { SessionHelper } from '../../../api/auth/session';

////////////////////////////////////////////////////////////////

export const load: LayoutLoad = async (event) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const sessionId = cookies['sessionId'];
	console.log(`session id received - ${sessionId}`);

	const session = await SessionHelper.getSession(sessionId);
	if (!session) {
		throw redirect(307, '/sign-in');
	}
	console.log(`session received`);

	const sessionUser = {
		sessionId: session.sessionId,
		userId: session.userId,
		email: session.email,
		username: session.username,
		profileImageUrl: session.profileImageUrl,
		fullName: session.fullName,
		firstName: session.firstName,
		roleId: session.roleId
	};
	return sessionUser;
};
