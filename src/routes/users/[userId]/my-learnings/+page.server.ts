import * as cookie from 'cookie';
import type { PageServerLoad } from "./$types";
import { getAllCourseContents, getAllLearningPaths, getUserLearningPaths } from "../../../api/services/learning";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params }) => {
    try {

        const cookies = cookie.parse(request.headers.get('cookie') || '');
        const sessionId = cookies['sessionId'];
        const userId = params.userId;
        const allLearningPaths = await getAllLearningPaths(sessionId);
        const userLearningPaths = await getUserLearningPaths(sessionId, userId);
        const allCourseContents = await getAllCourseContents(sessionId);
        return {
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
