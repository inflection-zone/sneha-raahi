import type { UserModel } from "$lib/types/domain.models";
import { Helper } from "$lib/utils/helper";
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";

////////////////////////////////////////////////////////////////

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
