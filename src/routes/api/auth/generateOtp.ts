import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import type { OtpModel } from "$lib/types/domain.models";
import { Helper } from "$lib/utils/helper";

export const POST = async (event) => {

    const data = await event.request.json();

    const model: OtpModel = generateOtpModel(data['phone']);
    console.log(JSON.stringify(model, null, 2));


    try {
        const headers = {};
        headers['Content-Type'] = 'application/json';
        headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
        const url = BACKEND_API_URL + '/users/generate-otp';
            const res = await fetch(url, {
            method: 'GET',
            headers
        });
        const response = await res.json();

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            console.log(`status code: ${response.HttpCode}`);
            console.log(`error message: ${response.Message}`);  
        }

        return response.Data.User;
    }
    catch (error) {
        console.error(`Error generating otp: ${error.message}`);
        ;
    }
}

function generateOtpModel(phone: string): OtpModel {
    const OtpModel: OtpModel = {
        RoleId:2,
        Prupose: 'Login'
    };
    
    if (Helper.isPhone(phone)) {
        OtpModel.Phone = phone;
    }

    return OtpModel;
}

