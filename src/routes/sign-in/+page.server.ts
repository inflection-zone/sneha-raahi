
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from '$env/static/private';
import type { OtpModel} from '$lib/types/domain.models';
import { Helper } from '$lib/utils/helper';
import { error, type Action } from '@sveltejs/kit';

export const POST: Action = async ({ request }) => {
	const data = await request.formData(); // or .json(), or .text(), etc
	console.log(Object.fromEntries(data));

	const phone = data.has('phone') ? data.get('phone') : null;

	if (!phone) {
		throw error(400, `Phone is not valid!`);
	}
	console.log(`data = ${JSON.stringify(request, null, 2)}`);

	const model: OtpModel = generateOtpModel(phone.valueOf() as string,);
	console.log(JSON.stringify(model, null, 2));

	const headers = {};
	headers['Content-Type'] = 'application/json';
	headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
	const body = JSON.stringify(model);
	const url = BACKEND_API_URL + '/users/generate-otp';

	// console.log(body);
	// console.log(url);
	// console.log(JSON.stringify(headers, null, 2));

	const phoneWithCountryCode = '+91-' + phone;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body,
			headers
		});
		const response = await res.json();
		return {
			location: `/sign-in-otp/${phoneWithCountryCode}`,
			message: response.Message,
			phone: phoneWithCountryCode,
		};
	} catch (err) {
		console.error(`Error generating otp: ${err.message}`);
		throw error(400, err.message);
	}
};

function generateOtpModel(phone: string): OtpModel {
    const OtpModel: OtpModel = {
        RoleId 	: 2,
        Prupose : 'Login'
    };
    if (Helper.isPhone(phone)) {
        OtpModel.Phone = '+91-' + phone;
    }
    return OtpModel;
}

