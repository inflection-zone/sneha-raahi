import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import * as cookie from 'cookie';
import { getLinkageById } from '../../../../api/services/linkages';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params }) => {
    try {
        const noticeId = params.linkageId;
        const userId = params.userId;
        const cookies = cookie.parse(request.headers.get('cookie') || '');
        const sessionId = cookies['sessionId'];
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

