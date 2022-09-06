import { writable } from 'svelte/store';

export const personRolesStore = writable([]);

export const currentUserRoleStore = writable('');
