import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { SessionManager } from './routes/api/session.manager';

export const handle: Handle = async ({ event, resolve }) => {

    console.log(`I am inside hooks`);
    // console.log(`path - ${event.request.url}`);
    // console.log(`request = ${JSON.stringify(event.request, null, 2)}`);
    // console.log(`headers = ${JSON.stringify(event.request.headers, null, 2)}`);
    // console.log(`formData = ${JSON.stringify(event.request.formData, null, 2)}`);

    const sessionId = event.cookies.get('sessionId');
    // const sessionId = cookies['sessionId'];
    if (!sessionId) {
        return await resolve(event);
    }

    console.log(`session id received - ${sessionId}`);

    let sessionUser = null;
    const session = await SessionManager.getSession(sessionId);
    if (session) {
        console.log(`session received`);
        sessionUser = {
            sessionId      : session.sessionId,
            userId         : session.userId,
            email          : session.email,
            username       : session.username,
            profileImageUrl: session.profileImageUrl,
            fullName       : session.fullName,
            firstName      : session.firstName,
            roleId         : session.roleId,
        };
    }

    if (sessionUser) {
        event.locals.sessionUser = sessionUser;
    }
    console.log(`returning from hooks`);
    return await resolve(event);
};

export function getSession(event) {
    return event?.locals?.sessionUser ?? {};
}
