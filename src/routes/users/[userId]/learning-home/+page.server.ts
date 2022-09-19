
import type { PageServerLoad } from ".svelte-kit/types/src/routes/todos/$types";
import {redirect } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { SessionHelper } from '../../../api/auth/session';
import { getAvailableCourses } from "../../../api/services/course/courses";

////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {

    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const sessionId = cookies['sessionId'];
    console.log(`session id received - ${sessionId}`);

    const session = await SessionHelper.getSession(sessionId);
    if (!session) {
        throw redirect(307, '/sign-in');
    }
    console.log(`session received`);

    const availableCourses = await getAvailableCourses(sessionId);

    console.log(`Available courses = ${JSON.stringify(availableCourses)}`)

    return availableCourses;
};
