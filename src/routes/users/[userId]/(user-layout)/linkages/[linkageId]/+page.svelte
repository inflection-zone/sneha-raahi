<script lang="ts" >
	import type { PageServerData } from './$types';
	// import hrt from 'human-readable-time';
	import { timeAgo } from 'short-time-ago';
	import { goto } from '$app/navigation';
	export let data: PageServerData;
    let notice = data.notice;
	const postDate = new Date(data.notice.PostDate);
	// let date = hrt(new Date(data.notice.PostDate),'%relative% ago');
	console.log(`${JSON.stringify(notice)}`);

	const handleAppyForJobClick = async (e) => {
		console.log(e.currentTarget);
		const noticeId = e.currentTarget.id;
		console.log(`noticeId = ${noticeId}`)
		await create({
			sessionId: data.sessionId,
			userId: data.userId,
			noticeId: data.notice.id,
			action: 'Apply for job',
			title: data.notice.Title,
			resourceId: data.notice.resourceLink,
		});
		goto(`/users/${data.userId}/linkages`);
	}

	async function create(model) {
		const response = await fetch(`/api/server/linkages`, {
		method: 'POST',
		body: JSON.stringify(model),
		headers: {
			'content-type': 'application/json'
		}
		});
		console.log('response',response);
		return response ;
  }
</script>

<div class="card card-compact card-bordered w-[375px] h-[701px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm">
	<div class="card-body ">
		<button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			LINKAGES
		</h2>
		<div class="flex justify-center  mt-5 mb-6">
			<img class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" src={data.notice.ImageUrl} alt=""/>
			<div class="ml-3 ">
				<div id={data.notice.id} class="flex mb-4">
					<h3 class="text-left" >{data.notice.Title}</h3>
					<div class="text-base font-normal ml-4  leading-5 ">{timeAgo(postDate)}</div>
				</div>
				<p>
					{data.notice.Description}
				</p>
			</div>
		</div>
		<!-- <a href={`/users/${data.userId}/linkages`}> -->
		<button on:click|preventDefault = {(e)=>handleAppyForJobClick(e)} id={notice.id} name={notice.id} class=" h-[52px] w-[340px] mt-2 text-[#fff]  rounded-lg bg-[#5b7aa3] "
		>
			APPLY FOR JOB</button
		>
	<!-- </a> -->
	</div>
</div>

