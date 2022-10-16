<script lang="ts">
    import '../app.postcss';
    import Navbar from '../lib/components/navbar/nav.svelte';
    import Toasts from '$lib/components/toast/toasts.svelte';
	  import { browser } from '$app/environment';
</script>

  <Navbar/>

  <!-- {#if browser } -->
    <Toasts/>
  <!-- {/if} -->

<slot>
  <main>
  </main>
</slot>
