<script lang="ts">
	import RightArrow from '$lib/icons/right_arrow.svg';
	import { onMount } from 'svelte';
	import type { PageData, ActionData } from './$types';

	let password: String = '';

	export let data: PageData;
	export let form: ActionData;

	/**
	 * Generates a random, strong password.
	 *
	 * @param {number} [length=10] - The length of the password to generate. Defaults to 10 characters.
	 *
	 * @returns {string} A randomly generated password string.
	 */
	function generateStrongPassword(length: number = 10): string {
		const lowercase = 'abcdefghijklmnopqrstuvwxyz';
		const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const numbers = '0123456789';
		const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

		const allChars = lowercase + uppercase + numbers + symbols;

		let password = '';

		password += lowercase[Math.floor(Math.random() * lowercase.length)];
		password += uppercase[Math.floor(Math.random() * uppercase.length)];
		password += numbers[Math.floor(Math.random() * numbers.length)];
		password += symbols[Math.floor(Math.random() * symbols.length)];

		for (let i = password.length; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * allChars.length);
			password += allChars[randomIndex];
		}

		return password
			.split('')
			.sort(() => Math.random() - 0.5)
			.join('');
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(password.toString()).then((_) => {
			alert('Password copied to clipboard');
		});
	}

	function createNewPasswordForUser() {
		password = generateStrongPassword();
	}

	onMount(() => {
		document.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
				const form = document.getElementById('authForm') as HTMLFormElement;
				if (form) {
					form.submit();
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Signup to echo</title>
	<meta name="description" content="Let's login to connect to your inner voice" />
</svelte:head>

<section class="h-full w-full flex items-center justify-center">
	<form
		id="authForm"
		method="POST"
		class="flex h-full flex-col items-center justify-center gap-6 max-w-screen-sm w-full lg:px-20 md:px-12 px-6 py-4"
	>
		<div class="w-full h-full" />
		<h1 class="font-display font-semibold text-3xl text-center">
			Welcome to echo, <span class="text-accent">{data.username}</span>!
		</h1>
		<div
			class="w-full border-2 border-secBg rounded-xl flex items-center gap-2 px-2 py-2
            text-xl font-sans font-semibold"
		>
			<div class="w-0.5" />
			<p>password</p>
			<p>/</p>
			<input
				bind:value={password}
				name="password"
				type="password"
				placeholder="Your password"
				class="font-medium grow bg-transparent font-sans border-none outline-none
                placeholder:font-light"
			/>
			<button type="submit" class="bg-secBg p-2 rounded-lg">
				<img src={RightArrow} alt="Right Arrow Icon" width="24px" height="24px" />
			</button>
		</div>
		{#if form?.error != null}
			<p class="text-red-500">{form.error}</p>
		{/if}
		<div class="flex w-full items-center justify-center gap-4">
			<button
				type="button"
				class="bg-secBg rounded-xl py-2 px-4 font-sans text-sm"
				on:click={createNewPasswordForUser}
			>
				<p>generate random password</p>
			</button>
			{#if password.length > 0}
				<button
					type="button"
					class="bg-secBg rounded-xl py-2 px-4 font-sans text-sm"
					on:click={copyToClipboard}
				>
					<p>copy password to clipboard</p>
				</button>
			{/if}
		</div>
		<div class="w-full h-full" />
		<p class="w-full font-sans text-base text-center font-light">
			Press ENTER on your keyboard to continue
		</p>
	</form>
</section>
