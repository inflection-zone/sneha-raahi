<script lang="ts">
	let showRaahiUpdates = true;
</script>

<div class="flex items-center justify-center mt-16">
	<div
		class="card  rounded-none card-bordered border-slate-400 w-[375px]
    h-[812px]  bg-[#5B7AA3]   shadow-none"
	>
		<div class="card w-[375px] h-[130px] bg-[#5B7AA3] shadow-none rounded-none border-none">
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
			class="card card-compact card-bordered w-[375px]
        h-[590px] bg-base-100  rounded-none rounded-t-[44px] shadow-sm "
		>
			<div class="card-body ">
				<button class="h-[5px] w-[73px] bg-[#E3E3E3] ml-[8.5rem] mt-2 rounded" />
				<h2
					class=" text-[#5B7AA3] flex  justify-center uppercase tracking-widest font-bold text-base "
				>
					Newsfeed
				</h2>
				<div class="flex flex-row w-[340px] h-[34px] justify-center ">
					<button
						disabled={showRaahiUpdates}
						class="disabled:bg-[#5b7aa3] disabled:text-[#dfe7fd] rounded-2xl w-[170px] text-[#5b7aa3] h-[34px] text-center bg-[#dfe7fd] text-[13px] tracking-wider"
						on:click|preventDefault={() => (showRaahiUpdates = true)}
					>
						Raahi Updates
					</button>
					<button
						disabled={!showRaahiUpdates}
						class="disabled:bg-[#5b7aa3] disabled:text-[#dfe7fd] rounded-2xl w-[170px] text-[#5b7aa3] h-[34px] text-center bg-[#dfe7fd] text-[13px] tracking-wider"
						on:click|preventDefault={() => (showRaahiUpdates = false)}
					>
						Community Updates
					</button>
				</div>

				<!-- <div class="overflow-auto overscroll-auto"> -->
					{#if showRaahiUpdates}
                    <h4 class="text-right  text-[13px] font-semibold mb-1">27 sep 2022</h4>

                    <div class="w-[340px] h-[350px]  rounded-lg bg-[#f2e2da]">
                        <div class="flex p-1">
                            <div class="w-[50px] mt-2 ml-2 h-[45px] rounded-lg bg-[#fff] flex-none">
								<img
									src="/assets/newsfeed/png/logo.png"
									alt=""
									class="mt-2 p-1"
								/>
							</div>
                            <div class="ml-4 ">
                                <h2 class="text-left text-[15px] mt-2">
                                    Field trip to Nehru Science Centre
                                </h2>
                                <p>
                                    "Learning visits has always been a key strategy in EHSAS to build assets, agency and self-awareness in young people. On the 24th of September, 2022, 43 young people from all three sites of Dharavi, Kandivali and Kalwa visited the Nehru Science Center. 
                                </p>
                            </div>
                        </div>
                        <img
                            src= https://www.jbcnschool.edu.in/wp-content/uploads/2019/12/field-trip-nehru-science-dec-19-006.jpg
                            alt=""
                            class="w-[324px] mx-2 mt-4 h-[146px]  rounded-lg "
                        />
                    </div>

				<!-- <div class="flex flex-row gap-40 mt-2">
					<h4>23likes 23comments</h4>
					<div class="flex flex-row gap-3">
						<img src="/assets/newsfeed/png/newsfeed-likes.png" alt="" />
						<img src="/assets/newsfeed/png/newsfeed-comments.png" alt="" />
					</div>
				</div> -->
				<!-- <div class=" mt-4 ">
					<div class="flex">
						<img
							src="/assets/newsfeed-details/png/jasmine.png"
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

				{:else}
				<h4 class="text-right  text-[13px] font-semibold mb-1">27 sep 2022</h4>

				<div class="w-[340px] h-[350px]  rounded-lg bg-[#d7eaf7]">
					<div class="flex p-1">
						<div class="w-[50px] mt-2 ml-2 h-[45px] rounded-lg bg-[#fff] flex-none">
							<img
								src="/assets/newsfeed/png/logo.png"
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
				</div>

			<!-- <div class="flex flex-row gap-40 mt-2">
				<h4>23likes 23comments</h4>
				<div class="flex flex-row gap-3">
					<img src="/assets/newsfeed/png/newsfeed-likes.png" alt="" />
					<img src="/assets/newsfeed/png/newsfeed-comments.png" alt="" />
				</div>
			</div> -->
			<!-- <div class=" mt-4 ">
				<div class="flex">
					<img
						src="/assets/newsfeed-details/png/jasmine.png"
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
		</div>
		<div class="h-[90px] w-[375px] bg-white">
			<div class="h-20 w-[375px] mt-3 bg-[#dfe7fd] flex ">
				<textarea
					type="text"
					class="h-[52px] p-3 ml-3 mt-3  w-[277px] rounded-lg bg-white"
					placeholder="Start typing here…"
				/>
				<div class="relative h-[50px] w-[50px] bg-[#5b7aa3] rounded-lg ml-3 mt-3  ">
					<img class="m-3" src="/assets/ask-sneha/png/send.png" alt="" />
				</div>
			</div>
		</div>
	</div>
</div>
