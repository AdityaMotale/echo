import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const chatId = url.searchParams.get('id');

	return { id: chatId };
};
