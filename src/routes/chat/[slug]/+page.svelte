<script lang="ts">
	import Chats from '../Chats.svelte';
	import Menu from '../Menu.svelte';
	import { createChatDetailsList } from '$lib/core/stores';
	import { onMount } from 'svelte';
	import io, { Socket } from 'socket.io-client';
	import { UserRole } from '$lib/core/types';

	export let data: PageData;

	let socket: Socket;

	let chatDetailsList = createChatDetailsList(data.id);

	function handleMessages(event: any) {
		socket.emit('message', event.detail);
		chatDetailsList.add(event.detail);
	}

	onMount(() => {
		socket = io('https://echo-websocket.onrender.com/');

		socket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		socket.on('message', (message) => {
			if (message && message.message) {
				chatDetailsList.add({
					id: Date.now(),
					message: message.message,
					role: UserRole.SYSTEM
				});
			}
		});
	});
</script>

<svelte:head>
	<title>Chat w/ echo</title>
	<meta name="description" content="Chat app that echos your inner voice" />
</svelte:head>

<section class="w-full h-full flex p-4 gap-4 relative">
	<Menu />
	<Chats chats={$chatDetailsList} on:message={handleMessages} />
</section>
