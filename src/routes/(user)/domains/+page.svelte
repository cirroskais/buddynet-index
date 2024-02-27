<script>
	import { IPV6_REGEX } from "../../../lib/constants"
	import Input from "../../../lib/Input.svelte"
	import Submit from "../../../lib/Submit.svelte"
	import FailedIcon from "../../../lib/FailedIcon.svelte"
	import PassedIcon from "../../../lib/PassedIcon.svelte"
	import UserRoute from "../../../lib/UserRoute.svelte"

	/** @type {import('./$types').ActionData} */
	export let form

	/** @type {import('./$types').PageData} */
	export let data

	let domainCheck1, domainCheck2, domainCheck3, domainCheck4, locationCheck1
	let domain = form?.domain || "",
		location = form?.location || ""

	function domainChange() {
		domainCheck1 = domain.length > 6
		domainCheck2 = domain.length < 24
		domainCheck3 = domain.endsWith(".buddy")
		domainCheck4 = new RegExp(/^[a-zA-Z0-9]*$/g).test(domain.split(".")[0])
	}

	function locationChange() {
		locationCheck1 = new RegExp(IPV6_REGEX).test(location)
	}

	domainChange()
	locationChange()
</script>

{#if form?.message}
	<p class="">{form?.message}</p>
{/if}

<div class="py-2 flex">
	<form class="flex flex-col max-w-sm flex-grow" method="POST" action="?/create">
		<Input type={"text"} name={"domain"} label={"Domain"} bind:value={domain} input={domainChange} />
		<Input type={"text"} name={"location"} label={"Location"} bind:value={location} input={locationChange} />

		<Submit text={"Register Domain"} />
	</form>

	<div class="place-self-center space-y-2">
		{#if domainCheck1}
			<p class="px-4 text-green-500"><PassedIcon /> Domain must be longer than 6 characters.</p>
		{:else}
			<p class="px-4 text-red-500"><FailedIcon /> Domain must be longer than 6 characters.</p>
		{/if}
		{#if domainCheck2}
			<p class="px-4 text-green-500"><PassedIcon /> Domain must be shorter than 24 characters.</p>
		{:else}
			<p class="px-4 text-red-500"><FailedIcon /> Domain must be shorter than 24 characters.</p>
		{/if}
		{#if domainCheck3}
			<p class="px-4 text-green-500"><PassedIcon /> Domain must end in <tt class="text-base bg-black/30 rounded-md p-1">.buddy</tt></p>
		{:else}
			<p class="px-4 text-red-500"><FailedIcon /> Domain must end in <tt class="text-base bg-black/30 rounded-md p-1">.buddy</tt></p>
		{/if}
		{#if domainCheck4}
			<p class="px-4 text-green-500"><PassedIcon /> Domain must be alphanumeric.</p>
		{:else}
			<p class="px-4 text-red-500"><FailedIcon /> Domain must be alphanumeric.</p>
		{/if}
		{#if locationCheck1}
			<p class="px-4 text-green-500"><PassedIcon /> Location must be a valid IPv6 address.</p>
		{:else}
			<p class="px-4 text-red-500"><FailedIcon /> Location must be a valid IPv6 address.</p>
		{/if}
	</div>
</div>

{#each data?.domains as domain}
	<UserRoute fqdn={domain._id} ipv6={domain.location} />
{:else}
	<p class="text-xl text-center py-5">You have no domains registered.</p>
{/each}
