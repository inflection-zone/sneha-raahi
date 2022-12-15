<script lang="ts">
	import type { PageServerData } from './$types';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { Confirm } from 'svelte-confirm';
	
	export let data: PageServerData;
	let sessionId = data.sessionId;
	let userId = data.user.User.id;
	let conversations = data.allConversations;
	console.log("All conversations",conversations);

	const onLogout = async () => {
		const response = await fetch(`/api/server/logout`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		console.log(`resp: ${JSON.stringify(resp, null, 2)}`);
		LocalStorageUtils.removeItem('showSplash');
		window.location.href = '/sign-in';
	};

	const onDeleteAccount = async () => {
		const response = await fetch(`/api/server/user`, {
			method: 'DELETE',
			body: JSON.stringify({
				userId: userId,
				sessionId: sessionId
			}),

			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
		const resp = await response.text();
		console.log(`resp: ${JSON.stringify(resp, null, 2)}`);
		window.location.href = '/';
	};

	const handleDeleteChat = async (e, id) => {
		const conversationId = id;
		await Delete({
			sessionId: data.sessionId,
		    conversationId
		});
	};
	
	async function Delete(model) {
		console.log("model",model);
		const response = await fetch(`/api/server/chat/delete-conversation`, {
		method: 'DELETE',
		body: JSON.stringify(model),
		headers: {
			'content-type': 'application/json'
		}
		});
		console.log('response', response);
		// window.location.href = '/';
		}
	
</script>

<div
	class="card card-compact card-bordered w-[375px] h-[690px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm"
>
	<div class="card-body ">
		<button class=" h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			SETTINGS
		</h2>

		<div class=" flex flex-row justify-center mt-6 mb-2">
			<img class="h-24 w-24" src="/images/assets/my-profile/svg/my-profile-pic.svg" alt="" />
		</div>
		<button class="leading-2 tracking-[1px] text-lg font-semibold">EDIT</button>

		<div class="  grid grid-flow-row items-center justify-center">
			<a class="mt-5 " href="/users/{userId}/edit-profile">
				<button
					class="leading-none w-[300px] h-[52px] rounded-[10px]  bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal pl-3 pr-1 "
					>Edit Profile</button
				></a
			>
			
				<!-- {#each conversations as conversation}
				<button
				 on:click = {(e) => handleDeleteChat(e ,conversation.id)}
					class="leading-none w-[300px] h-[52px] rounded-[10px] justify-center bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal pl-3 mt-4"
					>Delete Chat</button
				>
				{/each} -->
			
			<a class="mt-1" href="/users/{userId}/chat">
			<button
					class="leading-none w-[300px] h-[52px] rounded-[10px] justify-center bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal pl-3 mt-4"
					>Delete Chat</button
				>
			</a>
			<button
				on:click={onLogout}
				class="leading-none w-[300px] h-[52px] rounded-[10px]  bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal  mt-5 "
				>Logout</button
			>
			<Confirm confirmTitle="Delete" cancelTitle="Cancel" let:confirm={confirmThis}>
				<button
					on:click={() => confirmThis(onDeleteAccount)}
					class="leading-none w-[300px] h-[52px] rounded-[10px]  bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal mt-5 "
					>Delete Account</button
				>
				<span slot="title"> Delete </span>
				<span slot="description"> Are you sure you want to delete Account? </span>
			</Confirm>
		</div>
	</div>
</div>
