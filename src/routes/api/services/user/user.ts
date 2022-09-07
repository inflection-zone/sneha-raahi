import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import type { UserModel as UserRegistrationModel } from "$lib/types/domain.models";
import { Helper } from "$lib/utils/helper";

export const POST = async (event ) => {

    const data = await event.request.json();
    
    const model: UserRegistrationModel = getUserModel(data['firstName'], data['lastName'], data['age'], data['phone'], data['location'],);
    console.log(JSON.stringify(model, null, 2));

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    const url = BACKEND_API_URL + '/patients';

    try {
        const res = await fetch(url, {
            method: 'POST',
            body,
            headers
        });
        const response = await res.json();
        console.log(JSON.stringify(response, null, 2));

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            return {
                status : response.HttpCode,
                body : {
                    success: false,
                    message: response.Message
                }
            }
        }

        return {
            status : response.HttpCode,
            body : {
                success: true,
                message: response.Message,
                paitent: response.Data.Patient,
            },
           headers
        }
    }
    catch (error) {
        console.error(`Error registering user : ${error.message}`);
    }
};

const getUserModel = (firstName:string, lastName:string, age:string, phone:string ,location:string): UserRegistrationModel => {

    // console.log(`phone = ${phone}`);

    const userModel: UserRegistrationModel = {} ;
    userModel.FirstName = firstName;
    userModel.LastName = lastName;
    userModel.Age= age;
    // userModel.Location = location;
    if (Helper.isPhone(phone)) {
        userModel.Phone = phone;
    }
    return userModel;
}

