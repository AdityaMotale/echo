<script lang="ts">
	import { goto } from '$app/navigation';
	import { chatsList } from '$lib/core/stores';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		const list = $chatsList;

		if (data.id != null) {
			goto(`chat/${data.id}`);
			return;
		}

		if (!list || list.length === 0) {
			let id = Date.now();
			chatsList.add({ id });

			goto(`chat/${id}`);
			return;
		}

		goto(`chat/${list[0].id}`);
	});
</script>

<svelte:head>
	<title>echo</title>
	<meta name="description" content="Chat app that echos your inner voice" />
</svelte:head>

<section class="w-full h-screen flex items-center justify-center">
	<h1 class="text-accent font-display font-bold md:text-7xl text-4xl">echo</h1>
</section>

<style>
	@keyframes bounce-scale {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0) scale(1);
		}
		40% {
			transform: translateY(-30px) scale(0.8);
		}
		60% {
			transform: translateY(-15px) scale(1.2);
		}
	}

	h1 {
		animation: bounce-scale 3s ease-in-out 1;
	}
</style>
