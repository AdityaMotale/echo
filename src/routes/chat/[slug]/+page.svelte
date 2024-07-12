<script lang="ts">
	import Chats from '../Chats.svelte';
	import Menu from '../Menu.svelte';
	import { createChatDetailsList } from '$lib/core/stores';
	import { onDestroy, onMount } from 'svelte';

	export let data: PageData;

	onMount(() => {
		console.log('New CMP!');
	});

	let chatDetailsList = createChatDetailsList(data.id);

	function handleMessages(event: any) {
		chatDetailsList.add(event.detail);
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
