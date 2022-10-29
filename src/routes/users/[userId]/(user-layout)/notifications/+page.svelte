<script lang="ts">
	import type { PageServerData } from './$types';
	import hrt from 'human-readable-time';
	import { timeAgo } from 'short-time-ago';
	export let data: PageServerData;
	// let color = 'gray'
	let records = data.allNotifications.NotificationRecords.Items;
	let notifications = records.map(x => {
		return {
			...x,
			expand: false,
		}
	})
	notifications = notifications.sort((a, b) => { return b.SentOn - a.SentOn; });
	console.log(`\n Notifications = ${JSON.stringify(notifications)}`);
    
	const handleNotificationClick = async (e) => {
		console.log(e.currentTarget);
		const notificationId = e.currentTarget.id;
		console.log(`notificationId = ${notificationId}`);
		// notifications.forEach(element => {
		// 	if (element.id === notificationId) {
		// 		element.expand = !element.expand;
		// 	}
		// });
		console.log()
		await update({
			sessionId: data.sessionId,
			notificationId,
			readOn : new Date(),
		});
	}

	async function update(model) {
    const response = await fetch(`/api/server/notifications`, {
      method: 'POST',
      body: JSON.stringify(model),
      headers: {
        'content-type': 'application/json'
      }
    });
	console.log('response',response);
	return response;
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
					NOTIFICATIONS
				</h2>
				<div class=" card-body h-[590px] overflow-auto scrollbar-medium ">
				{#each notifications as notification}
				{#if notification.expand == false}
				<card style="background-color:[]" class=" w-[320px] h-[100px] mb-1 border-none">
					<button on:click|preventDefault={(e) => {
						notification.expand == !notification.expand;
						handleNotificationClick(e)}} id={notification.id} name={notification.id} class = "font-semibold leading-3 text-left tracking-normal" >
					<div id={notification.id} class="">
						<div class="pl-3 py-2">
							<!-- <img class=" h-4 w-4" src= {notification.ImageUrl} alt="" /> -->
							<h2 class=" text-base mb-1">{notification.Title.length > 30 ? notification.Title.substring(0, 28) + '...': notification.Title}</h2>
							<p class="font-light text-sm pr-1">{notification.Body}</p>
							<div class="text-right font-normal text-sm px-2 pr-4" >{timeAgo(new Date(notification.SentOn))}</div>
						</div>		
					</div>
					</button>
				</card>
				{:else}
				<card style="background-color:white" class=" w-[320px] h-[400px] rounded-md mb-4 border-radius border shadow-md">
					<button on:click|preventDefault={(e) => handleNotificationClick(e)} id={notification.id} name={notification.id} class = "font-semibold leading-3 text-left tracking-normal" >
						<div id={notification.id} class="mb-2">
						<div class="pl-4 py-4">
							<!-- <img class=" h-4 w-4" src= {notification.ImageUrl} alt="" /> -->
							<h2 class="mb-3 font-semibold">{notification.Title}</h2>
							<p>{notification.Body}</p>
						</div>		
					</div>
					</button>
				</card>
				{/if}
				{/each}
			
				<!-- <div class="mb-2">
					<div class="flex relative mb-1 ">
						<h3>Lorem ipsum dolor sit amet</h3>
						<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">12 Dec</div>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisi odio, lacinia
						eu dictum a, consequat eget purus. Phasellus nec est luctus, faucibus enim non,
						malesuada sapien.
					</p>
				</div>
				<div class="mb-2 opacity-25">
					<div class="flex relative mb-1 ">
						<h3>Lorem ipsum dolor sit amet</h3>
						<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">12 Dec</div>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisi odio, lacinia
						eu dictum a, consequat eget purus. Phasellus nec est luctus, faucibus enim non,
						malesuada sapien.
					</p>
				</div>
				<div class="mb-2 opacity-25">
					<div class="flex relative mb-1 ">
						<h3 class="">Lorem ipsum dolor sit amet</h3>
						<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">12 Dec</div>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisi odio, lacinia
						eu dictum a, consequat eget purus. Phasellus nec est luctus, faucibus enim non,
						malesuada sapien.
					</p>
				</div>
				<div class="mb-2 opacity-25">
					<div class="flex relative mb-1 ">
						<h3>Lorem ipsum dolor sit amet</h3>
						<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">12 Dec</div>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisi odio, lacinia
						eu dictum a, consequat eget purus. Phasellus nec est luctus, faucibus enim non,
						malesuada sapien.
					</p>
				</div>
				<div class="mb-2 opacity-25">
					<div class="flex relative mb-1 ">
						<h3>Lorem ipsum dolor sit amet</h3>
						<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">12 Dec</div>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisi odio, lacinia
						eu dictum a, consequat eget purus. Phasellus nec est luctus, faucibus enim non,
						malesuada sapien.
					</p>
				</div> -->
			</div>
			</div>
		</div>
	</div>
</div>
