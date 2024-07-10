<script lang="ts">
	import RightArrow from '$lib/icons/right_arrow.svg';

	let errorMessage: String | null;
</script>

<svelte:head>
	<title>Login or Signup to echo</title>
	<meta name="description" content="Let's login or signup to connect to your inner voice" />
</svelte:head>

<section class="h-full w-full flex items-center justify-center">
	<div
		class="flex h-full flex-col items-center justify-center gap-6 max-w-screen-sm w-full lg:px-20 md:px-12 px-6 py-4"
	>
		<div class="w-full h-full" />
		<h1 class="font-display font-semibold text-3xl text-center">
			Let’s start by creating a unique <span class="text-accent">username</span>
		</h1>
		<div
			class="w-full border-2 border-secBg rounded-xl flex items-center gap-2 px-2 py-2
            text-xl font-sans font-semibold"
		>
			<div class="w-0.5" />
			<p>echo</p>
			<p>/</p>
			<input
				type="text"
				placeholder="Your username"
				class="font-medium grow bg-transparent font-sans border-none outline-none
                placeholder:font-light"
			/>
			<button class="bg-secBg p-2 rounded-lg">
				<img src={RightArrow} alt="Right Arrow Icon" width="24px" height="24px" />
			</button>
		</div>
		<p class="text-center text-lg">Login or Signup with a unique username</p>
		{#if errorMessage != null}
			<p class="text-red-500">{errorMessage}</p>
		{/if}
		<div class="w-full h-full" />
		<p class="w-full font-sans text-base text-center font-light">
			Press ENTER on your keyboard to continue
		</p>
	</div>
</section>
