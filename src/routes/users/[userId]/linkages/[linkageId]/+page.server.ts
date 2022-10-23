import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { getLinkageById } from '../../../../api/services/linkages';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    try {
        const noticeId = event.params.linkageId;
        const userId = event.params.userId;
        const sessionId = event.cookies.get('sessionId');
        const _notice = await getLinkageById(sessionId, noticeId);
        const notice = _notice.Notice;
        console.log(`\n Notice = ${JSON.stringify(notice)}`);
        return {
           notice,
           userId,
           sessionId
        };
    }
    catch (error) {
        console.error(`Error retrieving notice: ${error.message}`);
        return {
            location: `/home`,
        };
    }
};

