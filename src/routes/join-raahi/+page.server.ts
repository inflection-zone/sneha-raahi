import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from '$env/static/private';
import type { UserModel } from '$lib/types/domain.models';
import { Helper } from '$lib/utils/helper';
import { error, type Action } from '@sveltejs/kit';
import { getPersonRoleById, getPersonRoles } from '../api/services/types/types';

export const POST: Action = async ({ request }) => {
	const data = await request.formData(); // or .json(), or .text(), etc
	console.log(Object.fromEntries(data));

	const countryCode = '+91';
	// const FirstName = data.has('firstName') ? data.get('firstName') : null;
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
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}

		// const user = response.Data.User;
		// const personRoles = await getPersonRoles();
		// const currentUserRoleName = getPersonRoleById(personRoles, user.CurrentRoleId);

		// if(currentUserRoleName === 'paitent')
		return {
			location: `/sign-in-otp`,
			message: response.Message
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
	// console.log(`phone = ${phone}`);

	const userModel: UserModel = {};
	userModel.FirstName = firstName;
	userModel.LastName = lastName;
	userModel.Age = age;
	// userModel.Location= location;
	if (Helper.isPhone(phone)) {
		userModel.Phone = phone;
	}
	return userModel;
};
