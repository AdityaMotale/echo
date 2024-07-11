import type { PageLoad } from './$types';
export const csr = true;

export const load: PageLoad = ({ params }) => {
	return { id: params.slug };
};
