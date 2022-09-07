  <script>
    import { page } from '$app/stores';
    // export let message;
    // export let statusCode;
  </script>
<div class="flex items-center justify-center mt-16">
  <div
    class="card card-compact rounded-none card-bordered border-slate-400 w-[375px]
      h-[812px] bg-base-100  shadow-none "
  >
  <div class="card-body ">
  <h2 class=" font-bold justify-center text-[#5832A1]">{$page.error.statusCode}</h2>
  <h3 class="m-6 font-semibold text-[1.8rem]">{$page.error.message}</h3>
  {#if $page.error.statusCode == '404'}
      <h3 class="m-6 text-[#5832A1] font-semibold text-[1.5rem] italic">Woops! This page does not exist or has moved!</h3>
  {/if}
  <a href="/"
      class="m6 inline-block px-6 py-2.5 bg-[#5832A1] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#7165E3] hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-lg transition duration-150 ease-in-out">
      Back to Home
  </a>
</div>
  </div>
</div>