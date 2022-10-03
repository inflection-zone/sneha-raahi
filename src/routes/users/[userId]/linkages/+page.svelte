<script lang="ts">
	import type { PageServerData } from './$types';
	import hrt from 'human-readable-time';
	import { onMount } from 'svelte';

	export let data: PageServerData;
	let allLinkages = data.allLinkages.NoticeRecords.Items;
	console.log(`\n AllLinkages = ${JSON.stringify(allLinkages)}`);
	// onMount(() => {
	// 	userId = data.userId;
	// });
</script>

<!-- <div class="flex items-center justify-center mt-16"> -->
<!-- <div
		class="card  rounded-none card-bordered border-slate-400 w-[375px]
	h-[812px]  bg-[#5b7aa3]   shadow-none" -->

<!-- <div class="card w-[375px] h-[130px] bg-[#5b7aa3] shadow-none rounded-none border-none">
			<div class="card-body">
				<div class=" flex flex-row h-16 w-16">
					<img src="/assets/home/svg/menu.svg" alt="" />
					<img class="absolute right-0 " src="/assets/home/png/profile-settings.png" alt="" />
				</div>
				<div class="flex flex-row  justify-center relative">
					<img src="/assets/home/png/ask.png" alt="" />
					<img src="/assets/home/svg/message.svg" alt="" />
					<img src="/assets/home/png/notice.png" alt="" />
				</div>
			</div>
		</div> -->
<!-- <div
			class="card card-compact card-bordered w-[375px]
		h-[701px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm "
		> -->
<!-- <div class="card-body "> -->
<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
<!-- <slot> -->
<h2 class=" text-[#5b7aa3] flex  mt-2 justify-center tracking-widest font-bold text-base ">
	LINKAGES
</h2>
<div class=" card-body h-[690px] overflow-auto scrollbar-medium">
	{#each allLinkages as notice}
		<div id={notice.id}>
			<a href={`/users/${data.userId}/linkages/${notice.id}`}>
				<div class="grid grid-flow-col mb-1">
					<img
						class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg"
						src={notice.ImageUrl}
						alt=""
					/>
					<div class="ml-3 ">
						<div class="flex mb-1 ">
							<h3>
								{notice.Title.length > 15 ? notice.Title.substring(0, 13) + '...' : notice.Title}
							</h3>
							<div class="text-base font-semibold ml-4 right-2 p-0 leading-5 ">
								{hrt(new Date(notice.PostDate), '%relative% ago')}
							</div>
						</div>
						<p>
							{notice.Description.length > 50
								? notice.Description.substring(0, 50) + '...'
								: notice.Description}
						</p>
					</div>
				</div>
			</a>
		</div>
	{/each}
	<!-- <a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#dfe7fd] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1 ">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus…</p>
						</div>
					</div></a>
					<a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#fff1e6] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
						</div>
					</div></a>
					<a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#e3e3e3] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1 ">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
						</div>
					</div></a>
					<a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#e3e3e3] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
						</div>
					</div></a>
					<a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#fff1e6] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1 ">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
						</div>
					</div></a>
					<a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#dfe7fd] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
						</div>
					</div></a>
					<a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1 ">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
						</div>
					</div>
				</a>
					<a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
						</div>
					</div>
				</a>
					<a href="/notices-details">
					<div class="grid grid-flow-col mb-1">
						<div class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" />
						<div class="ml-3 ">
							<div class="flex mb-1">
								<h3>Lorem ipsum dolor...</h3>
								<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
							</div>
							<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
						</div>
					</div>
				</a> -->
</div>
<!-- </slot> -->
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->
