import { error, type Action } from '@sveltejs/kit';
import { registerUser } from '../api/auth/register.user';

///////////////////////////////////////////////////////////////////////////////////

export const POST: Action = async ({ request }) => {
	const data = await request.formData(); // or .json(), or .text(), etc
	//console.log(Object.fromEntries(data));

	const countryCode = '+91';
	const firstName = data.has('firstName') ? data.get('firstName') : null;
	const lastName = data.has('lastName') ? data.get('lastName') : null;
	const age = data.has('age') ? data.get('age') : null;
	const location = data.has('location') ? data.get('location') : null;
	const phone = data.has('phone') ? data.get('phone') : null;

	if (!phone && !countryCode) {
		throw error(400, `Phone is not valid!`);
	}

	try {
		const response = await registerUser(
			firstName.valueOf() as string,
			lastName.valueOf() as string,
			age.valueOf() as string,
			phone.valueOf() as string,
			location.valueOf() as string);

		console.log(JSON.stringify(response, null, 2));

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			console.log(response.Message);
			throw error(response.HttpCode, response.Message);
		}
		console.log(`Reached here...`)
		return {
			location: `/sign-in`,
		};
	} catch (err) {
		console.error(`Error registering user in: ${err.message}`);
		throw error(400, err.message);
	}
};
