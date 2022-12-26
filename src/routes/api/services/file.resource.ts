import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import { SessionManager } from "../session.manager";
import { error } from "@sveltejs/kit";
import { get_ } from "./common";

////////////////////////////////////////////////////////////////

export const upload = async (sessionId: string, fileInput, filename: string, isPublic = true) => {

    const url = BACKEND_API_URL + `file-resources/upload`;
    const session = await SessionManager.getSession(sessionId);
    const accessToken = session.accessToken;

    const formdata = new FormData();
    formdata.append("name", fileInput.files[0], filename);
    formdata.append("IsPublicResource", isPublic ? "true" : "false");
    const body = JSON.stringify(formdata);

    const headers = {};
    headers['enc'] = 'multipart/form-data';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;

    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    if (response.Status === 'failure') {
        if(response.HttpCode !== 201 && response.HttpCode !== 200) {
            console.log(`get_ response message: ${response.Message}`);
            throw error(response.HttpCode, response.Message);
        }
    }
    console.log(`get_ response message: ${response.Message}`);
    return response.Data;
}

export const getFileResourceById = async (sessionId, fileResourceId) => {
    const url = BACKEND_API_URL + `file-resources/${fileResourceId}`;
    return await get_(sessionId, url);
};

export const download = async (sessionId, fileResourceId, asAttachment = false) => {

    let url = BACKEND_API_URL + `file-resources/${fileResourceId}/download`;
    if (asAttachment) {
        url = url + `?disposition=attachment`;
    }
    const session = await SessionManager.getSession(sessionId);
    const accessToken = session.accessToken;

    const headers = {};
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;
    headers['responseType'] = `arraybuffer`;

    const res = await fetch(url, {
        method: 'GET',
        headers
    });

    const data = await res.arrayBuffer();
    if (data) {
        const responseHeaders = res.headers;
        const contentType = responseHeaders['content-type'];
        const extension = getFileExtensionFromMimeType(contentType);
        let filename = 'download-' + Date.now().toString() + '.' + extension;
        if (asAttachment === true) {
            const disposition = responseHeaders['content-disposition'];
            if (disposition) {
                const tokens = disposition.split('filename=');
                if (tokens.length > 1) {
                    filename = tokens[1];
                }
            }
        }
        return {
            success: true,
            Data: {
                Buffer: data,
                FileName: filename,
                MimeType: contentType,
            },
        };
    }
    else {
        const response = await res.json();
        console.log(`get_ response message: ${response.Message}`);
        throw error(response.HttpCode, response.Message);
    }
};

export function downloadAsAttachment(response) {

    const blob = new Blob([response.Data.Buffer]);
    const objUrl = URL.createObjectURL(blob);
    const fileName = response.Data.FileName ?? 'def_download.jpg';

    const a = document.createElement("a");
    a.href = objUrl;
    a.setAttribute('download', fileName);

    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(objUrl);
            a.removeEventListener('click', clickHandler);
        }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();

    document.body.appendChild(a);
}

export function downloadAsInlineObjectUrl(response) {
    return dataURLtoBlob(response.Data.Buffer);
}

function getFileExtensionFromMimeType(mimeType) {
    const parts = mimeType.split('/');
    return parts.pop();
}

export const toBase64 =  async (file): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

