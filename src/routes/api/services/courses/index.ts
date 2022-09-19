import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import { SessionHelper } from "../../auth/session";

////////////////////////////////////////////////////////////////

export const getAvailableCourses = async (sessionId: string) => {

    const session = await SessionHelper.getSession(sessionId);
    const accessToken = session.accessToken;
    console.log(`accessToken = ${accessToken}`);

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;

    const url = BACKEND_API_URL + '/educational/course/courses/search';

	console.log(url);
	console.log(JSON.stringify(headers, null, 2));

    const res = await fetch(url, {
        method: 'GET',
        headers
    });
    const response = await res.json();
    return response;
};

export const getAvailableModulesForCourse = async (sessionId: string, courseId: string) => {

    const accessToken = await SessionHelper.getSession(sessionId);
    console.log(`accessToken = ${accessToken}`);

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;

    const url = BACKEND_API_URL + `/educational/course-modules/search?courseId=${courseId}`;

	// console.log(url);
	// console.log(JSON.stringify(headers, null, 2));

    const res = await fetch(url, {
        method: 'GET',
        headers
    });
    const response = await res.json();
    return response;
};

export const getAvailableContentForModule = async (sessionId: string, moduleId: string) => {

    const accessToken = await SessionHelper.getSession(sessionId);
    console.log(`accessToken = ${accessToken}`);

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;

    const url = BACKEND_API_URL + `/educational/course-contents/search?moduleId=${moduleId}`;

	// console.log(url);
	// console.log(JSON.stringify(headers, null, 2));

    const res = await fetch(url, {
        method: 'GET',
        headers
    });
    const response = await res.json();
    return response;
};

export const getEnrolledCoursesForUser = async (sessionId: string, userId: string) => {

    const accessToken = await SessionHelper.getSession(sessionId);
    console.log(`accessToken = ${accessToken}`);

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;

    const url = BACKEND_API_URL + `/educational/course-enrollments/search?userId=${userId}`;

	// console.log(url);
	// console.log(JSON.stringify(headers, null, 2));

    const res = await fetch(url, {
        method: 'GET',
        headers
    });
    const response = await res.json();
    return response;
};
