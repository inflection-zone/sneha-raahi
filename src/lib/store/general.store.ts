import { writable } from 'svelte/store';
import { communityFeeds } from '$lib/seed.data/community.news';
import { raahiFeeds } from '$lib/seed.data/raahi.news';

export const personRolesStore = writable([]);
export const currentUserRoleStore = writable('');
export const genderTypesStore = writable([]);
export const communityNewsFeeds = writable(communityFeeds);
export const raahiNewsFeeds = writable(raahiFeeds);
