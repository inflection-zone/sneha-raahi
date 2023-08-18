import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { getOrganizations, registerUser } from '../api/services/user';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';
import { getGenderTypes, getPersonRoles } from "../api/services/types";
import type { PersonRole } from '$lib/types/domain.models';

///////////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	try {
		console.log('Join Raahi ...' + JSON.stringify(event, null, 2));
		const roles: PersonRole[] = await getPersonRoles();
		const genderTypes: string[] = await getGenderTypes();
		const organizations = await getOrganizations();
		return {
			message: 'Common data successfully retrieved!',
			roles,
			genderTypes,
		  organizations
		};
	}
	catch (error) {
		console.error(`Error logging in: ${error.message}`);
	}
};

export const actions = {

	default: async (event: RequestEvent) => {

		const request = event.request;

		const data = await request.formData();
		console.log("Form data", Object.fromEntries(data));

		const countryCode = '+91';
		const firstName = data.has('firstName') ? data.get('firstName') : null;
		const lastName = data.has('lastName') ? data.get('lastName') : null;
		const birthDate = data.has('birthDate') ? data.get('birthDate') : null;
		// const address = data.has('address') ? data.get('address') : null;
		const phone = data.has('phone') ? data.get('phone') : null;
		const locationId = data.has('locationId') ? data.get('locationId') : null;

		if (!phone && !countryCode) {
			throw error(400, `Phone is not valid!`);
		}

		const response = await registerUser(
			firstName.valueOf() as string,
			lastName.valueOf() as string,
			birthDate.valueOf() as Date,
			phone.valueOf() as string,
			// address.valueOf() as string,
			locationId?.valueOf() as string
		);

		console.log(JSON.stringify(response, null, 2));

		console.log("Response................", response)

		if (response.Status === 'failure' && response.HttpCode === 409) {
			throw redirect(303, '/join-raahi', errorMessage( "User already exists, login to your account"), event);
		}
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/join-raahi', errorMessage(response.Message), event);
		}

		throw redirect(303, `/sign-in-otp/${phone}`, successMessage('Your account is created successfully!'), event);
	}
};
