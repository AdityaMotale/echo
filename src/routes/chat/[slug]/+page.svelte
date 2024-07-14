<script lang="ts">
	import Chats from '../Chats.svelte';
	import Menu from '../Menu.svelte';
	import { createChatDetailsList } from '$lib/core/stores';
	import { UserRole } from '$lib/core/types';

	export let data: PageData;

	let chatDetailsList = createChatDetailsList(data.id);

	function handleMessages(event: any) {
		chatDetailsList.add(event.detail);

		setTimeout(() => {
			chatDetailsList.add({
				id: Date.now(),
				message: event.detail.message,
				role: UserRole.SYSTEM
			});
		}, 4000);
	}
</script>

<svelte:head>
	<title>Chat w/ echo</title>
	<meta name="description" content="Chat app that echos your inner voice" />
</svelte:head>

<section class="w-full h-full flex p-4 gap-4 relative">
	<Menu />
	<Chats chats={$chatDetailsList} on:message={handleMessages} />
</section>
