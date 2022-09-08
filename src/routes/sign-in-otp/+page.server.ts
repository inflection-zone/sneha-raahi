import { BACKEND_API_URL } from "$env/static/private";
import type { LoginModel } from "$lib/types/domain.models";
import { CookieUtils } from "$lib/utils/cookie.utils";
import { Helper } from "$lib/utils/helper";
import { error, type Action } from "@sveltejs/kit";
import { SessionHelper } from "../api/auth/session";
import { getPersonRoleById, getPersonRoles } from "../api/services/types/types";

export const POST: Action = async ({request, locals, setHeaders}) => {

    const data = await request.formData(); // or .json(), or .text(), etc
    console.log(Object.fromEntries(data));

    const otp = data.has('otp') ? data.get('otp') : null;

    if (!otp ) {
        throw error(400, `Otp is not valid!`);
    }

    console.log(`data = ${JSON.stringify(request, null, 2)}`);

    const model: LoginModel = getLoginModel(otp.valueOf() as string);
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
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }

        const user = response.Data.User;
        const accessToken = response.Data.AccessToken;
        const expiryDate = new Date(response.Data.SessionValidTill);
        const sessionId = response.Data.User.SessionId;

        const session = await SessionHelper.constructSession(user, accessToken, expiryDate);
        if (session) {
            //console.log(JSON.stringify(session, null, 2));
            const userSession = await SessionHelper.addSession(session.sessionId, session);
            console.log(JSON.stringify(userSession, null, 2));
        }
        else {
            console.log(`Session cannot be constructed!`);
            throw new Error(`Use login session cannot be created!`);
        }

        const personRoles = await getPersonRoles();
        const currentUserRoleName = getPersonRoleById(personRoles, user.CurrentRoleId);

        if (currentUserRoleName === 'Paitent') {
            setHeaders({
                'Set-Cookie': CookieUtils.setCookieHeader('sessionId', sessionId, 24 * 7),
            });
            return {
                location: '/home',
                message: response.Message,
                user: response.Data.Patient,
                currentUserRoleName,
            }
        }
        else {
            throw error(400, 'Unsupported user role!');
        }
    }
    catch (err) {
        console.error(`Error logging in: ${err.message}`);
        throw error(400, err.message);
    }
}

const getLoginModel = (otp: string): LoginModel => {
 const loginModel: LoginModel = {};
    if(Helper.isOtp(otp)) {
        loginModel.Otp = otp;
    }
    return loginModel;
}

