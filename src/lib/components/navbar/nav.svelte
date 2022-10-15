<script>
    export let show=false;
    // import { fly } from 'svelte/transition';
</script>
{#if show}
 <div class="mt-10 ">
     <ul class="menu p-4 overflow-y-auto  w-[375px] h-[600px] text-base-content bg-[#DFE7FD]">
         <div class="grid grid-cols gap-2 ">
             <button class="flex flex-rows border-2  hover:bg-red-200 ">
                 <img src="/assets/home-sidebar/png/home-sidebar.png" alt="" class="my-2 mx-4" />
                 <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] text-[14px]">home</h3>
             </button>
             <button class="flex flex-rows border-2  hover:bg-red-200 ">
                 <img src="/assets/home-sidebar/png/my-profile-sidebar.png" alt="" class="my-2 mx-4" />
                 <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] text-[14px]">
                     my profile
                 </h3>
             </button>
             <button class="flex flex-rows border-2  hover:bg-red-200">
                 <img src="/assets/home-sidebar/png/my-learning-sidebar.png" alt="" class="my-2 mx-4" />
                 <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] text-[14px]">
                     my learning
                 </h3>
             </button>
             <button class="flex flex-rows border-2  hover:bg-red-200">
                 <img src="/assets/home-sidebar/png/chat-sidebar.png" alt="" class="my-2 mx-4" />
                 <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] text-[14px]">chat</h3>
             </button>
             <button class="flex flex-rows border-2  hover:bg-red-200">
                 <img src="/assets/home-sidebar/png/newsfeed-sidebar.png" alt="" class="my-2 mx-4" />
                 <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] text-[14px]">
                     newsfeed
                 </h3>
             </button>
             <button class="flex flex-rows border-2  hover:bg-red-200">
                 <img src="/assets/home-sidebar/png/linkages-sidebar.png" alt="" class="my-2 mx-4" />
                 <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] text-[14px]">
                     linkages
                 </h3>
             </button>
             <button class="flex flex-rows border-2  hover:bg-red-200">
                 <img src="/assets/home-sidebar/png/ask-sneha-sidebar.png" alt="" class="my-2 mx-4" />
                 <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] text-[14px]">
                     ask sneha
                 </h3>
             </button>
             <button class="flex flex-rows border-2 hover:bg-red-200 ">
                 <img src="/assets/home-sidebar/png/settings-sidebar.png" alt="" class="my-2 mx-4" />
                 <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] text-[14px]">
                     settings
                 </h3>
             </button>
         </div>
   <div class="flex flex-row justify-center gap-32  uppercase  text-[#5B7AA3] cursor-pointer">
     <h3 class="text-[13px] mt-[200px]"> logout</h3>
     <h3 class="text-[13px] mt-[200px]">about sneha</h3>
   </div>
 </ul>
</div>
{/if}