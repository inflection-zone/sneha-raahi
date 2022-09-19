import type { LoginModel } from "$lib/types/domain.models";
import { Helper } from "$lib/utils/helper";
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";

////////////////////////////////////////////////////////////////

export const loginWithOtp = async (otp: string, phone: string, loginRoleId: number) => {

    const model: LoginModel = getLoginModel(otp, phone, loginRoleId);
    console.log(JSON.stringify(model, null, 2));

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    const url = BACKEND_API_URL + '/users/login-with-otp';

	console.log(body);
	console.log(url);
	console.log(JSON.stringify(headers, null, 2));

    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    return response;
};

const getLoginModel = (otp: string, phone: string, loginRoleId: number): LoginModel => {
    const loginModel: LoginModel = {
        Phone: Helper.sanitizePhone(phone),
        LoginRoleId: loginRoleId ?? 2,
    };
    if (Helper.isOtp(otp)) {
        loginModel.Otp = otp;
    }
    return loginModel;
}
