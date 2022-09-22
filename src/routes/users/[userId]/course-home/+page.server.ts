import * as cookie from 'cookie';
import type { PageServerLoad } from "./$types";
// import { getAvailableCourses, getEnrolledCoursesForUser } from "../../../api/services/learning";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params, setHeaders }) => {
    try {

    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const sessionId = cookies['sessionId'];
    const userId = params.userId;
    // const resCourses = await getAvailableCourses(sessionId);
    // const availableCourses = resCourses.Data;
    // const resUserEnrolledCourses = await getEnrolledCoursesForUser(sessionId, userId);
    // const userEnrolledCourses = resUserEnrolledCourses.Data;
        return {
            userId,
            // availableCourses,
            //userEnrolledCourses
        };
    }
    catch (error) {
        console.error(`Error retrieving data related to user's courses: ${error.message}`);
    }
};
