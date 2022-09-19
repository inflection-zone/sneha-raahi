import type { LoginModel, OtpModel } from "$lib/types/domain.models";
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import { Helper } from "$lib/utils/helper";

////////////////////////////////////////////////////////////////

export const sendOtp = async (phone: string, loginRoleId: number) => {

    const model: LoginModel = getOtpModel(phone, loginRoleId);
    console.log(JSON.stringify(model, null, 2));

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    const url = BACKEND_API_URL + '/users/generate-otp';

	// console.log(body);
	// console.log(url);
	// console.log(JSON.stringify(headers, null, 2));

    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    return response;
};

const getOtpModel = (phone: string, loginRoleId: number): OtpModel => {
    const loginModel: OtpModel = {
        Phone: Helper.sanitizePhone(phone),
        RoleId: loginRoleId ?? 2,
        Purpose: 'Login'
    };
    return loginModel;
}
