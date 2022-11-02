import { searchUsersByName } from "../../../services/user";

//////////////////////////////////////////////////////////////

export const GET = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside learning server endpoints');
		const response = await searchUsersByName(
			data.sessionId,
            data.name
		);
        const results = response.Patients?.Items;
        let users = [];
        if (results.length > 0) {
            users = results.map(x => {
                return {
                    UserId: x.UserId,
                    DisplayName: x.DisplayName,
                }
            });
        }
		return new Response(JSON.stringify(users));
	} catch (err) {
		console.error(`Error updating user learning: ${err.message}`);
		return new Response(err.message);
	}
};
