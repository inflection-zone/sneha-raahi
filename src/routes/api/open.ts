import { SessionHelper } from "./auth/session";
import * as cookie from 'cookie';
import type { RequestHandler } from "@sveltejs/kit";

////////////////////////////////////////////////////////////////

export const POST: RequestHandler = async (event) => {

    const data = await event.request.json();
    const path = data.path ?? '/';
    const isPublic = data.isPublic ?? false;
    const headers = event.request.headers;

    console.log(`is public: ${isPublic}`);
    console.log(`path: ${path}`);
    console.log(`headers: ${JSON.stringify(headers, null, 2)}`);

    if (!isPublic) {
        const cookies = cookie.parse(event.request.headers.get('cookie') || '');
        const sessionId = cookies['sessionId'];
        console.log(`sessionId: ${sessionId}`);
        if (sessionId) {
            const valid = await SessionHelper.isValid(sessionId);
            console.log(`valid session = ${valid}`);
            if (valid) {
                return {
                    headers: { ...headers, Location: path },
                    status: 302
                }
            }
        }
        return {
            headers: { ...headers, Location: '/' },
            status: 302
        }
    }
    return {
        headers: { ...headers, Location: path },
        status: 302
    }
};
