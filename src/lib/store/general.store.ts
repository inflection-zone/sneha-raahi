import { writable } from 'svelte/store';
import { communityFeeds } from '$lib/seed.data/community.news';
import { raahiFeeds } from '$lib/seed.data/raahi.news';
import { spalshImages } from '$lib/seed.data/spalsh.images';

export const personRolesStore = writable([]);
export const currentUserRoleStore = writable('');
export const genderTypesStore = writable([]);
export const communityNewsFeeds = writable(communityFeeds);
export const raahiNewsFeeds = writable(raahiFeeds);
export const splashCarouselImage = writable(spalshImages);
