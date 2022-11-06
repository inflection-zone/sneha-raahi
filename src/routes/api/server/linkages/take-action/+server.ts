
import { takeNoticeAction } from '../../../services/linkages';

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	console.log ("data.........",data);
	try {
		console.log('Taking action against linkage...');
		const response = await takeNoticeAction(
			data.sessionId,
            data.noticeId,
            data.userId ,
			data.action,
			data.title,
			data.resourceId
		);
		console.log('respnse',response);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error creating notice action: ${err.message}`);
		return new Response(err.message);
	}
};