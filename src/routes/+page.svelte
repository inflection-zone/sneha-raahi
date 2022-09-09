<script lang="ts">
import { onMount } from 'svelte';
import type { PageData } from './$types';
import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
import { personRolesStore, currentUserRoleStore } from '$lib/store/person.roles.store';
import { genderTypesStore } from '$lib/store/gender.types.store';

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
				<div class="flex flex-col items-center justify-center">
					<img
						src="/assets/about-raahi/png/logo.png"
						alt=""
						class="w-[110px] h-[50px] mt-[10px] object-contain  "
					/>
					<img src="/assets/about-raahi/png/splashscreen-raahi.png" alt="" class="mt-[50px]" />
				</div>
				<div class="flex flex-col text-center justify-center">
					<h2 class="text-[19px] text-[#5b7aa3] font-bold w-[335px] h-[44px] leading-[23px]">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</h2>
					<p class="w-[335px] mt-3 h-[64px] text-[14px] font-normal leading-[1.25rem] text-[#000]">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lacus nec est
						condimentum consectetur quis eget nisi. Sed
					</p>
				</div>
				<div class="flex flex-row items-center justify-center gap-1">
					<div class="w-[10px] h-[10px] bg-[#5b7aa3]" />
					<div class="w-[10px] h-[10px] bg-[#dfe7fd]" />
					<div class="w-[10px] h-[10px] bg-[#dfe7fd]" />
					<div class="w-[10px] h-[10px] bg-[#dfe7fd]" />
				</div>
				<div class="flex flex-col text-center- justify-center mt-[80px]">
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
