<script lang="ts">
	import Toasts from '$lib/components/toast/toasts.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let userId = null;

	let askSnehaLink;
	let chatLink;
	let notificationsLink;

	const toggleSidebar = () => {
		console.log(`toggling the sidebar`);
		dispatch('toggleSidebar');
	}

	onMount(() => {
		askSnehaLink = `/users/${userId}/ask-sneha`;
		chatLink = `/users/${userId}/chat-home`;
		notificationsLink = `/users/${userId}/notifications`;
		console.log(askSnehaLink);
		console.log(notificationsLink);
		console.log(chatLink);
	});

</script>

<div class="card rounded-none card-bordered bg-[#5b7aa3] border-slate-400 w-[375px] h-[812px] shadow-none">
	<div class="card w-[375px] h-[130px] bg-[#5b7aa3] shadow-none rounded-none border-none">
		<Toasts/>
		<div class="card-body">
			<div class=" flex flex-row h-16 w-16">
				<button on:click|capture={toggleSidebar}>
					<img src="/assets/home/svg/menu.svg" alt="" />
				</button>
				<a href={`/users/${userId}/my-profile`}>
					<img class="absolute right-0 " src="/assets/home/png/profile-settings.png" alt="" />
				</a>
			</div>
			<div class="flex flex-row  justify-center relative">
				<a href={askSnehaLink}> <img src="/assets/home/png/ask.png" alt="" /></a>
				<a href={chatLink}> <img src="/assets/home/svg/message.svg" alt="" /></a>
				<a href={notificationsLink}> <img src="/assets/home/png/notification.png" alt="" /></a>
			</div>
		</div>
	</div>
	<slot/>
</div>

