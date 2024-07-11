<script lang="ts">
	import Chats from '../Chats.svelte';
	import Menu from '../Menu.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Chat w/ echo</title>
	<meta name="description" content="Chat app that echos your inner voice" />
</svelte:head>

<section class="w-full h-full flex p-4 gap-4 relative">
	<Menu />
	<Chats />
</section>
