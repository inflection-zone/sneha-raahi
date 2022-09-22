<script lang="ts">

	import Image from "$lib/components/image.svelte";
	import type { PageServerData } from "./$types";

	export let data: PageServerData;
	let allLearningJourneys = data.allLearningPaths.LearningPaths.Items;

</script>

<div class="flex items-center justify-center m-16">
	<div
		class="card  rounded-none card-bordered bg-[#5b7aa3] border-slate-400 w-[375px]
	h-[1280px]   shadow-none"
	>
		<div class="card w-[375px] h-[130px] bg-[#5b7aa3] shadow-none rounded-none border-none">
			<div class="card-body">
				<div class=" flex flex-row h-16 w-16">
					<img src="/assets/home/svg/menu.svg" alt="" />
					<img class="absolute right-0 " src="/assets/home/png/profile-settings.png" alt="" />
				</div>
				<div class="flex flex-row  justify-center relative">
					<img src="/assets/home/png/ask.png" alt="" />
					<img src="/assets/home/svg/message.svg" alt="" />
					<img src="/assets/home/png/notification.png" alt="" />
				</div>
			</div>
		</div>
		<div
			class="card card-compact w-[375px]
		h-[1150px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm  "
		>
			<div class="card-body  place-content-around  ">
				<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 rounded" />
				<h2 class=" text-[#5b7aa3] flex  justify-center font-bold text-base tracking-widest ">
					LEARNING JOURNEYS
				</h2>
				<h2 class="flex text-xl font-semibold text-center mb-2">Choose your pathway of learning</h2>
				<div class="columns-2">
					{#each allLearningJourneys as learningJourney}
						<a href="/learning-journeys-details">
							<div class="flex flex-col justify-center mb-4">
								<!-- <img class="mb-2 " src="/assets/learning-journeys/svg/growing-up.svg" alt="" /> -->
								<Image cls="mt-2 mb-3 mr-1 rounded" source={learningJourney.ImageUrl + "?disposition=inline"} w=160 h=200 />
								<h3 class="mt-2 mb-1 text-center font-semibold">{learningJourney.Name}</h3>
							</div>
						</a>
					{/each}
					<!-- <div class="flex flex-col justify-center mb-4">
						<img class=" mb-2 " src="/assets/learning-journeys/svg/child-abuse.svg" alt="" />
						<h3 class="text-center">Child Sexual Abuse</h3>
					</div>

					<div class="flex flex-col justify-center mb-4">
						<img class=" mb-2 " src="/assets/learning-journeys/svg/eat-healthy.svg" alt="" />
						<h3 class="text-center">Why should I eat healthy?</h3>
					</div>
					<div class="flex flex-col justify-center mb-4">
						<img class=" " src="/assets/learning-journeys/svg/sexual-reproductive.svg" alt="" />
						<h3 class="text-center">Sexual & Reproductive Health & Hygiene</h3>
					</div>
					<div class="flex flex-col justify-center mb-7">
						<img class=" mb-3 " src="/assets/learning-journeys/svg/substance-abuse.svg" alt="" />
						<h3 class="text-center">Substance Abuse</h3>
					</div>
					<div class="flex flex-col justify-center mb-4">
						<img class=" mb-2 " src="/assets/learning-journeys/svg/domestic-violence.svg" alt="" />
						<h3 class="text-center">Domestic Violence</h3>
					</div>
					<div class="flex flex-col justify-center mb-4">
						<img class=" mb-2 " src="/assets/learning-journeys/svg/gender-identity.svg" alt="" />
						<h3 class="text-center">Sex, Gender & Identity</h3>
					</div>
					<div class="flex flex-col justify-center mb-4">
						<img class=" mb-2 " src="/assets/learning-journeys/svg/feeling.svg" alt="" />
						<h3 class="text-center">Why do I feel the way I feel?</h3>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</div>
