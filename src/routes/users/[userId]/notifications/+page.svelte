<script lang="ts">
	import type { PageServerData } from './$types';
	import hrt from 'human-readable-time';

	export let data: PageServerData;
	let notifications = data.allNotifications.NotificationRecords.Items;
	notifications = notifications.sort((a, b) => { return b.SentOn - a.SentOn; });
	console.log(`\n Notifications = ${JSON.stringify(notifications)}`);
    
	// let showCollapseNotification = true;
// 	const handleNotificationClick = async (e) => {
// 		console.log(e.currentTarget);
// 		const notificationId = e.currentTarget.id;
// 		console.log(`notificationId = ${notificationId}`)
// 		await update({
// 			sessionId: data.sessionId,
// 			notificationId,
// 		});
// 	}

// 	async function update(model) {
//     const response = await fetch(`/api/server/notifications`, {
//       method: 'POST',
//       body: JSON.stringify(model = {SentOn : new Date()}),
//       headers: {
//         'content-type': 'application/json'
//       }
//     });
// 	console.log('response.....',response)
//   }

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
				<card class="w-[320px] h-[100px] rounded-md mb-4 border-radius border shadow-md">
					<div id={notification.id} class="mb-2">
						<div class="p-4">
							<!-- <img class=" h-4 w-4" src= {notification.ImageUrl} alt="" /> -->
							<h2 class="mb-1font-semibold">{notification.Title.length > 20 ? notification.Title.substring(0, 18) + '...': notification.Title}</h2>
							<p>{notification.Body}</p>
						</div>		
					</div>
				</card>
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
