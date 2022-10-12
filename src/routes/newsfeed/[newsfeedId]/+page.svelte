<script>
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
						class="rounded-2xl w-[170px] text-[#DFE7FD] h-[34px] text-center bg-[#5B7AA3] text-[13px] tracking-wider"
					>
						Rahhi Updates
					</button>
					<button
						class="rounded-2xl text-center text-[#5B7AA3] w-[170px] h-[34px] bg-[#DFE7FD] text-[13px] tracking-wider"
					>
						Community Updates
					</button>
				</div>

				<!-- <div class="overflow-auto overscroll-auto"> -->

                    <h4 class="text-right  text-[13px] font-semibold mb-1"></h4>
                    <div class="w-[340px] h-[280px]  rounded-lg bg-[#f2e2da]">
                        <div class="flex flex-row p-1">
                            <div class="w-[70px] mt-2 ml-2 h-[40px] rounded-lg bg-[#fff]">
                                <img
                                    src="/assets/newsfeed/png/logo.png"
                                    alt=""
                                    class="ml-1.5 mt-3 w-[28.8px] h-[14.3px]"
                                />
                            </div>
                            <div class="ml-4 ">
                                <h2 class="text-left text-[15px] mt-2">
                                    Field trip to Nehru Science Centre
                                </h2>
                                <p>
                                    "Learning visits has always been a key strategy in EHSAS to build assets, agency and self-awareness in young people. On the 24th of September, 2022, 43 young people from all three sites of Dharavi, Kandivali and Kalwa visited the Nehru Science Center. They began their learning journey through a show on ‘Space Odyssey’ where they learnt about the various space explorations that have been undertaken by humankind, and the significance of those explorations. They then proceeded to an interactive exhibit on various physical forces in nature like gravity, centripetal and centrifugal forces. They continued on to a visual show on the Milky-Way galaxy and the solar system where they learnt about different planets and their constructs. The last show they saw was a 3D show on ‘Monsters of the sea’ which portrayed an evolutionary journey of the creatures in the sea. The day ended with open exploration of various exhibits like the ‘evolution exhibit’, ‘sound exhibit’ and the ‘light exhibit’ where they interactively learnt about reflection, refraction, vibrations, frequency and wavelength, etc.Many young people spoke about how they particularly enjoyed the shows and found them very interesting. One young person particularly said, “space ke baare main humein jaankaari di gayi jo ki bahut anek laga mujhe, aur bataaya gaya ki humaari soch aur khoj kitni aage jaa rahi hain”"
                                </p>
                            </div>
                        </div>
                        <img
                            src={news.Image}
                            alt=""
                            class="w-[324px] mx-2 mt-6 h-[146px]  rounded-lg "
                        />
                    </div>

				<div class="flex flex-row gap-40 mt-2">
					<h4>23likes 23comments</h4>
					<div class="flex flex-row gap-3">
						<img src="/assets/newsfeed/png/newsfeed-likes.png" alt="" />
						<img src="/assets/newsfeed/png/newsfeed-comments.png" alt="" />
					</div>
				</div>
				<div class=" mt-4 ">
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
				</div>
				<!-- </div> -->
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
