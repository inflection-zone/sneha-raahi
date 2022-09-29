import * as cookie from 'cookie';
import { getAllLinkages } from '../../../api/services/linkages';
import type { PageServerLoad } from "./$types";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params, }) => {
    try {
        const cookies = cookie.parse(request.headers.get('cookie') || '');
        const sessionId = cookies['sessionId'];
        const userId = params.userId;
        const allLinkages = await getAllLinkages(sessionId);

        console.log(`\n All linkages = ${JSON.stringify(allLinkages)}`);
        return {
            userId,
            allLinkages 
        };
    }
    catch (error) {
        console.error(`Error retrieving linkages: ${error.message}`);
        return {
            location: `/home`,
        };
    }
};