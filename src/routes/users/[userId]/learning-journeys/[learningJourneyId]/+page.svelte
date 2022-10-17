<script lang="ts">
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';
	import { goto } from '$app/navigation';

	export let data: PageServerData;
	let learningJourney = data.learningPath;
	const courseContents = data.courseContents;
	const userId = data.userId;
	let quizTemplates = data.allQuizTempletes.AssessmentTemplateRecords.Items;
	let PercentageCompletion = '0';

	console.log(userId);
	console.log(learningJourney);
	console.log(courseContents);
	console.log('allQuizTempletes', quizTemplates);

	const handleCourseClick = async (e, resourceLink, percentageCompletion) => {
		console.log(e.currentTarget);
		const contentId = e.currentTarget.id;
		console.log(`contentId = ${contentId}`);
		await update({
			sessionId: data.sessionId,
			userId: data.userId,
			contentId
		});
		window.location.href = resourceLink;
	};

	const handleQuizClick = async (e, title) => {
		console.log(e.currentTarget);
		const assessmentTemplateId = e.currentTarget.id;
		console.log(`Quiz template id = ${assessmentTemplateId}`);
		await scheduleQuiz({
			sessionId: data.sessionId,
			userId: data.userId,
			assessmentTemplateId,
			title: title,
			scheduledDate: new Date(),
		});
			// goto(`/users/${data.userId}/quiz/`);
	};

	async function update(model) {
		const response = await fetch(`/api/server/learning`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('respose....', response);
	}

	async function scheduleQuiz(model) {
		const response = await fetch(`/api/server/quiz`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('respose....', response);
	}

	// async function stratQuiz(model) {
	// 	const response = await fetch(`/api/server/quiz`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(model),
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	});
	// }

	// async function getProgress(model) {
	// 	const response = await fetch(`/api/server/learning`, {
	// 		method: 'GET',
	// 		body: JSON.stringify(model),
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	});
	// }

	// function percentageCompletion(e) {
	// 	const contentId = e.currentTarget.id;
	// 	let percentage = document.getElementById(contentId);
	// 	percentage.addEventListener('click', function () {
	// 		percentage.style.width = '100 %';
	// 	});
	// }

</script>

