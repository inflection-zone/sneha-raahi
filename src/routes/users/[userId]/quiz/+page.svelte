<script>
	let isAnswered = false;
	let rightAnswer = false;

	/**
	 * @param {number} questionPointer
	 * @param {number} index
	 */
	function handleAnswerClick(questionPointer, index) {
		isAnswered = true;
		rightAnswer = questions[questionPointer].correctIndex == index;
		

	}

	let questions = [
		{
			question: 'Which of the following special symbol allowed in a variable name?',
			options: ['* (asterisk)', '| (pipeline)', '- (hyphen)', '_ (underscore)'],
			correctIndex: 3
		},
		{
			question:
				'Which of the following correctly shows the hierarchy of arithmetic operations in C?',
			options: ['/ + * -', '* - / +', '+ - / *', '/ * + -'],
			correctIndex: 3
		},
		{
			question: 'Which header file should be included to use functions like malloc() and calloc()?',
			options: ['memory.h', 'stdlib.h', 'string.h', 'dos.h'],
			correctIndex: 1
		},
		{
			question: 'Which bitwise operator is suitable for turning off a particular bit in a number?',
			options: ['&& operator', '& operator', '|| operator', '! operator'],
			correctIndex: 1
		},
		{
			question: 'What function should be used to free the memory allocated by calloc() ?',
			options: ['dealloc();', 'malloc(variable_name, 0)', 'free();', 'memalloc(variable_name, 0)'],
			correctIndex: 2
		}
	];
	let answers = new Array(questions.length).fill(null);
	let questionPointer = 0;
	function getScore() {
		let score = answers.reduce((acc, val, index) => {
			if (questions[index].correctIndex == val) {
				return acc + 1;
			}
			return acc;
		}, 0);
		return (score / questions.length) * 100 + '%';
	}
	function restartQuiz() {
		answers = new Array(questions.length).fill(null);
		questionPointer = 0;
	}
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
		h-[590px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm  "
		>
			<div class="card-body ">
				<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />

				<h2 class=" text-[#5b7aa3] flex tracking-widest justify-center font-bold text-base ">
					QUIZ
				</h2>
				<div class="flex gap-36">
					<h2 class=" text-center text-base font-bold ">{questionPointer} of 10 QUESTIONS</h2>
					<div class="flex ">
						{#if isAnswered}
							{#if rightAnswer}
								<img  disabled={rightAnswer} class="  " src="/assets/quiz-wrong/svg/correct.svg" alt="" />
							{:else}
								<img class=" " src="/assets/quiz-wrong/svg/wrong.svg" alt="" />
							{/if}
						{/if}
					</div>
				</div>
				<div class=" bg-[#ffdbb2] rounded-full h-[10px]">
					<div
						class="bg-[#fcaf58] rounded-full h-[10px]"
						style="width:{(questionPointer / questions.length) * 100}%"
					/>
				</div>
				{#if !(questionPointer > answers.length - 1)}
					<p class=" text-left mt-4 font-bold text-base">
						{questions[questionPointer].question}
					</p>
					<div class=" flex flex-col items-center ">
						
						{#each questions[questionPointer].options as opt, i}
						
							<button 
								class=" {answers[questionPointer] == i ? 'selected' : ''} "
								on:click={() => {
									answers[questionPointer] = i;
									handleAnswerClick(questionPointer, i);
									
								}}
							>
								<button 
									class="h-[52px] w-[340px] mt-5 text-base font-normal px-3 border  rounded-lg bg-[#e3e3e3] hover:bg-[#fcaf58] "
								>
								 {opt}
								</button>
								
							</button>
								
						{/each}
					
					</div>

					<div class="flex gap-10">
						<button
							class=" bg-[#5b7aa3] h-[52px] w-[160px] mt-4 text-[#fff] rounded-lg"
							disabled={questionPointer == 0}
							on:click={() => {
								questionPointer--;
							}}
						>
							Previous
						</button>
						<button
							class=" bg-[#5b7aa3] h-[52px] w-[160px] mt-4 text-[#fff] rounded-lg"
							on:click={() => {
								questionPointer++;
							}}
						>
							Next
						</button>
					</div>
				{:else}
					<div class="flex flex-col ml-24 mt-10 justify-center ">
						<h1 class="text-xl">
							Your score: {getScore()}
						</h1>
						<button
							class="bg-[#5b7aa3] h-[52px] w-[160px] mt-4 text-[#fff] rounded-lg"
							on:click={restartQuiz}
						>
							Restart
						</button>
					</div>
				{/if}
			</div>
		</div>

		<div class="h-[90px] w-[375px] bg-white" />
	</div>
</div>
