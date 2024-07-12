import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	logout: async ({ cookies }) => {
		cookies.set('isLoggedIn', '0', {
			path: '/',
			httpOnly: false,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		redirect(303, '/');
	}
} satisfies Actions;
