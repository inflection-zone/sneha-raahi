import { getAllNotifications } from '../../../../api/services/notification';
import type { PageServerLoad } from "./$types";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        const allNotifications = await getAllNotifications(sessionId);
        console.log(`\n All notifications = ${JSON.stringify(allNotifications)}`);
        return {
            sessionId,
            allNotifications
        };
    }
    catch (error) {
        console.error(`Error retrieving notifications: ${error.message}`);
        return {
            location: `/home`,
        };
    }
};

