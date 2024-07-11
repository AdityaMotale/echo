import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageLoad } from '../../$types';

export const load: PageLoad = ({ url, cookies }) => {
	let username = url.searchParams.get('username');
	let isLoggedIn = cookies.get('isLoggedIn');

	if (isLoggedIn && isLoggedIn === '1') {
		throw redirect(303, '/chat/');
	}

	if (username === undefined || !username) {
		throw redirect(303, '/auth/');
	}

	return { username: username.toString() };
};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const password = data.get('password');

		if (password) {
			let length = password.toString().length;

			let savedPassword = cookies.get('password');

			if (savedPassword === undefined || savedPassword !== password) {
				return { error: 'Oops! Looks like someone has forgot their password' };
			}

			cookies.set('isLoggedIn', '1', {
				path: '/',
				httpOnly: false,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30 // 30 days
			});

			throw redirect(303, `/chat`);
		}

		return { error: 'Please enter a strong password' };
	}
} satisfies Actions;
