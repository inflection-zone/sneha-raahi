import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import { CookieUtils } from "$lib/utils/cookie.utils";
import { SessionHelper } from "./session";
import * as cookie from 'cookie';

////////////////////////////////////////////////////////////////

//TODO: Make sure somehow to clean-up cookie, session and loca storage
//Till then, keep it commented...
//May be that move rest of the actions to the +page.server.ts
//and keep it only backend API call
// export const logout = async (sessionId: string) => {
//     const accessToken = await SessionHelper.getSession(sessionId);
//     const headers = {};
//     headers['Content-Type'] = 'application/json';
//     headers['Authorization'] = `Bearer ${accessToken}`;
//     headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
//     const url = BACKEND_API_URL + '/users/logout';
//     const res = await fetch(url, {
//         method: 'POST',
//         headers
//     });
//     const response = await res.json();
//     return response;
// }

export const POST = async (event) => {

    const data = await event.request.json();

    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const sessionId = cookies['sessionId'];

    const token = data['token'];
    console.log(`Token = ${token}`);

    const accessToken = await SessionHelper.getSession(sessionId);

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = `Bearer ${accessToken}`;
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const url = BACKEND_API_URL + '/users/logout';

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers
        });
        const response = await res.json();
        //console.log(JSON.stringify(response, null, 2));

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            return {
                status : response.HttpCode,
                body : {
                    success: false,
                    message: response.Message
                }
            }
        }

        if (sessionId) {
            const session = await SessionHelper.removeSession(sessionId);
            console.log(JSON.stringify(session, null, 2));
        }

        return {
            status : response.HttpCode,
            body : {
                Success: true,
                Message: response.Message,
            },
            headers: {
                'Set-Cookie' : CookieUtils.removeCookieHeader('sessionId')
            }
        }
    }
    catch (error) {
        console.error(`Error logging in: ${error.message}`);
    }
};
