<script lang="ts">
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';
	import { page } from '$app/stores';
	import { errorMessage, showMessage, successMessage } from '$lib/utils/message.utils';
</script>

<div class="card card-compact card-bordered w-[375px] h-[590px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm">
	<div class="card-body ">
		<button class=" h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			ASK SNEHA
		</h2>
		<div class=" h-[470px] overflow-auto scrollbar-medium ">
			<p class="flex text-xs leading-3 justify-center ">09 Dec 2021</p>

			<div class="grid grid-flow-col mb-3">
				<img src="/assets/ask-sneha/png/sneha.png" alt="" />
				<div>
					<h3 class="text-left mt-2 mb-1">SNEHA</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/><br/>Aenean eu quam
						fermentum risus varius pellentesque scelerisque at velit. Nulla et convallis nunc.
					</p>
				</div>
			</div>
			<div class="grid grid-flow-col mb-3 relative">
				<div class=" mr-3">
					<h3 class="text-right  mb-1">You</h3>
					<p class="text-right">
						Lorem ipsum dolor sit amet, consectetur mauris non massa adipiscing elit.<br/><br/>
						Mauris sodales diam at justo aliquet accu bolo amet colit doisa msan.
					</p>
				</div>
				<img src="/assets/ask-sneha/png/mask.png" alt="" />
			</div>
			<div class="grid grid-flow-col mb-3">
				<img src="/assets/ask-sneha/png/sneha.png" alt="" />
				<div>
					<h3 class="text-left mt-2 mb-1">SNEHA</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />Aenean eu quam
						fermentum risus varius pellentesque scelerisque at velit. Nulla et convallis nunc.
					</p>
				</div>
			</div>

			<div class="grid grid-flow-col mb-3 relative">
				<div class=" mr-3">
					<h3 class="text-right  mb-1">You</h3>
					<p class="text-right">
						Lorem ipsum dolor sit amet, consectetur mauris non massa adipiscing elit.
					</p>
				</div>
				<img src="/assets/ask-sneha/png/mask.png" alt="" />
			</div>
			<div class="grid grid-flow-col mb-3">
				<img src="/assets/ask-sneha/png/sneha.png" alt="" />
				<div>
					<h3 class="text-left mt-2 mb-1">SNEHA</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />Aenean eu quam
						fermentum risus varius pellentesque scelerisque at velit. Nulla et convallis nunc.
					</p>
				</div>
			</div>
		</div>

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
