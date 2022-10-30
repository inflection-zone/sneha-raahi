import type { LoginModel, OtpModel } from "$lib/types/domain.models";
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import { Helper } from "$lib/utils/helper";
import type { UserModel } from "$lib/types/domain.models";

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

////////////////////////////////////////////////////////////////////////////////////

export const registerUser = async (
    firstName: string,
    lastName: string,
    age: string,
    phone: string,
    address: string) => {

    const model: UserModel = getUserModel(
        firstName, lastName, age, phone, address);

    console.log(JSON.stringify(model, null, 2));

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
	const url = BACKEND_API_URL + '/patients';

    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    return response;
};

const getUserModel = (
    firstName: string,
    lastName: string,
    age: string,
    phone: string,
    address?: string
): UserModel => {
    const userModel: UserModel = {};
    userModel.FirstName = firstName;
    userModel.LastName = lastName;
    userModel.Age = age;
    userModel.Address= address;
    if (Helper.isPhone(phone)) {
        userModel.Phone = Helper.sanitizePhone(phone);
    }
    return userModel;
};

////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////
