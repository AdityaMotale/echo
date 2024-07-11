<script lang="ts">
	import ChatIcon from '$lib/icons/chat.svg';
	import { UserRole, type ChatDetails } from '$lib/core/types';
	import { onMount } from 'svelte';

	let chats: ChatDetails[] = [
		{
			id: Date.now(),
			message:
				"Programming is not just about code; it's about creating a better world, one line at a time. Enjoy the journey, for in the passion of creation lies the power to change the world.",
			role: UserRole.HUMAN,
			next: null
		},
		{
			id: Date.now() + 4000,
			message:
				"Programming is not just about code; it's about creating a better world, one line at a time. Enjoy the journey, for in the passion of creation lies the power to change the world.",
			role: UserRole.SYSTEM,
			next: null
		}
	];

	/**
	 * Extract time from epoch created by `Date.now()`
	 *
	 * @param {number} epoch created by `Date.now()`
	 *
	 * @returns {String} time formatted as HH:MM AM/PM
	 */
	function extractTimeFromEpoch(epoch: number): String {
		const date = new Date(epoch);

		let hours = date.getHours();
		const minutes = date.getMinutes();

		const amPm = hours >= 12 ? 'PM' : 'AM';

		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'

		const minutesStr = minutes < 10 ? '0' + minutes : minutes;

		const formattedTime = `${hours}:${minutesStr} ${amPm}`;

		return formattedTime;
	}

	onMount(() => {
		chats = chats.reverse();
	});
</script>

<div class="w-full md:px-10 flex flex-col justify-end gap-4">
	<!-- Chats in the chat section -->
	<section class="grow flex flex-col-reverse justify-start overflow-y-scroll">
		<div class="h-full w-full flex flex-col-reverse gap-4 px-4 py-2">
			{#each chats as chat}
				{#if chat.role == UserRole.HUMAN}
					<div class="flex w-full justify-end">
						<div class="flex flex-col items-end justify-start max-w-lg gap-2">
							<div class="bg-secBg w-fit p-4 rounded-xl">
								<p>{chat.message}</p>
							</div>
							<div class="flex items-center mx-4 gap-2">
								<p class="font-sans text-sm text-center font-light">YOU</p>
								<p class="font-sans text-sm text-center font-light">•</p>
								<p class="font-sans text-sm text-center font-light">
									{extractTimeFromEpoch(chat.id)}
								</p>
							</div>
						</div>
					</div>
				{:else}
					<div class="flex w-full items-center">
						<div class="flex flex-col items-start max-w-lg gap-2">
							<div class="bg-accent text-white w-fit p-4 rounded-xl">
								<p>{chat.message}</p>
							</div>
							<div class="flex items-center mx-4 gap-2">
								<p class="font-sans text-sm text-center font-light">YOU</p>
								<p class="font-sans text-sm text-center font-light">•</p>
								<p class="font-sans text-sm text-center font-light">
									{extractTimeFromEpoch(chat.id)}
								</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</section>

	<!-- User Input Field for chats -->
	<div class="w-full border-2 border-border rounded-xl py-2 px-3 flex items-center justify-between">
		<input
			type="text"
			placeholder="Let's Chat"
			class="font-medium grow bg-transparent font-sans border-none outline-none"
		/>
		<button class="p-1.5 rounded-lg bg-secBg" on:click={() => {}}>
			<img src={ChatIcon} alt="Chat Icon" width="24px" height="24px" />
		</button>
	</div>
	<p class="w-full font-sans text-sm text-center font-light">
		Your messages are not stored anywhere except on your device. They are simply echoed back from
		the server to you.
	</p>
</div>
