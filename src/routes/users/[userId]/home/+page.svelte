<script lang="ts">
	import { show } from "$lib/utils/message.utils";
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";

	let showSidebar = false;
	export let data: PageServerData;
	let userId;
	let learningHomeLink;
	let myProfileLink;
	let askSnehaLink;
	let newsFeedLink;
	let chatLink;
	let linkagesLink;
	let notificationsLink
	let homeLink
	//console.log(`${JSON.stringify(data, null, 2)}`);

	onMount(()=>{
		userId = data.userId;
		homeLink = `/users/${userId}/home`
		learningHomeLink = `/users/${userId}/my-learnings`;
		myProfileLink = `/users/${userId}/my-profile`;
		askSnehaLink = `/users/${userId}/ask-sneha`;
		newsFeedLink = `/newsfeed`;
		chatLink = `/users/${userId}/chat-home`;
		linkagesLink = `/users/${userId}/linkages`;
		notificationsLink = `/users/${userId}/notifications`

		console.log(learningHomeLink);
		console.log(myProfileLink);
		console.log(askSnehaLink);
		console.log(newsFeedLink);
		console.log(chatLink);
		console.log(linkagesLink);

		show(data);
	});

</script>

<div class="grid gird-cols justify-center items-center">
	<div class="w-[375px] h-[812px]">
		<div class="flex  items-center justify-center  mt-16">
			{#if showSidebar}
				<div class="card rounded-none w-[855px]  h-[812px] bg-[#DFE7FD] " >
					<div class="mt-10 ">
						<ul class=" p-4 overflow-y-auto  w-[370px] h-[800px] text-base-content ">
							<div class="relative flex items-center ">
								<input
									placeholder="Search"
									class=" text-[#5b7aa3] h-[40px] w-[220px] px-3 border rounded-3xl my-5 text-lg bg-[#B6C6E0]  "
								/>
								<img
									class="absolute right-32  pr-3"
									src="/assets/home-sidebar/png/search-icon.png"
									alt=""
								/>
							</div>
							<div class="grid grid-cols gap-2 ">
								<a href= {homeLink}>
									<button class="flex flex-rows  ">
										<img src="/assets/home-sidebar/svg/home-sidebar.svg" alt="" class="my-2 mx-4" />
										<h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">home</h3>
									</button>
								</a>
								<a href={myProfileLink}>
									<button class="flex flex-rows  ">
										<img
											src="/assets/home-sidebar/png/my-profile-sidebar.png"
											alt=""
											class="my-2 mx-4"
										/>
										<h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">
											my profile
										</h3>
									</button>
								</a>
								<a href={learningHomeLink}>
									<button class="flex flex-rows ">
										<img
											src="/assets/home-sidebar/png/my-learning-sidebar.png"
											alt=""
											class="my-2 mx-4"
										/>
										<h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">
											my learning
										</h3>
									</button>
								</a>
								<a href={chatLink}>
									<button class="flex flex-rows  ">
										<img src="/assets/home-sidebar/png/chat-sidebar.png" alt="" class="my-2 mx-4" />
										<h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">chat</h3>
									</button></a
								>
								<a href={newsFeedLink}>
									<button class="flex flex-rows">
										<img
											src="/assets/home-sidebar/png/newsfeed-sidebar.png"
											alt=""
											class="my-2 mx-4"
										/>
										<h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">
											newsfeed
										</h3>
									</button></a
								>
								<a href={linkagesLink}>
									<button class="flex flex-rows ">
										<img
											src="/assets/home-sidebar/png/linkages-sidebar.png"
											alt=""
											class="my-2 mx-4"
										/>
										<h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">
											linkages
										</h3>
									</button>
								</a>
								<a href={askSnehaLink}>
									<button class="flex flex-rows">
										<img
											src="/assets/home-sidebar/png/ask-sneha-sidebar.png"
											alt=""
											class="my-2 mx-4"
										/>
										<h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">
											ask sneha
										</h3>
									</button>
								</a>
								<button class="flex flex-rows ">
									<img
										src="/assets/home-sidebar/png/settings-sidebar.png"
										alt=""
										class="my-2 mx-4"
									/>
									<h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">
										settings
									</h3>
								</button>

								<div class="flex flex-col  text-[#5B7AA3] cursor-pointer">
									<button class="ml-4 mr-8 mt-24 text-start   text-[#5B7AA3] text-base "> LOGOUT</button>
									<button class="ml-4  mt-4 text-base text-start  ">ABOUT SNEHA</button>
								</div>
							</div>
						</ul>
					</div>
				</div>
			{/if}
			<div class="card  rounded-none card-bordered border-slate-400 w-[375px] h-[812px]  bg-[#5b7aa3]  shadow-none"
			>
				<div class="card w-[375px] h-[406px] shadow-none rounded-none border-none">
					<div class="card-body ">
						<div class=" flex flex-row h-16 w-16">
							<button on:click={() => (showSidebar = !showSidebar)}>
								<img src="/assets/home/svg/menu.svg" alt="" />
							</button>
							<img class="absolute right-0 " src="/assets/home/png/profile-settings.png" alt="" />
						</div>
						<h1 class="card-title text-base-100 text-3xl">Hi {data.firstName}!</h1>
						<p class=" text-base-100">
							Welcome to Raahi, your friend, companion and guide as you navigate your journey into adulthood.
						</p>
					</div>
					<div class="flex flex-row  justify-center relative">
						<a href={askSnehaLink}> <img src="/assets/home/png/ask.png" alt="" /></a>
						<a href={chatLink}> <img src="/assets/home/svg/message.svg" alt="" /></a>
						<a href={notificationsLink}> <img src="/assets/home/png/notification.png" alt="" /></a>
					</div>
				</div>
				<div class="card card-compact w-[375px] h-[590px]  bg-base-100  rounded-none rounded-t-[44px] shadow-none ">
					<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
					<div class="card-body h-[450px] place-content-around ">
						<div class="overflow-auto h-[550px] scrollbar  scrollbar-medium">
							<h2 class="card-title text-[#5b7aa3] flex tracking-widest justify-center text-base ">
								GET STARTED ON YOUR JOURNEY
							</h2>
							<a href={learningHomeLink}>
								<img class=" h-[172px] w-[340px]" src="/assets/home/svg/my-learning.svg" alt="" />
							</a>
							<div class="columns-2 mt-2 ">
								<a href={newsFeedLink}>
									<img class=" mb-4 " src="/assets/home/svg/newsfeed.svg" alt="" /></a
								>
								<a href={linkagesLink}> <img src="/assets/home/svg/linkages.svg" alt="" /></a>
								<div>
									<a href={chatLink}>
										<img class=" mb-4 " src="/assets/home/svg/chat.svg" alt="" /></a
									>
									<a href={myProfileLink}> <img src="/assets/home/svg/my-profile.svg" alt="" /></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
