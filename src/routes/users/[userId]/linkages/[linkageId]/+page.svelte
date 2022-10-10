<script lang="ts" >
	import type { PageServerData } from './$types';
	import hrt from 'human-readable-time';

	export let data: PageServerData;
    let notice = data.notice;
	let noticeId = data.notice.id;
	let action = data.notice.action
	
	console.log(`${JSON.stringify(notice)}`);
	
	const handleAppyForJobClick = async (e) => {
		console.log(e.currentTarget);
		const noticeId = e.currentTarget.id;
		console.log(`noticeId = ${noticeId}`)
		await create({
			sessionId: data.sessionId,
			userId: data.userId,
			noticeId : data.notice.id,
			action: data.notice.Action
		});
		
	}
	async function create(model) {
    const response = await fetch(`/api/server/linkages`, {
      method: 'POST',
      body: JSON.stringify(model),
      headers: {
        'content-type': 'application/json'
      }
    });
	console.log('response.......',response);
	
  }
	
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
		h-[701px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm "
		>
			<div class="card-body ">
				<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
				<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
					LINKAGES
				</h2>
				<div class="flex justify-center  mt-20 mb-1">
					<img class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" src={data.notice.ImageUrl} alt=""/>
					<div class="ml-3 ">
						<div id={data.notice.id} class="flex mb-5">
							<h3 class="text-left" >{data.notice.Title}</h3>
							<div class="text-base font-semibold ml-4  leading-5 ">{hrt(new Date(data.notice.PostDate), '%relative% ago')}</div>
						</div>
						<p>
							{data.notice.Description}
						</p>
					</div>
				</div>
				<a href={`/users/${data.userId}/linkages`}>
				<button on:click={(e)=>handleAppyForJobClick(e)} id={data.notice.id} name={data.notice.Action} value={data.notice.Action} class=" h-[52px] w-[340px] mt-2 text-[#fff]  rounded-lg bg-[#5b7aa3] "
				>
					APPLY FOR JOB</button
				>
			</a>
			</div>
		</div>
	</div>
</div>
