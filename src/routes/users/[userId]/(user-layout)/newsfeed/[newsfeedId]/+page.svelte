<script lang="ts">
	import { timeAgo } from 'short-time-ago';
	let showRaahiUpdates = true;
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	export let data: PageServerData;
	const userId = $page.params.userId;
	let feedItem = data.feedItem;
	const pubdate = new Date(data.feedItem.PublishingDate);
	console.log("pubdate", pubdate);
	console.log("feedItem",feedItem);
</script>

<div class="card card-compact card-bordered w-[375px] h-[701px] bg-base-100  rounded-none rounded-t-[44px] shadow-sm">
	<div class="card-body ">
		<button class="h-[5px] w-[73px] bg-[#E3E3E3] ml-[8.5rem] mt-2 rounded" />
		<h2 class=" text-[#5B7AA3] flex  justify-center uppercase tracking-widest font-bold text-base">
			Newsfeed
		</h2>
		<!-- <div class="flex flex-row w-[340px] h-[34px] justify-center ">
			<button
				disabled={showRaahiUpdates}
				class="disabled:bg-[#5b7aa3] disabled:text-[#dfe7fd] rounded-2xl w-[170px] text-[#5b7aa3] h-[34px] text-center bg-[#dfe7fd] text-[13px] tracking-wider"
				on:click|preventDefault={() => (showRaahiUpdates = true)}>
				Raahi Updates
			</button>
			<button
				disabled={!showRaahiUpdates}
				class="disabled:bg-[#5b7aa3] disabled:text-[#dfe7fd] rounded-2xl w-[170px] text-[#5b7aa3] h-[34px] text-center bg-[#dfe7fd] text-[13px] tracking-wider"
				on:click|preventDefault={() => (showRaahiUpdates = false)}>
				Community Updates
			</button>
		</div> -->

		<!-- <div class="overflow-auto overscroll-auto"> -->
			{#if showRaahiUpdates}
			<!-- <div class="card-body "> -->
			<h4 class="text-right  text-[13px] font-semibold mb-1">{timeAgo(pubdate)}</h4>

			<div class="w-[340px] h-[460px] overflow-auto scrollbar-medium rounded-lg bg-[#f2e2da]">
				<div class="flex p-1 mt-4">
					<div class="w-[50px] mt-2 ml-2 h-[45px] rounded-lg bg-[#fff] flex-none">
						<img
							src="/assets/images/newsfeed/png/logo.png"
							alt=""
							class="mt-2 p-1"
						/>
					</div>
					<div class="ml-4">
						<h2 class="text-left text-base leading-5 mt-2 mb-3">
							{feedItem.Title}
						</h2>
						<p class="pr-1">
							{feedItem.Description}
						</p>
					</div>
				</div>
				<div class="flex justify-center">
				<img
					src={feedItem.Image}
					alt=""
					class="w-[310px] item-center mt-8 h-[200px]  rounded-lg "
				/>
			</div>
			</div>
		<!-- </div> -->
		<!-- <div class="flex flex-row gap-40 mt-2">
			<h4>23likes 23comments</h4>
			<div class="flex flex-row gap-3">
				<img src="/assets/images/newsfeed/png/newsfeed-likes.png" alt="" />
				<img src="/assets/images/newsfeed/png/newsfeed-comments.png" alt="" />
			</div>
		</div> -->
		<!-- <div class=" mt-4 ">
			<div class="flex">
				<img
					src="/assets/images/newsfeed-details/png/jasmine.png"
					alt=""
					class=" mr-[16px] mb-[25px] ml-[4px]"
				/>
				<div class="">
					<h3 class="text-left mb-2">Jasmine Doe</h3>
					<p class="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
			</div>
		</div> -->
		<!-- </div> -->

		<!-- {:else} -->
		<!-- <h4 class="text-right  text-[13px] font-semibold mb-1">27 Sep 2022</h4>

		<div class="w-[340px] h-[350px]  rounded-lg bg-[#d7eaf7]">
			<div class="flex p-1">
				<div class="w-[50px] mt-2 ml-2 h-[45px] rounded-lg bg-[#fff] flex-none">
					<img
						src="/assets/images/newsfeed/png/logo.png"
						alt=""
						class="mt-2 p-1"
					/>
				</div>
				<div class="ml-4 ">
					<h2 class="text-left text-[15px] mt-2">
						Nehru Science Centre Trip
					</h2>
					<p>
						"Learning visits has always been a key strategy in EHSAS to build assets, agency and self-awareness in young people. On the 24th of September, 2022, 43 young people from all three sites of Dharavi, Kandivali and Kalwa visited the Nehru Science Center.
					</p>
				</div>
			</div>
			<img
				src= https://www.jbcnschool.edu.in/wp-content/uploads/2019/12/field-trip-nehru-science-dec-19-006.jpg
				alt=""
				class="w-[320px] mx-2 mt-3 h-[146px]  rounded-lg "
			/>
		</div> -->

	<!-- <div class="flex flex-row gap-40 mt-2">
		<h4>23likes 23comments</h4>
		<div class="flex flex-row gap-3">
			<img src="/assets/images/newsfeed/png/newsfeed-likes.png" alt="" />
			<img src="/assets/images/newsfeed/png/newsfeed-comments.png" alt="" />
		</div>
	</div> -->
	<!-- <div class=" mt-4 ">
		<div class="flex">
			<img
				src="/assets/images/newsfeed-details/png/jasmine.png"
				alt=""
				class=" mr-[16px] mb-[25px] ml-[4px]"
			/>
			<div class="">
				<h3 class="text-left mb-2">Jasmine Doe</h3>
				<p class="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
		</div>
	</div> -->
	<!-- </div> -->

		{/if}
	</div>
	<div class="h-[90px] w-[375px] bg-white">
		<a href="/users/{userId}/newsfeed">
		<div class="h-20 w-[375px] mt-3 flex justify-center ">
			<!-- <textarea
				type="text"
				class="h-[52px] p-3 ml-3 mt-3  w-[277px] rounded-lg bg-white"
				placeholder="Start typing here…"
			/>
			<div class="relative h-[50px] w-[50px] bg-[#5b7aa3] rounded-lg ml-3 mt-3  ">
				<img class="m-3" src="/assets/images/ask-sneha/png/send.png" alt="" />
			</div> -->
			
			<button class="">BACK TO NEWSFEED</button>
		</div></a>
	</div>
</div>

