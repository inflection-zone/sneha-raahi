import * as cookie from 'cookie';
import type { PageServerLoad } from "./$types";
import { getCourseContentsForLearningPath, getLearningPath, getUserLearningPaths } from "../../../../api/services/learning";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params }) => {
    try {
        const cookies = cookie.parse(request.headers.get('cookie') || '');
        const sessionId = cookies['sessionId'];
        const userId = params.userId;
        const learningPathId = params.learningJourneyId;
        const _learningPath = await getLearningPath(sessionId, learningPathId);
        const _courseContents = await getCourseContentsForLearningPath(sessionId, learningPathId);
        const _userLearningPaths = await getUserLearningPaths(sessionId, userId);

        console.log(_learningPath);
        const learningPath = _learningPath.LearningPath;
        const courseContents = _courseContents.CourseContents;
        const userLearningPaths = _userLearningPaths.UserLearningPaths;
        return {
            sessionId,
            userId,
            learningPath,
            courseContents,
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
