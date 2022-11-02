<script lang="ts">
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { errorMessage, showMessage, successMessage } from '$lib/utils/message.utils';

	export let data: PageServerData;
	const ENTER_KEY_CODE = 13;

	// let learningJourney = data.learningPath;
	// const courseContents = data.courseContentsForLearningPath;
	const userId = $page.params.userId;
	//console.log(`${JSON.stringify(courseContents, null, 2)}`)

	let searchInput;
	let searchResults = [];
	let searchPeformed = false;
	let favourites = [];
	let recentUsers = [];

	//Make it reactive
	$: searchedUsers = searchResults;

	async function updateVideoProgress(model) {
		await fetch(`/api/server/learning`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	// async function takeQuiz(model) {
	// 	return await fetch(`/api/server/quiz`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(model),
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	});
	// }

	const handleCourseContentClick = async (e,
		resourceLink: string,
		contentType: string,
		actionTemplateId?: string) => {

		console.log(e.currentTarget);
		const contentId = e.currentTarget.id;
		console.log(`contentId = ${contentId}`);

		if (contentType === 'Video') {
			const videoModel = {
				sessionId: data.sessionId,
				userId: data.userId,
				contentId
			};
			await updateVideoProgress(videoModel);
			//TODO: Please use video embedding rather than switching to different page
			window.location.href = resourceLink;
		}
		// else if (contentType === 'Assessment') {
		// 	const quizModel = {
		// 		sessionId: data.sessionId,
		// 		userId: data.userId,
		// 		assessmentTemplateId: actionTemplateId,
		// 		courseContentId: contentId,
		// 		learningJourneyId: $page.params.learningJourneyId,
		// 		scheduledDate: new Date(),
		// 	};
		// 	const response = await takeQuiz(quizModel);
		// 	const text = await response.text();
		// 	const resp = JSON.parse(text);
		// 	console.log(resp.action);
		// 	console.log(resp.content);
		// 	if (resp.action === 'message') {
		// 		showMessage(resp.content, "info", true, 3500);
		// 	}
		// 	else if (resp.action == 'redirect') {
		// 		goto(resp.content);
		// 	}
		// 	else {
		// 		showMessage(resp.content, "error", true, 3500);
		// 	}
		// }
		else {
			const errmsg = `Content type is not yet handled!`;
			showMessage(errmsg, "error", true, 3500);
			console.log(errmsg);
		}
	};

	const onSearchClick = async (e) => {
		const text = searchInput.value;
		await searchUsers(text);
	}

	const onSearchTextEntered = async (e) => {

	}

	const onSearchEnter = async (e) => {
		const keyCode = e.keyCode;
		if (keyCode == ENTER_KEY_CODE) {
			const text = searchInput.value;
			await searchUsers(text);
		}
	}

	const searchUsers = async (text) => {
		searchPeformed = true;
		const response = await fetch(`/api/server/chat-home`, {
			method: 'POST',
			body: JSON.stringify({ text }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = response.json();
		searchResults = resp['users'];
		//Take only top 5 results
		searchResults = searchResults.slice(0, 5);
	}

</script>

<div class="card card-compact card-bordered w-[375px] h-[680px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm">
	<div class="card-body ">
		<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			CHAT HOME
		</h2>
		<div class="relative flex items-center ">
			<input
				placeholder="Search"
				id="search"
				name="search"
				bind:this={searchInput}
				on:input={onSearchTextEntered}
				class=" text-[#5b7aa3] h-[40px] w-full px-3 border rounded-3xl my-5 text-lg bg-[#B6C6E0]  "
				on:keyup={onSearchEnter}
			/>
			<img
				id="searchButton"
				name="searchButton"
				class="right-48 pr-3 ml-3 w-2/12"
				src="/assets/home-sidebar/png/search-icon.png"
				alt=""
				on:click={onSearchClick}
				on:keyup={onSearchEnter}
			/>
		</div>
		{#if searchPeformed}
			{#if searchedUsers.length > 0}
				<h2 class="flex  justify-left ">Search Results</h2>
				<div class="overflow-auto scrollbar-medium h-[400px]">
					{#each searchedUsers as otherUser}
						<a href={`/users/${userId}/chat-home-individual/${otherUser.id}`}>
							<div class="grid grid-flex-rows-6 mb-3  gap-2">
								<div class="grid grid-flow-col">
									<img src="/assets/chat-home/png/account-img-1.png" alt="" />
									<div class="grid grid-flow-rows-2 ml-2">
										<div class="flex relative mt-2">
											<h3 class="text-left">{otherUser.DisplayName}</h3>
											<!-- <div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
												12 Dec
											</div> -->
										</div>
										<!-- <p class="">Lorem ipsum dolor sit amet, conse…</p> -->
									</div>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{:else if searchResults.length === 0}
				<h2 class="flex  justify-left ">No results found!</h2>
			{/if}
		{/if}
		<h2 class="flex  justify-left ">Favourites</h2>
		<div class="overflow-auto scrollbar-medium w-[365px]">
			<div class="grid grid-flow-col mt-2 auto-cols-max gap-3">
				{#if favourites.length === 0}
					<h3 class="m-1">No favourites so far!</h3>
				{:else}
					{#each favourites as favourite}
						<a href={`/users/${userId}/chat-home-individual/${favourite.id}`}>
							<div class="grid grid-rows-2 ">
								<img src="/assets/chat-home/png/account-img-1.png" alt="" />
								<h3 class=" mt-3 text-sm ">{favourite.FirstName} <br />{favourite.LastName}</h3>
							</div>
						</a>
					{/each}
				{/if}
				<!-- <a href="/chat-home-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat-home/png/account-img-2.png" alt="" />
						<h3 class=" mt-3 text-sm ">jemma <br />Doe</h3>
					</div>
				</a>
				<a href="/chat-home-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat-home/png/account-img-3.png" alt="" />
						<h3 class=" mt-3 text-sm">jayesh <br />Doe</h3>
					</div>
				</a>
				<a href="/chat-home-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat-home/png/account-img-4.png" alt="" />
						<h3 class=" mt-3 text-sm ">jacob <br />Doe</h3>
					</div>
				</a>
				<a href="/chat-home-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat-home/png/account-img-5.png" alt="" />
						<h3 class=" mt-3 text-sm ">jenny <br />Doe</h3>
					</div>
				</a>
				<a href="/chat-home-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat-home/png/account-img-6.png" alt="" />
						<h3 class=" mt-3 text-sm">jaspreet <br />Doe</h3>
					</div>
				</a> -->
			</div>
		</div>
		<h2 class="flex  justify-left ">Recent Chats</h2>
		<div class="overflow-auto scrollbar-medium h-[400px]">
			{#if recentUsers.length === 0}
				<h3 class="m-1">No favourites so far!</h3>
			{:else}
				{#each recentUsers as otherUser}
					<a href="/chat-home-individual">
						<div class="grid grid-flex-rows-6 mb-3  gap-2">
							<div class="grid grid-flow-col">
								<img src="/assets/chat-home/png/account-img-1.png" alt="" />
								<div class="grid grid-flow-rows-2 ml-2">
									<div class="flex relative mt-2">
										<h3 class="text-left   ">{otherUser.DisplayName}</h3>
										<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
											{otherUser.LastChatDate}
										</div>
									</div>
									<p class="">{otherUser.LastChatText}</p>
								</div>
							</div>
						</div>
					</a>
				{/each}
			{/if}

			<!-- <a href="/chat-home-individual">
				<div class="grid grid-rows mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat-home/png/account-img-2.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left   ">jamma Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a>
			<a href="/chat-home-individual">
				<div class="grid grid-flow-row mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat-home/png/account-img-3.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left  ">jayesh Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a>
			<a href="/chat-home-individual">
				<div class="grid grid-flow-row mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat-home/png/account-img-4.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left ">jacob Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a>
			<a href="/chat-home-individual">
				<div class="grid grid-flow-row mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat-home/png/account-img-5.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left  ">jenny Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a>
			<a href="/chat-home-individual">
				<div class="grid grid-flow-row mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat-home/png/account-img-6.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left  ">jaspreet Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a> -->
		</div>
	</div>
</div>
