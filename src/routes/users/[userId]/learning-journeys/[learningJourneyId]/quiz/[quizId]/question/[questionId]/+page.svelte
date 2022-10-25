<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let options = data.nextQuestion.Options;
	let isAnswered = false;
	let rightAnswer = false;

	//console.log('Quiz', data.quiz);
	console.log('Next quetion', data.nextQuestion);

	const handleAnswerClick = async (e, answer: number) => {
		console.log(e.currentTarget);
		const assessmentTemplateId = e.currentTarget.id;
		console.log(`Quiz template id = ${assessmentTemplateId}`);
		await answerQuestion({
			sessionId: data.sessionId,
			assessmentId: data.quiz.id,
			assessmentQuestionId: data.nextQuestion.id,
			responseType: data.nextQuestion.ExpectedResponseType,
			answer
		});
		isAnswered = true;
		rightAnswer = data.nextQuestion.CorrectOption == answer;
	};

	async function answerQuestion(model) {
		const response = await fetch(`/api/server/quiz-answer`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('respose....', response);
	}

	// const handleNextClick = async (e) => {
	// 	console.log(e.currentTarget);
	// 	const assessmentId = e.currentTarget.id;
	// 	console.log(`Next quetion id = ${assessmentId}`);
	// };

</script>

<div class="flex items-center justify-center mt-16">
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
		h-[700px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm  "
		>
			<div class="card-body ">
				<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />

				<h2 class=" text-[#5b7aa3] flex tracking-widest justify-center font-bold text-base ">
					QUIZ
				</h2>
				<div class="flex mb-2 ">
					<h2 class=" text-center text-base font-bold ">
						<!-- {data.nextQuestion.Sequence} of 3 QUESTIONS -->Questions
					</h2>
					<!-- <div class="flex ">
						{#if isAnswered}
							{#if rightAnswer}
								<img  disabled={rightAnswer} src="/assets/quiz-wrong/svg/correct.svg" alt="" />
							{:else}
								<img src="/assets/quiz-wrong/svg/wrong.svg" alt="" />
							{/if}
						{/if}
					</div> -->
				</div>

				<div class=" bg-[#ffdbb2] rounded-full h-[10px]">
					<!-- <div
						class="bg-[#fcaf58] rounded-full h-[10px]"
						style="width:{(questionPointer / questions.length) * 100}%"
					/> -->
				</div>
				<!-- {#if !(questionPointer > answers.length - 1)} -->
				<div class="h-[400px] overflow-auto scrollbar-medium">
					<p class=" text-left mt-3 mb-2 font-bold text-lg">
						{data.nextQuestion.Title}
					</p>
					<div class=" flex flex-col items-center ">
						<!-- {#each questions[questionPointer].options as opt, i} -->
						<!--
							<button
								class=" {answers[questionPointer] == i ? 'selected' : ''} "
								on:click={() => {
									answers[questionPointer] = i;
									handleAnswerClick(questionPointer, i);

								}}
							> -->
						{#each options as option}

							<button
								on:click|once={(e) => handleAnswerClick(e, option.Sequence)}
								id={data.nextQuestion.id}
								name={data.nextQuestion.id}
								disabled ={isAnswered && option.Sequence == data.nextQuestion.CorrectOption }
								class="h-[65px] w-[340px] disabled:bg-[#fcaf58]  mt-4 first:mt-0 text-lg text-left font-normal pl-3 border tracking-normal rounded-lg bg-[#e3e3e3] active:bg-[#fcaf58] "
							>
								<div class=" flex relative ">
									{option.Text}
									{#if isAnswered}
										{#if option.Sequence == data.nextQuestion.CorrectOption}
											<img
												class="absolute right-0 pr-3 "
												src="/assets/quiz-wrong/svg/correct.svg"
												alt=""
											/>
										{:else}
											<img
												class="absolute right-0 pr-3"
												src="/assets/quiz-wrong/svg/wrong.svg"
												alt=""
											/>
										{/if}
									{/if}
								</div>
							</button>
						{/each}

						<!-- </button> -->

						<!-- {/each} -->
					</div>
				</div>
				<div class="flex justify-center">
					<button
						on:click|preventDefault={() => location.reload()}
						id={data.nextQuestion.id}
						name={data.nextQuestion.id}
						class=" bg-[#5b7aa3] h-[52px] w-[340px] mt-4 mb-4 text-[#fff] justify-center rounded-lg"
					>
						NEXT QUESTION
					</button>
				</div>
				<!-- {:else} -->
				<!-- <div class="flex flex-col ml-24 mt-10 justify-center ">
						<h1 class="text-xl">

						</h1>
						<button
							class="bg-[#5b7aa3] h-[52px] w-[160px] mt-4 text-[#fff] rounded-lg"

						>
							Restart
						</button>
					</div> -->
				<!-- {/if} -->
			</div>
		</div>
		<!-- <div class="h-[90px] w-[375px] bg-white" /> -->
	</div>
</div>
