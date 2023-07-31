<script lang="ts">
	import '../app.postcss';
	import { initFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';
	import moengage from '@moengage/web-sdk';
	import { onMount } from 'svelte';

	const flash = initFlash(page);
	beforeNavigate((nav) => {
		if ($flash && nav.from?.url.toString() != nav.to?.url.toString()) {
			$flash = undefined;
		}
	});

	flash.subscribe(($flash) => {
		if (!$flash) return;

		toast($flash.message, {
			icon: $flash.type == 'success' ? '✅' : '❌'
		});

		flash.set(undefined);
	});

	onMount(() => {
		moengage.initialize({
			app_id: 'XXXXXXXXXX' //replace this with app id from MoEngage dashboard
		});
	});
</script>

<Toaster />

<!-- {#if browser } -->
<!-- <Toasts/> -->
<!-- {/if} -->

<!-- <Modal show={$modal}> -->
<slot>
	<main />
</slot>
<!-- </Modal> -->
