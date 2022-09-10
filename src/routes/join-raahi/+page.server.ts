import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from '$env/static/private';
import type { PersonRole, UserModel } from '$lib/types/domain.models';
import { CookieUtils } from '$lib/utils/cookie.utils';
import { Helper } from '$lib/utils/helper';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { error, redirect, type Action } from '@sveltejs/kit';

export const POST: Action = async ({ request }) => {
	const data = await request.formData(); // or .json(), or .text(), etc
	console.log(Object.fromEntries(data));

	const countryCode = '+91';
	const firstName = data.has('firstName') ? data.get('firstName') : null;
	const lastName = data.has('lastName') ? data.get('lastName') : null;
	const age = data.has('age') ? data.get('age') : null;
	const location = data.has('location') ? data.get('location') : null;
	const phone = data.has('phone') ? data.get('phone') : null;

	if (!phone && !countryCode) {
		throw error(400, `Phone is not valid!`);
	}

	console.log(`data = ${JSON.stringify(request, null, 2)}`);

	const model: UserModel = getUserModel(
		firstName.valueOf() as string,
		lastName.valueOf() as string,
		age.valueOf() as string,
		phone.valueOf() as string,
		location.valueOf() as string
	);
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
		return {
			location: `/sign-in`,
			message: response.Message,
		};
	} catch (err) {
		console.error(`Error registering user in: ${err.message}`);
		throw error(400, err.message);
	}
};

const getUserModel = (
	firstName: string,
	lastName: string,
	age: string,
	phone: string,
	location: string
): UserModel => {
	const userModel: UserModel = {};
	userModel.FirstName = firstName;
	userModel.LastName = lastName;
	userModel.Age = age;
	// userModel.Location= location;
	if (Helper.isPhone(phone)) {
		userModel.Phone = '+91-' + phone;
	}
	return userModel;
};


