<script lang="ts">
	import MenuIcon from '$lib/icons/menu.svg';
	import CloseIcon from '$lib/icons/close.svg';
	import NewChatIcon from '$lib/icons/new_chat.svg';
	import LogoutIcon from '$lib/icons/logout.svg';
	import TrashIcon from '$lib/icons/trash.svg';

	let isMenuOpen = true;

	let chats: string[] = ['Session#01', 'Session#02', 'Session#03', 'Session#04', 'Session#05'];
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
			<button class="bg-bg p-1.5 rounded-lg" on:click={() => {}}>
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
		<section class={`grow my-7 ${chats.length >= 10 ? 'overflow-y-scroll' : ''}`}>
			<div class="flex flex-col gap-2.5">
				{#each chats as chat}
					<button class="hover:bg-bg flex items-center justify-between p-2 rounded-lg w-full">
						<p class="font-sans font-normal text-base">{chat}</p>
						<button class="hover:bg-secBg p-1 rounded-lg">
							<img src={TrashIcon} alt="Trash Icon" width="16px" height="16px" />
						</button>
					</button>
				{/each}
			</div>
		</section>

		<!-- Logout -->
		<button class="bg-bg flex items-center gap-2 p-2 rounded-lg">
			<div class="bg-bg p-1.5 rounded-lg">
				<img src={LogoutIcon} alt="Logout Icon" width="20px" height="20px" />
			</div>
			<p class="font-sans font-medium text-lg">Logout</p>
		</button>
	</div>
{:else}
	<!-- Menu Button for when menu is closed -->
	<button
		class="bg-secBg p-2 rounded-lg absolute"
		on:click={() => {
			isMenuOpen = !isMenuOpen;
		}}
	>
		<img src={MenuIcon} alt="Right Arrow Icon" width="24px" height="24px" />
	</button>
{/if}
