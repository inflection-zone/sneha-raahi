<script lang="ts">
  	import QuizSingleChoice from './quiz.single.choice.svelte';
  	import QuizMultiChoice from './quiz.multi.choice.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageServerData;
	let options = data.nextQuestion.Options;
	const question = data.nextQuestion;
	console.log('Question', question);

	onMount(()=> {
		options = options.map(x => {
			return {
				...x,
				Selected: false
			}
		});
	});

	$: multiChoiceSelections = options.filter(x => x.Selected === true); //This is an array
	$: singleChoiceSelection = options.filter(x => x.Selected === true).find(e => typeof e !== 'undefined'); //This is a single value
	$: answerSubmitted = false;

	const responseType = question.ExpectedResponseType;
	const isMultichoice = responseType === 'Multi Choice Selection';
	const correctSequence = question.CorrectAnswer ? parseInt(data.nextQuestion.CorrectAnswer) : -1;

	const userId = $page.params.userId;
	const learningJourneyId = $page.params.learningJourneyId;
	const assessmentId = $page.params.quizId;
	const questionId = $page.params.questionId;

	async function answerQuestion(model) {
		const response = await fetch(`/api/server/quiz-answer`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('respose....', response);
		return response;
	}

	const onAnswerSelected = () => {
		answerSubmitted = options.filter(x => x.Selected === true).length > 0;
		multiChoiceSelections = options.filter(x => x.Selected === true); //This is an array
		singleChoiceSelection = options.filter(x => x.Selected === true).find(e => typeof e !== 'undefined');

		console.log(`answerSubmitted = ${answerSubmitted}`);
		console.log(`multiChoiceSelections = ${multiChoiceSelections}`);
		console.log(`singleChoiceSelection = ${singleChoiceSelection}`);
	}

	const handleSubmit = async (e, sequences: number[]) => {

		let answerModel = {
			sessionId: data.sessionId,
			userId: $page.params.userId,
			learningJourneyId: $page.params.learningJourneyId,
			assessmentId: assessmentId,
			assessmentQuestionId: questionId,
			responseType: responseType,
		};
		if (isMultichoice) {
			const answerArray = multiChoiceSelections.map(x => x?.Sequence);
			answerModel['answer'] = answerArray;
		}
		else {
			answerModel['answer'] = singleChoiceSelection?.Sequence;
		}

		const response = await answerQuestion(answerModel);
		const redirectPath = await response.text();
		console.log(redirectPath);
		goto(redirectPath);
	};

</script>

<div class="flex items-center justify-center mt-16">
	<div class="card  rounded-none card-bordered bg-[#5b7aa3] border-slate-400 w-[375px] h-[812px] shadow-none">
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
		<div class="card card-compact w-[375px] h-[700px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm">
			<div class="card-body ">
				<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
				<h3 class=" text-[#5b7aa3] flex tracking-widest justify-center font-bold text-base ">
					QUIZ
				</h3>
				<h3 class="text-[#5b7aa3] justify-center">{data.quiz.Title}</h3>
				<div class="flex mb-2 ">
					<h2 class=" text-center text-base font-bold ">
						{data.nextQuestion.Sequence} of {data.quiz.TotalNumberOfQuestions}
					</h2>
				</div>
				<div class=" bg-[#ffdbb2] rounded-full h-[10px]">
					<div
						class="bg-[#fcaf58] rounded-full h-[10px]"
						style="width:{(data.nextQuestion.Sequence / data.quiz.TotalNumberOfQuestions) * 100}%"
					/>
				</div>
				<!-- {#if !(questionPointer > answers.length - 1)} -->
				<div class="h-[400px] overflow-auto scrollbar-medium">
					<p class=" text-left mt-3 mb-3 font-bold text-lg">
						{data.nextQuestion.Title}
					</p>
					{#if isMultichoice}
						<QuizMultiChoice
							options={options}
							answerSubmitted={answerSubmitted}
							on:answerSelected={onAnswerSelected}>
						</QuizMultiChoice>
					{:else}
						<QuizSingleChoice
							options={options}
							correctSequence={correctSequence}
							answerSubmitted={answerSubmitted}
							on:answerSelected={onAnswerSelected}>
						</QuizSingleChoice>
					{/if}
				</div>
				<div class="flex justify-center">
					<button
						on:click|preventDefault={async () => handleSubmit}
						id="submit"
						name="submit"
						disabled={!answerSubmitted}
						class=" bg-[#5b7aa3] disabled:bg-[#7d7d7d] h-[52px] w-[340px] mt-4 mb-4 text-[#fff] justify-center rounded-lg"
					>
						SUBMIT
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
