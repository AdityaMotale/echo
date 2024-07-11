import { writable } from 'svelte/store';
import type { Chat } from './types';

function createChatsList() {
	const isBrowser = typeof window !== 'undefined';
	const key = 'chatsList';

	const initialValue = isBrowser ? JSON.parse(localStorage.getItem(key) || '[]') : [];
	const { subscribe, set, update } = writable(initialValue);

	return {
		subscribe,
		add: (item: Chat) =>
			update((items) => {
				const newItems = [...items, item];
				if (isBrowser) localStorage.setItem(key, JSON.stringify(newItems));
				return newItems;
			}),
		remove: (item: Chat) =>
			update((items) => {
				const newItems = items.filter((i: Chat) => i.id !== item.id);
				if (isBrowser) localStorage.setItem(key, JSON.stringify(newItems));
				return newItems;
			}),
		set: (item: Chat) => {
			if (isBrowser) localStorage.setItem(key, JSON.stringify(item));
			set(item);
		}
	};
}

export const chatsList = createChatsList();
