<script lang="ts">
	import Chats from '../Chats.svelte';
	import Menu from '../Menu.svelte';
	import { createChatDetailsList } from '$lib/core/stores';
	// import { onMount } from 'svelte';
	// import io, { Socket } from 'socket.io-client';

	export let data: PageData;

	// let socket: Socket;

	let chatDetailsList = createChatDetailsList(data.id);

	function handleMessages(event: any) {
		// socket.emit('message', event.detail);
		chatDetailsList.add(event.detail);
	}

	// onMount(() => {
	// 	socket = io('https://echo-websocket.vercel.app/');

	// 	socket.on('connect', () => {
	// 		console.log('Connected to WebSocket server');
	// 	});

	// 	socket.on('message', (message) => {
	// 		console.log({ message });
	// 	});
	// });
</script>

<svelte:head>
	<title>Chat w/ echo</title>
	<meta name="description" content="Chat app that echos your inner voice" />
</svelte:head>

<section class="w-full h-full flex p-4 gap-4 relative">
	<Menu />
	<Chats chats={$chatDetailsList} on:message={handleMessages} />
</section>
