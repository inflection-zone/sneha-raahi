import * as cookie from 'cookie';
import type { PageServerLoad } from "./$types";
import { getCourseContentsForLearningPath, getLearningPath } from "../../../../api/services/learning";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params }) => {
    try {
        const cookies = cookie.parse(request.headers.get('cookie') || '');
        const sessionId = cookies['sessionId'];
        const userId = params.userId;
        const learningPathId = params.learningJourneyId;
        const _learningPath = await getLearningPath(sessionId, learningPathId);
        const _courseContents = await getCourseContentsForLearningPath(sessionId, learningPathId);

        console.log(_learningPath);
        const learningPath = _learningPath.LearningPath;
        const courseContents = _courseContents.CourseContents;
        return {
            sessionId,
            userId,
            learningPath,
            courseContents,
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
