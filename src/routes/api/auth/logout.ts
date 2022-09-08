import { BACKEND_API_URL } from "$env/static/private";
import { CookieUtils } from "$lib/utils/cookie.utils";
import { SessionHelper } from "./session";
import * as cookie from 'cookie';

////////////////////////////////////////////////////////////////

export const POST = async (event) => {

    const data = await event.request.json();

    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const sessionId = cookies['sessionId'];

    const token = data['token'];
    console.log(`Token = ${token}`);

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = `Bearer ${token}`;
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
