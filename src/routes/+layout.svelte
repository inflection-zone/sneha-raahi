<script lang="ts">
    import '../app.postcss';
    import Navbar from '../lib/components/navbar/nav.svelte';
    import Toasts from '$lib/components/toast/toasts.svelte';
    import Popup from '$lib/components/popup/popup.svelte';
	  import Modal from '$lib/components/popup/modal.svelte';
    import { modal } from '$lib/components/popup/store';
    import { navbarDisplay } from '$lib/components/navbar/navbar.display.store';
</script>

<!-- {#if browser } -->
  <Toasts/>
<!-- {/if} -->

<!-- <Modal show={$modal}> -->
<slot>
    <main>
    </main>
</slot>
<!-- </Modal> -->
