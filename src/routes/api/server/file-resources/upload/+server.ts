import { upload } from '../../../services/file.resource'
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
	const data = await event.request.json();
	const isPublic = event.params.isPublic;
    const fileName = event.params.fileName;
    const fileInput = event.request.body;

	try {
		console.log('Uploading file resource ...');
		const response = await upload(
			data.sessionId,
            fileInput,
            fileName,
            isPublic == 'true' ? true : false,
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error uploading file: ${err.message}`);
		return new Response(err.message);
	}
};
