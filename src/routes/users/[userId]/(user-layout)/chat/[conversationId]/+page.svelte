<script lang="ts">
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { errorMessage, showMessage, successMessage } from '$lib/utils/message.utils';

	const ENTER_KEY_CODE = 13;
	export let data: PageServerData;
	let conversation = data.conversation;
	let messages = data.messages;
	const userId = $page.params.userId;
	const conversationId = $page.params.conversationId;

	let messageInput;

	console.log(`${JSON.stringify(conversation, null, 2)}`);
	console.log(`${JSON.stringify(messages, null, 2)}`);

	const onSearchEnter = async (e) => {
		const keyCode = e.keyCode;
		if (keyCode == ENTER_KEY_CODE) {
			// const text = searchInput.value;
			// if (text.length > 2) {
			// 	await searchUsers(text);
			// }
		}
	}

	const onSendMessageClick = async () => {
		const message_ = messageInput.value as string;
		console.log(message_);
		const msg = message_.trim();
		if (msg.length == 0) {
			return;
		}

		const response = await fetch(`/api/server/chat/send-message`, {
			method: 'POST',
			body: JSON.stringify({
				sessionId: data.sessionId,
				conversationId: conversationId,
				message: msg,
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		const resp = await response.text();
		console.log(`message sent: `, JSON.stringify(resp, null, 2));
		const sentMessage = JSON.parse(resp);
		if(!sentMessage) {
			showMessage(`Unable to send message!`, 'error', true, 3500);
		}
	}

	const onSendMessageKeyPressed = async (e) => {
	}

</script>

<div class="card card-compact card-bordered w-[375px] h-[590px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm">
	<div class="card-body ">
		<button class=" h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
		<div class="gap-2 flex items-center justify-center">
			{#if conversation.profileImage}
				<Image cls="rounded justify-center align-middle" h="58" w="58" source={conversation.profileImage} ></Image>
			{:else}
				<img src="/assets/chat/png/account-img-4.png" width="54" height="54" class="justify-center col-span-1 align-middle" alt="" />
			{/if}
			<span class="items-center py-4 ">
				<h2 class=" text-[#5b7aa3] font-bold text-base align-middle">
					{`${conversation.firstName} ${conversation.lastName}`}
				</h2>
			</span>
		</div>
		<div class=" h-[440px] overflow-auto scrollbar-medium ">
			{ #if messages.length == 0}
				<h4 class="justify-center font-medium">
					No messages here! start the conversation!
				</h4>
			{:else}
				{#each messages as md }
					<p class="flex text-xs justify-center mb-3 mt-3">{md.dateStr}</p>
						{#each md.messagesForTheDay as message}
							{#if message.SenderId !== userId}
								<div class="grid grid-cols-6 gap-4">
									<div class="mb-3 relative bg-[#dfe7fd] rounded-lg p-3 col-start-1 col-span-5">
										<p class="text-left text-slate-700">{message.Message}</p>
									</div>
								</div>
							{:else}
								<div class="grid grid-cols-6 gap-4">
									<div class="mb-3 relative bg-[#5b7aa3] rounded-lg p-3 col-start-2 col-span-5">
										<p class="text-left text-white col-start-2 col-span-4">{message.Message}</p>
									</div>
								</div>
							{/if}
						{/each}
				{/each}
			{/if}
		</div>

		<!-- <div class=" h-[440px] overflow-auto scrollbar-medium "></div>
		<p class="flex text-xs  justify-center ">09 Dec 2021</p>
		<div class="grid grid-flow-col mb-3">
			<img src="/assets/chat-individual/png/jasmine.png" alt="" />
			<div class="ml-2">
				<h3 class="text-left mb-1">Jasmine Doe</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />Aenean eu quam
					fermentum risus varius pellentesque scelerisque at velit. Nulla et convallis nunc.
				</p>
			</div>
		</div> -->

	</div>
</div>

<div class="h-[90px] w-[375px] bg-white">
	<div class="h-20 w-[375px] mt-3 bg-[#dfe7fd] flex ">
		<textarea
			type="text"
			id="messageText"
			name="messageText"
			bind:this={messageInput}
			class="h-[52px] p-3 ml-3 mt-3  w-[277px] rounded-lg bg-white"
			placeholder="Start typing here…"
		/>
		<!-- <button class="p-2"> -->
			<div class="relative h-[50px] w-[50px] bg-[#5b7aa3] rounded-lg ml-3 mt-3"
				on:click={onSendMessageClick}
				on:keypress={async (e) => onSendMessageKeyPressed(e)}>
				<img class="m-3" src="/assets/ask-sneha/png/send.png" alt="" />
			</div>
		<!-- </button> -->
	</div>
</div>
