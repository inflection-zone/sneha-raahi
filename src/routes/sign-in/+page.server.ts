
import { error, type Action } from '@sveltejs/kit';
import { sendOtp } from '../api/auth/send.otp';

//////////////////////////////////////////////////////////////

export const POST: Action = async ({ request }) => {
	const data = await request.formData();
	console.log(Object.fromEntries(data));
	const phone_ = data.has('phone') ? data.get('phone') : null;
    const loginRoleId_ = data.has('loginRoleId') ? data.get('loginRoleId') : null;

	if (!phone_) {
		throw error(400, `Phone is not valid!`);
	}
	const phone = phone_.valueOf() as string;
	const loginRoleId = loginRoleId_.valueOf() as number;

	try {
		const response = await sendOtp(
			phone,
			loginRoleId ?? 2
		);
		return {
			location: `/sign-in-otp/${phone}`,
			message: response.Message,
		};
	} catch (err) {
		console.error(`Error generating otp: ${err.message}`);
		throw error(400, err.message);
	}
};
