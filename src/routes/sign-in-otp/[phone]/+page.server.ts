import { CookieUtils } from "$lib/utils/cookie.utils";
import type { PageServerLoad } from "./$types";
import { error, type RequestEvent } from "@sveltejs/kit";
import { SessionHelper } from "../../api/auth/session";
import { loginWithOtp } from "../../api/auth/login.with.otp";
import { redirect } from 'sveltekit-flash-message/server';

////////////////////////////////////////////////////////////////////////

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

export const actions = {

	default: async (event: RequestEvent) => {

        const request = event.request;
        const setHeaders = event.setHeaders;

        const data = await request.formData(); // or .json(), or .text(), etc
        //console.log(Object.fromEntries(data));

        const phone_ = data.has('phone') ? data.get('phone') : null;
        const otp_ = data.has('otp') ? data.get('otp') : null;
        const loginRoleId_ = data.has('loginRoleId') ? data.get('loginRoleId') : null;

        if (!phone_ || !otp_) {
            throw error(400, `Phone or OTP values are ill-formatted!`);
        }
        const otp = otp_.valueOf() as string;
        if (otp.length < 6) {
            throw error(400, `Otp is not valid!`);
        }
        const phone = phone_.valueOf() as string;
        const loginRoleId = loginRoleId_.valueOf() as number;

        try {
            const response = await loginWithOtp(otp, phone, loginRoleId);
            if (response.Status === 'failure' || response.HttpCode !== 200) {
                console.log(response.Message);
                //throw error(response.HttpCode, response.Message);
                throw redirect(
                    303,
                    '/join-raahi/',
                    {
                        type: 'error',
                        message: response.message,
                    },
                    event
                );
            }

            const user = response.Data.User;
            user.SessionId = response.Data.SessionId;
            const accessToken = response.Data.AccessToken;
            const expiryDate = new Date(response.Data.SessionValidTill);
            const sessionId = response.Data.SessionId;
            const userId: string = response.Data.User.id;

            if (user.Role.RoleName !== 'Patient') {
                throw error(400, 'Unsupported user role!');
            }

            const session = await SessionHelper.constructSession(user, accessToken, expiryDate);
            if (session) {
                console.log('Session - ' + JSON.stringify(session, null, 2));
                const userSession = await SessionHelper.addSession(session.sessionId, session);
                console.log(JSON.stringify(userSession, null, 2));
            }
            else {
                console.log(`Session cannot be constructed!`);
                throw error(500, `Use login session cannot be created!`);
            }
            setHeaders({
                'Set-Cookie': CookieUtils.setCookieHeader('sessionId', sessionId, 24 * 7),
            });
            throw redirect(
                303,
                `/users/${userId}/home`,
                {
                    type: 'success',
                    message: response.message,
                },
                event
            );
            // return {
            //     location: `/users/${userId}/home`,
            //     message: response.Message,
            // }
        }
        catch (err) {
            console.error(`Error logging in: ${err.message}`);
            throw error(400, err.message);
        }

    }
};
