<script>
	import "../app.css"
	import { page } from "$app/stores"
	import { fade } from "svelte/transition"
	import { user } from "../lib/stores"
	import { dev } from "$app/environment"
	import Logo from "../lib/Logo.svelte"

	/** @type {import('./$types').LayoutData} */
	export let data

	user.set(data.user)
</script>

<svelte:head>
	<title>root.buddy</title>
</svelte:head>

<div class="container grid grid-cols-1 justify-items-center">
	<div class="w-[48rem] py-2 divide-y-2 divide-dashed">
		<div class="flex">
			<a href="/" class="w-96 py-2">
				<Logo />
			</a>
			<div class="ml-auto space-x-12 flex">
				{#if !$user}
					<tt class="place-self-end">
						<a href="/login" class="text-2xl text-blue-500 hover:text-blue-400"> Login </a>
					</tt>
				{:else}
					<tt class="place-self-end">
						<a href="/domains" class="text-2xl text-blue-500 hover:text-blue-400">Domains</a>
					</tt>
					<tt class="place-self-end">
						<a href="/logout" class="text-2xl text-blue-500 hover:text-blue-400" data-sveltekit-reload>Logout </a>
					</tt>
				{/if}
			</div>
		</div>

		{#key $page}
			<div in:fade={{ duration: 300, delay: 200 }} class="divide-y-2 divide-dashed divide-white/50">
				{#if dev}
					<p class="bg-orange-500 m-2 text-black p-1.5 text-center">This is the development site. Your changes will not be reflected across the network.</p>
				{/if}
				<slot />
			</div>
		{/key}
	</div>
</div>
