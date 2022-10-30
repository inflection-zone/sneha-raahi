<script lang="ts">
    import UserSessionLayout from '$lib/components/common/user.session.svelte';
    import Navbar from '$lib/components/navbar/nav.svelte';
    import { navbarDisplay } from '$lib/components/navbar/navbar.display.store';
    import { page } from '$app/stores';
	  import Toasts from '$lib/components/toast/toasts.svelte';
    const userId = $page.params.userId;
</script>
<svelte:head>
  <title>{$page.data.title ? $page.data.title : 'Sneha-Raahi'}</title>
</svelte:head>

<div class="grid gird-cols justify-center items-center">
	<div class="w-[375px] h-[812px]">
    <div class="flex items-center justify-center mt-16">
      <Navbar userId={userId}/>
      <UserSessionLayout userId={userId} on:toggleSidebar={()=>{
        console.log(`Sidebar toggled: ${$navbarDisplay}`);
        $navbarDisplay = !$navbarDisplay;
      }}>
        <slot>
            <main/>
        </slot>
      </UserSessionLayout>
    </div>
  </div>
</div>
