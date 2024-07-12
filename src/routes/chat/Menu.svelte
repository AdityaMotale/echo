<script lang="ts">
	import MenuIcon from '$lib/icons/menu.svg';
	import CloseIcon from '$lib/icons/close.svg';
	import NewChatIcon from '$lib/icons/new_chat.svg';
	import LogoutIcon from '$lib/icons/logout.svg';
	import TrashIcon from '$lib/icons/trash.svg';
	import { chatsList } from '$lib/core/stores';
	import { goto } from '$app/navigation';

	let isMenuOpen = true;

	function generateSessionId(epoch: number): string {
		const base36String = epoch.toString(36);

		const sessionId = `session#${base36String}`;

		return sessionId;
	}
</script>

{#if isMenuOpen}
	<div
		class="w-screen h-full max-w-screen md:max-w-80 bg-secBg rounded-xl
            md:static absolute z-50 top-0 left-0
            flex flex-col p-4"
	>
		<!-- Header -->
		<div class="w-full flex items-center justify-start gap-2">
			<h2 class="font-display font-semibold text-2xl">Chats</h2>
			<div class="grow" />
			<button
				class="bg-bg p-1.5 rounded-lg"
				on:click={() => {
					let id = Date.now();
					chatsList.add({
						id: id
					});
					goto(`/chat?id=${id}`);
				}}
			>
				<img src={NewChatIcon} alt="New Chat Icon" width="20px" height="20px" />
			</button>
			<button
				class="bg-bg p-1 rounded-lg"
				on:click={() => {
					isMenuOpen = !isMenuOpen;
				}}
			>
				<img src={CloseIcon} alt="Close Icon" width="24px" height="24px" />
			</button>
		</div>

		<!-- Chats -->
		<section class={`grow my-7 ${$chatsList.length >= 10 ? 'overflow-y-scroll' : ''}`}>
			<div class="flex flex-col gap-2.5">
				{#each $chatsList as chat}
					<button
						class="hover:bg-bg flex items-center justify-between p-2 rounded-lg w-full"
						on:click={() => {
							goto(`/chat?id=${chat.id}`);
						}}
					>
						<p class="font-sans font-normal text-base">{generateSessionId(chat.id)}</p>
						<button
							class="hover:bg-secBg p-1 rounded-lg"
							on:click={() => {
								chatsList.remove(chat);
								goto('/chat/');
							}}
						>
							<img src={TrashIcon} alt="Trash Icon" width="16px" height="16px" />
						</button>
					</button>
				{/each}
			</div>
		</section>

		<form class="w-full" method="POST" action="?/logout">
			<!-- Logout -->
			<button class="bg-bg flex items-center gap-2 p-2 rounded-lg w-full">
				<div class="bg-bg p-1.5 rounded-lg">
					<img src={LogoutIcon} alt="Logout Icon" width="20px" height="20px" />
				</div>
				<p class="font-sans font-medium text-lg">Logout</p>
			</button>
		</form>
	</div>
{:else}
	<!-- Menu Button for when menu is closed -->
	<button
		type="submit"
		class="bg-secBg p-2 rounded-lg absolute"
		on:click={() => {
			isMenuOpen = !isMenuOpen;
		}}
	>
		<img src={MenuIcon} alt="Right Arrow Icon" width="24px" height="24px" />
	</button>
{/if}