<div class="flex items-center justify-center m-16">
	<div
		class="card  rounded-none card-bordered bg-[#5b7aa3] border-slate-400 w-[375px]
	h-[812px]   shadow-none"
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
		h-[330px]  bg-[#ffdbb2]  rounded-none rounded-t-[44px] shadow-sm  "
		>
			<div class="card-body ">
				<div class="flex flex-col justify-center">
					<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 rounded" />
					<!-- <img
						class="h-[310px] w-[308px]"
						src="/assets/learning-course/svg/growing-up-affect.svg"
						alt=""
					/> -->
					<Image cls="h-[310px] w-[308px]" source={learningJourney?.ImageUrl} w="200" h="200" />
				</div>
			</div>
		</div>
		<div class=" card-body h-[300px] bg-base-100">
			<h2 class="leading-4 text-lg mb-2">{learningJourney.Name}</h2>
			<p class="h-auto">
				{learningJourney.Description ? learningJourney.Description : ''}
			</p>
			<!-- <div class="overflow-auto scrollbar-medium h-[280px]">
				{#each couseContents as course}
					<div class="grid  grid-flow-col mb-3">
						<div class="h-16 w-16  bg-[#ffdbb2] rounded-lg ">
							<img class=" m-4 " src="/assets/learning-course/svg/slides.svg" alt="" />
						</div>
						<div class="mx-2">
							<h3 class="text-left  mb-1">Course{course.Sequence}</h3>
							<p class="mb-3">{course.Title}</p>
							<div class=" bg-[#ffdbb2] rounded-full h-[10px] w-[211px]">
								<div class="bg-[#fcaf58] rounded-full h-[10px]" style="width:25%" />
							</div>
						</div>
						<div class="mt-9 font-bold">25%</div>
					</div>
				{/each}
			</div> -->

			<div class="overflow-auto scrollbar-medium h-[280px]">
				{#if courseContents.length == 0}
					<h3 class="mb-3 mt-1 font-semibold text-start">
						Course is not available yet. Please stay tuned.
					</h3>
				{:else}
					{#each courseContents as course}
						<button
							on:click|capture={(e) =>
								handleCourseClick(e, course.ResourceLink, course.PercentageCompletion)}
							id={course.id}
							name={course.id}
							class="leading-4 tracking-normal font-bold"
						>
							<!-- <button on:click = {() => (PercentageCompletion == '100')} > -->
							<div class="grid  grid-flow-col mb-4">
								{#if course.ContentType == 'Video'}
									<div class="h-16 w-16 bg-[#e3e3e3] rounded-lg ">
										<img class=" m-5 " src="/assets/learning-course/svg/video.svg" alt="" />
									</div>
								{:else}
									<div class="h-16 w-16 bg-[#e3e3e3] rounded-lg ">
										<img class=" m-4 " src="/assets/learning-course/svg/slides.svg" alt="" />
									</div>
								{/if}
								<div class="mx-4">
									<h3 class="text-left mb-5">{course.Title}</h3>
									<!-- <p class="mb-3">{course.Title}</p> -->
									<!-- {#if PercentageCompletion == 0 } -->
									<!-- <div class="bg-[#e3e3e3]  rounded-full h-[10px] w-[211px]">
									<div class="bg-[#70ae6e] rounded-full h-[10px]" on:click={() => "width:100%" } />
								</div> -->
									<!-- {:else} -->
									<div class="bg-[#e3e3e3]  rounded-full h-[10px] w-[211px]">
										<!-- <div class="bg-[#70ae6e] rounded-full h-[10px]" style={"width:" + (course.PercentageCompletion* 100).toString() + "%"}/> -->
										<div class="bg-[#70ae6e] rounded-full h-[10px]" style="width:0%" />
									</div>
									<!-- {/if} -->
								</div>
								<div class="mt-9 font-bold" />
							</div>
							<!-- </button> -->
						</button>
					{/each}
					{#each quizTemplates as template}
						<!-- <a href={`/users/${data.userId}/${template.id}`}> -->
							<button
								on:click|preventDefault={(e) => handleQuizClick(e, template.Title)}
								id={template.id}
								name={template.id}
								class="leading-4 tracking-normal font-bold"
							>
								<div class="grid  grid-flow-col mb-4">
									<div class="h-16 w-16 bg-[#e3e3e3] rounded-lg ">
										<img class="m-4" src="/assets/learning-course/svg/quiz.svg" alt="" />
									</div>

									<div class="mx-4">
										<h3 class="text-left mb-5">{template.Title}</h3>
										<div class="bg-[#e3e3e3]  rounded-full h-[10px] w-[211px]">
											<div class="bg-[#70ae6e] rounded-full h-[10px]" style="width:0%" />
										</div>
									</div>
									<div class="mt-9 font-bold" />
								</div>
							</button>
						<!-- </a> -->
					{/each}
				{/if}
			</div>

			<!-- <div class="grid  grid-flow-col mb-3">
				<div class="h-16 w-16  bg-[#e3e3e3] rounded-lg ">
					<img class=" m-4 " src="/assets/learning-course/svg/slides.svg" alt="" />
				</div>
				<div class="mx-2">
					<h3 class="text-left  mb-1">Module 02</h3>
					<p class="mb-3">Being Adolescence</p>
					<div class=" bg-[#e3e3e3] rounded-full h-[10px] w-[211px]">
						<div class="bg-[#a5a5a5] rounded-full h-[10px]" style="width:0%" />
					</div>
				</div>
				<div class="mt-9 font-bold">0%</div>
			</div>
			<div class="grid  grid-flow-col mb-3">
				<div class="h-16 w-16  bg-[#e3e3e3] rounded-lg ">
					<img class=" m-5 " src="/assets/learning-course/svg/video.svg" alt="" />
				</div>
				<div class="mx-2">
					<h3 class="text-left  mb-1">Module 03</h3>
					<p class="mb-3">Being a youth</p>
					<div class=" bg-[#e3e3e3] rounded-full h-[10px] w-[211px]">
						<div class="bg-[#a5a5a5] rounded-full h-[10px]" style="width:0%" />
					</div>
				</div>
				<div class="mt-9 font-bold">0%</div>
			</div>
			<div class="grid  grid-flow-col mb-3">
				<div class="h-16 w-16  bg-[#e3e3e3] rounded-lg ">
					<img class=" m-4 " src="/assets/learning-course/svg/module.svg" alt="" />
				</div>
				<div class="mx-2">
					<h3 class="text-left  mb-1">Module 04</h3>
					<p class="mb-3 leading-4">Adolescents & youth as..</p>
					<div class=" bg-[#e3e3e3] rounded-full h-[10px] w-[211px]">
						<div class="bg-[#a5a5a5] rounded-full h-[10px]" style="width:0%" />
					</div>
				</div>
				<div class="mt-9 font-bold">0%</div>
			</div>
			<div class="grid  grid-flow-col mb-7">
				<div class="h-16 w-16  bg-[#e3e3e3] rounded-lg ">
					<img class="m-4" src="/assets/learning-course/svg/quiz.svg" alt="" />
				</div>
				<div class="mx-2">
					<h3 class="text-left mt-1  mb-7">Quiz</h3>

					<div class=" bg-[#e3e3e3] rounded-full h-[10px] w-[211px]">
						<div class="bg-[#a5a5a5] rounded-full h-[10px]" style="width:0%" />
					</div>
				</div>
				<div class="mt-9 font-bold">0%</div>
			</div> -->

			<button class="text-center">
				<a href="/users/{userId}/my-learnings"> BACK TO COURSES </a>
			</button>
		</div>
	</div>
</div>
