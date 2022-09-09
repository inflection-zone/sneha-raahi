import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import type { LoginModel } from "$lib/types/domain.models";
import { CookieUtils } from "$lib/utils/cookie.utils";
import { Helper } from "$lib/utils/helper";
import type { PageServerLoad } from "../../../../.svelte-kit/types/src/routes/sign-in-otp/[phone]/$types";
import { error, type Action } from "@sveltejs/kit";
import { SessionHelper } from "../../api/auth/session";
import { getPersonRoleById, getPersonRoles } from "../../api/services/types/types";

export const load: PageServerLoad = async ({ params }) => {
    try {
        console.log('Loading params' + JSON.stringify(params, null, 2));
        return {
            phone: params.phone
        };
    }
    catch (error) {
        console.error(`Error logging in: ${error.message}`);
    }
};

export const POST: Action = async ({ request, setHeaders }) => {

    const data = await request.formData(); // or .json(), or .text(), etc
    console.log(Object.fromEntries(data));

    // const otp1 = data.has('otp1') ? data.get('otp1') : null;
    // const otp2 = data.has('otp2') ? data.get('otp2') : null;
    // const otp3 = data.has('otp3') ? data.get('otp3') : null;
    // const otp4 = data.has('otp4') ? data.get('otp4') : null;
    // const otp5 = data.has('otp5') ? data.get('otp5') : null;
    // const otp6 = data.has('otp6') ? data.get('otp6') : null;

    const phone_ = data.has('phone') ? data.get('phone') : null;
    const otp_ = data.has('otp') ? data.get('otp') : null;

    // const otp = otp1 ? otp1.valueOf() as string : '' +
    //     otp2 ? otp2.valueOf() as string : '' +
    //         otp3 ? otp3.valueOf() as string : '' +
    //             otp4 ? otp4.valueOf() as string : '' +
    //                 otp5 ? otp5.valueOf() as string : '' +
    //                     otp6 ? otp6.valueOf() as string : '';

    if (!phone_ || !otp_) {
        throw error(400, `Phone or OTP values are ill-formatted!`);
    }
    const otp = otp_.valueOf() as string;
    const phone = phone_.valueOf() as string;

    if (otp.length < 6) {
        throw error(400, `Otp is not valid!`);
    }

    const model: LoginModel = getLoginModel(otp, phone);
    console.log(JSON.stringify(model, null, 2));

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    const url = BACKEND_API_URL + '/users/login-with-otp';

	console.log(body);
	console.log(url);
	console.log(JSON.stringify(headers, null, 2));

    try {
        const res = await fetch(url, {
            method: 'POST',
            body,
            headers
        });
        const response = await res.json();
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            console.log(response.Message);
            throw error(response.HttpCode, response.Message);
        }

        const user = response.Data.User;
        const accessToken = response.Data.AccessToken;
        const expiryDate = new Date(response.Data.SessionValidTill);
        const sessionId = response.Data.User.SessionId;

        const session = await SessionHelper.constructSession(user, accessToken, expiryDate);
        if (session) {
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

const getLoginModel = (otp: string, phone: string): LoginModel => {
    const loginModel: LoginModel = {
        Phone: phone,
        LoginRoleId: 2,
    };
    if (Helper.isOtp(otp)) {
        loginModel.Otp = otp;
    }
    return loginModel;
}
