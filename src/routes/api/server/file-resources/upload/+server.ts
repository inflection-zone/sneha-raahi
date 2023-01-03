import { upload, uploadBinary } from '../../../services/file.resource'
import type { RequestEvent, RequestHandler } from './$types';
import * as fs from 'fs';
import * as path from 'path';
import { ServerHelper } from "$lib/server/server.helper";

//////////////////////////////////////////////////////////////

const b64toBlob = async (base64Buffer, mimeType) =>
{
	const res = await fetch(`data:${mimeType};base64,${base64Buffer}`);
	const blob = await res.blob();
	return blob;
};

export const POST = (async (event: RequestEvent) => {

	try {
		console.log(`Upload in progress---`);

		console.log(JSON.stringify(event, null, 2));

		const data_ = await event.request.json();
		//console.log(data_);
		const params: URLSearchParams = event.url.searchParams;
		console.log(`search params : ` + params);
		const filename = event.request.headers.get('filename');
		console.log(filename);

		const fileBuffer = data_['image'];
		const filePath = `static/temp/${filename}`;
		fs.writeFileSync(filePath, fileBuffer, 'base64');

		if (fs.existsSync(filePath)) {
			console.log(Date.now().toString());
			console.log(`Copied file ${filename} to server stats/temp.`);
		}

		const sessionId = event.locals.sessionUser.sessionId;
		const buffer = fs.readFileSync(filePath);

		//const mimeType = ServerHelper.getMimeTypeFromFileName(filename);
		//const base64Buffer: string = fileBuffer.toString('base64');
		//console.log(base64Buffer);
		// const blob = await b64toBlob(base64Buffer, mimeType);
		// console.log(blob);
		//const fileObj = new File([blob], filename, { type: mimeType });

		console.log('Uploading file resource ...');
		//const location = path.join(process.cwd(), filePath);
		const response = await uploadBinary(
			sessionId,
			buffer,
			filename,
			true
		);
		return new Response(response.message);

	} catch (err) {
		//console.error(`Error uploading file: ${err.message}`);
		console.error(`Error uploading file: ${JSON.stringify(err.stack.split('\n'), null, 2)}`);
		return new Response(err.message);
	}
}) satisfies RequestHandler;

// export const POST = (async (event: RequestEvent) => {

// 	try {
// 		console.log(`Upload in progress---`);

// 		console.log(JSON.stringify(event, null, 2));

// 		const data_ = await event.request.json();
// 		//console.log(data_);
// 		const params: URLSearchParams = event.url.searchParams;
// 		console.log(`search params : ` + params);
// 		const filename = event.request.headers.get('filename');
// 		console.log(filename);

// 		const fileBuffer = data_['image'];
// 		const filePath = `static/temp/${filename}`;
// 		fs.writeFileSync(filePath, fileBuffer, 'base64');

// 		if (fs.existsSync(filePath)) {
// 			console.log(Date.now().toString());
// 			console.log(`Copied file ${filename} to server stats/temp.`);
// 		}

// 		const sessionId = event.locals.sessionUser.sessionId;

// 		const mimeType = ServerHelper.getMimeTypeFromFileName(filename);
// 		const base64Buffer: string = fileBuffer.toString('base64');
// 		//console.log(base64Buffer);
// 		const blob = await b64toBlob(base64Buffer, mimeType);
// 		console.log(blob);

// 		//const fileObj = new File([blob], filename, { type: mimeType });

// 		console.log('Uploading file resource ...');
// 		const location = path.join(process.cwd(), filePath);
// 		const response = await upload(
// 			sessionId,
// 			location,
// 			filename,
// 			true
// 		);
// 		return new Response(response.message);

// 	} catch (err) {
// 		//console.error(`Error uploading file: ${err.message}`);
// 		console.error(`Error uploading file: ${JSON.stringify(err.stack.split('\n'), null, 2)}`);
// 		return new Response(err.message);
// 	}
// }) satisfies RequestHandler;
