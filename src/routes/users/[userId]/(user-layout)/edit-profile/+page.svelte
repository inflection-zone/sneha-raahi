<script lang="ts">
  import type { PageServerData } from './$types';
  import date from 'date-and-time';
  export let data: PageServerData;
  let firstName = data.user.User.Person.FirstName;
  let lastName = data.user.User.Person.LastName;
//   let birthDate = data.user.User.Person.BirthDate;
  let phone = data.user.User.Person.Phone;
  let addresses = data.user.User.Person.Addresses;
  let address = addresses;
  console.log("address",address);
  let userId = data.user.User.id;
  console.log("user",data.user);

  let birthDate = date.format(new Date(data.user.User.Person.BirthDate), 'MM-DD-YYYY');

// let validTill = new Date();
</script>

<div
	class="card card-compact card-bordered w-[375px] h-[701px] border-slate-200 bg-base-100 rounded-none rounded-t-[44px] shadow-sm"
>
	<div class="card-body ">
		<button class=" h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" />
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			EDIT PROFILE
		</h2>
        <form method="post" action="?/updateProfile">
            <div name = userId  value={userId} class='hidden'></div>
            <input
                placeholder="First Name"
                name="firstName"
                required
                type="text"
                class=" h-[52px] w-[340px] py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
                bind:value={firstName}
            />
            <input
                placeholder="Last Name"
                type="text"
                name="lastName"
                required
                bind:value={lastName}
                class=" h-[52px] w-[340px] py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
            />
            <input
                placeholder="BirthDate"
                type=""
                name="birthDate"
                value={birthDate}
                class=" h-[52px] w-[340px] py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
            />
            <input
                placeholder="Phone Number"
                type=""
                name="phone"
                required
                bind:value={phone}
                class=" h-[52px] w-[340px] py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "

            />
            <input
                placeholder="Location"
                name="address"
                bind:value={address}
                class=" h-[52px] w-[340px] py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
            />

        <div
            class="w-[340px] h-[52px] mt-[16px] mr-[17px] mb-4 pt-[15px] px-[106px] pb-15px  rounded-[10px] bg-[#5B7AA3]"
        >
            <!-- <a href="/users/{userId}/my-profile"> -->

                <button type="submit"
                    class="w-[170px] h-[25px] text-[16px] not-italic text-center text-[#fff] tracking-[3px] font-bold"
                >
                    VIEW PROFILE
                </button>
                <!-- </a> -->
        </div>
    </form>
		
	</div>
</div>
