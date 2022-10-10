import * as cookie from 'cookie';
import type { PageServerLoad } from "./$types";
import { getAllCourseContents, getAllLearningPaths, getUserLearningPaths } from "../../../api/services/learning";
import { SessionHelper } from '../../../api/auth/session';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params }) => {
    try {

        const cookies = cookie.parse(request.headers.get('cookie') || '');
        const sessionId = cookies['sessionId'];
        const session = await SessionHelper.getSession(sessionId);

        const sessionUser = {
                email          : session.email,
                username       : session.username,
                profileImageUrl: session.profileImageUrl,
                fullName       : session.fullName,
                firstName      : session.firstName,
                age            : session.age  
            };
        const userId = params.userId;
        const allLearningPaths = await getAllLearningPaths(sessionId);
        const userLearningPaths = await getUserLearningPaths(sessionId, userId);
        const allCourseContents = await getAllCourseContents(sessionId);
        return {
            sessionId,
            sessionUser,
            userId,
            allLearningPaths,
            allCourseContents,
            userLearningPaths
        };
    }
    catch (error) {
        console.log(error.stack)
        console.error(`Error retrieving data related to user's courses: ${error.message}`);
        return {
            location: `/sign-in`,
        };
    }
};
