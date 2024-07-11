import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username');

		if (username) {
			let length = username.toString().length;
			if (length < 4) {
				return { error: 'Username is a bit too short!' };
			}

			if (length > 12) {
				return { error: 'Username is a bit too long!' };
			}

			cookies.set('username', username.toString(), {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict'
			});

			if (cookies.get('password')) {
				throw redirect(303, `/auth/login?username=${username}`);
			}

			throw redirect(303, `/auth/signup?username=${username}`);
		}

		return { error: 'Please enter a valid username' };
	}
} satisfies Actions;
