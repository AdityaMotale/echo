<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Function to parse cookies
	function getCookie(name: string): string | null {
		const nameEQ = name + '=';
		const ca = document.cookie.split(';');

		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}

		return null;
	}

	function checkAuthDetails() {
		let isLoggedIn = getCookie('isLoggedIn');

		if (isLoggedIn == '1') {
			goto('/chat');
			return;
		}

		goto('/auth');
	}

	onMount(() => {
		setTimeout(() => {
			checkAuthDetails();
		}, 4000);
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
