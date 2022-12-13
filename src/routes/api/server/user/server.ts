import type { RequestEvent } from "@sveltejs/kit";
import { deleteAccount } from "../../services/user";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
    // const sessionId = event.cookies.get('sessionId');
	const request = event.request;
    console.log("request----------",request);
	const data = await request.json();
	console.log("data",data );
	try {
		console.log('Inside user server endpoints');
		const response = await deleteAccount(
            data.sessionId,
            data.userId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting user: ${err.message}`);
		return new Response(err.message);
	}
};