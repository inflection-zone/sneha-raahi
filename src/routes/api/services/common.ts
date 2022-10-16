import { API_CLIENT_INTERNAL_KEY } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { SessionHelper } from "../auth/session";

export const get_ = async (sessionId: string, url: string) => {
    const session = await SessionHelper.getSession(sessionId);
    const accessToken = session.accessToken;
    console.log(`accessToken = ${accessToken}`);
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;
    const res = await fetch(url, {
        method: 'GET',
        headers
    });
    const response = await res.json();
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        console.log(response.Message);
        throw error(response.HttpCode, response.Message);
    }
    return response.Data;
}

export const post_ = async (sessionId: string, url: string, bodyObj: unknown) => {
    const session = await SessionHelper.getSession(sessionId);
    const accessToken = session.accessToken;
    console.log(`accessToken = ${accessToken}`);
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;
    const body = JSON.stringify(bodyObj)
    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    if (response.Status === 'failure' ||
    (response.HttpCode !== 201 && response.HttpCode !== 200)) {
        console.log(response.Message);
        throw error(response.HttpCode, response.Message);
    }
    return response.Data;
}

export const put_ = async (sessionId: string, url: string, bodyObj: unknown) => {
    const session = await SessionHelper.getSession(sessionId);
    const accessToken = session.accessToken;
    console.log(`accessToken = ${accessToken}`);
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;
    const body = JSON.stringify(bodyObj)
    const res = await fetch(url, {
        method: 'PUT',
        body,
        headers
    });
    const response = await res.json();
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        console.log(response.Message);
        throw error(response.HttpCode, response.Message);
    }
    return response.Data;
}

export const delete_ = async (sessionId: string, url: string) => {
    const session = await SessionHelper.getSession(sessionId);
    const accessToken = session.accessToken;
    console.log(`accessToken = ${accessToken}`);
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers
    });
    const response = await res.json();
    console.log(response.Message);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    return response.Data;
}
