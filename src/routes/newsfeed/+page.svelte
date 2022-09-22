<script lang="ts">
    import type { PageServerData } from './$types';
    export let data: PageServerData;
    let newsItems = data.newsItems;
    let newsFeeds = data.newsFeeds;
    let showRaahiUpdates = true;
</script>
<div class="flex items-center justify-center mt-16">
    <div
        class="card  rounded-none card-bordered border-slate-400 w-[375px]
    h-[812px]  bg-[#5b7aa3]   shadow-none"
    >
        <div class="card w-[375px] h-[130px] bg-[#5b7aa3] shadow-none rounded-none border-none">
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
        h-[680px] bg-base-100  rounded-none rounded-t-[44px] shadow-sm"
        >
            <div class="card-body ">
                <button class="h-[5px] w-[73px] bg-[#e3e3e3] ml-[8.5rem] mt-2 rounded" />
                <h2
                    class=" text-[#5b7aa3] flex  justify-center uppercase tracking-widest font-bold text-base "
                >
                    Newsfeed
                </h2>
                <div class="flex flex-row w-[340px] h-[34px] justify-center ">
                    <button
                        disabled={showRaahiUpdates}
                        class="disabled:bg-[#5b7aa3] disabled:text-[#dfe7fd] rounded-2xl w-[170px] text-[#5b7aa3] h-[34px] text-center bg-[#dfe7fd] text-[13px] tracking-wider"
                        on:click|preventDefault={() => (showRaahiUpdates = true)}
                    >
                        Raahi Updates
                    </button>
                    <button
                        disabled={!showRaahiUpdates}
                        class="disabled:bg-[#5b7aa3] disabled:text-[#dfe7fd] rounded-2xl w-[170px] text-[#5b7aa3] h-[34px] text-center bg-[#dfe7fd] text-[13px] tracking-wider"
                        on:click|preventDefault={() => (showRaahiUpdates = false)}
                    >
                        Community Updates
                    </button>
                </div>
                {#if showRaahiUpdates}
                    <div class=" h-[590px] overflow-auto scrollbar-medium ">
                        {#each newsItems as news}
                            <h4 class="text-right pr-1 mt-3 mb-2 text-[13px] font-semibold">{news.pubDate}</h4>
                            <div class="w-[340px] h-[125px]  rounded-lg bg-[#f2e2da]">
                                <a class="flex justify-center p-2 mb-5 font-semibold text-left text-[#5b7aa3] hover:underline " href={news.link}
                                    >{news.title}</a
                                >
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class=" h-[590px] overflow-auto scrollbar-medium ">
                        {#each newsFeeds as news}
                            <!-- <a href="/newsfeed-details"> -->
                                <h4 class="text-right pr-1 mt-3 mb-2 text-[13px] font-semibold">{news.pubDate}</h4>
                                <div class="w-[340px] h-[125px]  rounded-lg bg-[#d7eaf7]">
                                    <a class="flex justify-center p-2 mb-5 font-semibold text-left text-[#5b7aa3] hover:underline " href={news.link}
                                        >{news.title}</a
                                    >
                                </div>
                            <!-- </a> -->
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>









