
import type { PersonRole } from "$lib/types/domain.models";
import type { PageServerLoad } from "./$types";
import {redirect } from '@sveltejs/kit';
import { getGenderTypes, getPersonRoles } from "./api/services/types/types";

////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {

    // const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    // const sessionId = cookies['sessionId'];
    // console.log(`sessionId = ${sessionId}`);

    try {
        const roles: PersonRole[] = await getPersonRoles();
        const genderTypes: string[] = await getGenderTypes();
        return {
            message: 'Common data successfully retrieved!',
            roles,
            genderTypes
        };
    }
    catch (error) {
        console.error(`Error  in: ${error.message}`);
        throw redirect(400, '/');
    }
};

