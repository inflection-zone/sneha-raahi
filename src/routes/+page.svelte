<script lang="ts">
import { onMount } from 'svelte';
import type { PageData } from './$types';
import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
import { personRolesStore, genderTypesStore } from '$lib/store/general.store';

export let data: PageData;
personRolesStore.set(data.roles);
genderTypesStore.set(data.genderTypes);
LocalStorageUtils.setItem('personRoles', JSON.stringify(data.roles));
LocalStorageUtils.setItem('genderTypes', JSON.stringify(data.genderTypes));

let showSplash = true;
	onMount(() => {
		setTimeout(() => {
			showSplash = false;
		}, 3000);
	});
</script>

{#if showSplash}
	<div class="flex items-center justify-center mt-16">
		<div
			class="card card-compact rounded-none card-bordered border-slate-400 w-[375px]
        h-[812px] bg-base-100  shadow-none "
		>
			<div class="card-body ">
				<img
					class="mt-[17.6rem] mx-4 w-[300px] h-[170px]"
					src="/assets/splash-screen/svg/logo.svg"
					alt=""
				/>
			</div>
			<img src="/assets/sign-in/svg/color-strip.svg" alt="" />
		</div>
	</div>
{:else}
<div class="flex items-center justify-center mt-16">
	<div class="card card-compact w-[375px] h-[812px] bg-base-100 border-2 rounded-none">
		<div class="card-body">
			<div class="flex flex-col items-center justify-center h">
				<img
					src="/assets/about-raahi/png/logo.png"
					alt=""
					class="w-[110px] h-[50px] mt-[10px] object-contain  "
				/>
			</div>
			<div class="carousel slide relative" data-bs-ride="carousel">
				<div id="item1" class="carousel-item ">
					<div class="flex flex-col text-center justify-center">
						<img src="/assets/about-raahi/png/splashscreen-raahi.png" alt="" class="mt-[50px]" />
					<h2 class=" text-[#5b7aa3] font-bold w-[335px] h-[44px] mt-4 leading-[23px]">
						Your Learning Journey
					</h2>
					<p class=" font-normal overflow-auto text-[#000]">
						Learn about your physical, mental, sexual <br>
						and reproductive health.
					</p>
					</div>
				</div>
				<div id="item2" class="carousel-item ">
					<div class="flex flex-col text-center justify-center">
						<img src="/assets/home/svg/linkages.svg" alt="" class="mt-[50px] h-[250px]  p-4" />
					<h2 class="text-[19px] text-[#5b7aa3] font-bold w-[335px] h-[44px] mt-4 leading-[23px]">
						Linkages
					</h2>
					<p class="w-[335px] mt- h-[64px]  font-normal  text-[#000]">
						Explore career and job opportunities
					</p>
					</div>
				</div>
				<div id="item3" class="carousel-item ">
					<div class="flex flex-col text-center justify-center">
						<img src="/assets/home/svg/newsfeed.svg" alt="" class="mt-[50px] h-[250px] " />
					<h2 class="text-[19px] text-[#5b7aa3] font-bold w-[335px] h-[44px] mt-4 leading-[23px]">
						Newsfeed
					</h2>
					<p class="w-[335px] mt- h-[64px]  font-normal  text-[#000]">
						Stay connected with SNEHA and your peers
					</p>
					</div>
				</div>
				<div id="item4" class="carousel-item ">
					<div class="flex flex-col text-center justify-center">
						<img src="/assets/about-raahi/png/splashscreen-raahi.png" alt="" class="mt-[50px]" />
					<h2 class="text-[19px] text-[#5b7aa3] font-bold w-[335px] h-[44px] mt-4 leading-[23px]">
						Ask SNEHA
					</h2>
					<p class="w-[335px] mt- h-[64px]  font-normal  text-[#000]">
						Talk to a SNEHA representative
					</p>
					</div>
				</div>
			  </div>
			  <div class="flex  justify-center w-full py-2 mt-2 gap-2 ">
				<a href="#item1"  class="w-[10px] h-[10px] bg-[#dfe7fd]"> </a>
				<a href="#item2" class=" w-[10px] h-[10px] bg-[#dfe7fd]"> </a>
				<a href="#item3" class=" w-[10px] h-[10px] bg-[#dfe7fd]"> </a>
				<a href="#item4" class=" w-[10px] h-[10px] bg-[#dfe7fd]"> </a>
			  </div>
			<!-- <div class="flex flex-row items-center justify-center gap-1">
				<div class="w-[10px] h-[10px] bg-[#5b7aa3]" />
				<div class="w-[10px] h-[10px] bg-[#dfe7fd]" />
				<div class="w-[10px] h-[10px] bg-[#dfe7fd]" />
				<div class="w-[10px] h-[10px] bg-[#dfe7fd]" />
			</div> -->
			<div class="flex flex-col text-center- justify-center mt-4">
				<a href="/join-raahi">
					<button
						class="w-[340px] h-[52px] rounded-[10px] bg-[#5b7aa3] uppercase text-[#fff] tracking-[3px] text-[17px]"
					>
						join raahi
					</button></a
				>
				<a href="/sign-in">
					<button
						class="w-[340px] h-[52px] rounded-[10px] mt-[40px] bg-[#d05591] uppercase text-[#fff] tracking-[3px] text-[17px]"
					>
						sign to raahi
					</button>
				</a>
			</div>
		</div>
		<img
			src="/assets/about-raahi/png/colors-strip.png"
			alt=""
			class="w-[375px] h-[10px] object-contain"
		/>
	</div>
</div>
{/if}
