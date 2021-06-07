import { writable } from 'svelte/store';

const storedUser = localStorage.getItem('user');
export const user = writable(storedUser);
user.subscribe((value) => {
	localStorage.setItem('user', value);
});
