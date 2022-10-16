
import { error, type RequestEvent } from '@sveltejs/kit';
import { sendOtp } from '../api/auth/send.otp';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const actions = {

	default: async (event: RequestEvent) => {

		const request = event.request;

		const data = await request.formData();
		console.log(Object.fromEntries(data));
		const phone_ = data.has('phone') ? data.get('phone') : null;
		const loginRoleId_ = data.has('loginRoleId') ? data.get('loginRoleId') : null;

		if (!phone_) {
			throw error(400, `Phone is not valid!`);
		}
		const phone = phone_.valueOf() as string;
		const loginRoleId = loginRoleId_.valueOf() as number;

		const response = await sendOtp(
			phone,
			loginRoleId ?? 2
		);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			console.log(response.Message);
			//throw error(response.HttpCode, response.Message);
			const message = {
				type: 'error' as "error" | "success",
				message: response.Message as string,
			};
			console.log(`Throwing ... ${JSON.stringify(message, null, 2)}`)
			throw redirect(
				303,
				'/join-raahi/',
				message,
				event
			);
		}
		return {
			location: `/sign-in-otp/${phone}`,
			message: response.Message,
		};

	},

};
