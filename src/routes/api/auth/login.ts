import type { LoginModel } from "$lib/types/domain.models";
import { Helper } from "$lib/utils/helper";
import { BACKEND_API_URL } from "$env/static/private";
import { CookieUtils } from "$lib/utils/cookie.utils";
import { SessionHelper } from './session';

////////////////////////////////////////////////////////////////

export const POST = async (event) => {

    const data = await event.request.json();

    const model: LoginModel = getLoginModel(data['otp']);
    console.log(JSON.stringify(model, null, 2));

    const headers = {};
    headers['Content-Type'] = 'application/json';
    const body = JSON.stringify(model);
    const url = BACKEND_API_URL + ('/users/login-otp');

    try {
        const res = await fetch(url, {
            method: 'POST',
            body,
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
        const session = await SessionHelper.constructSession(
            response.Data.User,
            response.Data.AccessToken,
            new Date(response.Data.SessionValidTill));
        if (session) {
            console.log(JSON.stringify(session, null, 2));
            const userSession = await SessionHelper.addSession(session.sessionId, session);
            console.log(JSON.stringify(userSession, null, 2));
        }
        else {
            console.log(`Session cannot be constructed!`);
        }
         return {
            status : response.HttpCode,
            body : {
                success: true,
                message: response.Message,
                user: response.Data.User,
            },
            headers: {
                'Set-Cookie': CookieUtils.setCookieHeader('sessionId', response.Data.User.SessionId, 24 * 7),
            },
        }
    }
    catch (error) {
        console.error(`Error logging in: ${error.message}`);
    }
};

const getLoginModel = (otp: string): LoginModel => {
    const loginModel: LoginModel = {};
    if(Helper.isOtp(otp)) {
        loginModel.Otp = otp;
    }
    return loginModel;
}
