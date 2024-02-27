<script>
	import Route from "../lib/Route.svelte"

	/** @type {import('./$types').PageData} */
	export let data
</script>

{#each data?.domains as domain}
	<Route username={domain.owner} fqdn={domain._id} ipv6={domain.location} />
{:else}
	<p class="text-xl text-center py-5">There are no domains registered.</p>
{/each}
