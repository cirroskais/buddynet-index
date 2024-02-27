<script>
	import { page } from "$app/stores"
</script>

{#if $page.status == 404}
	<p>Not Found</p>
{:else}
	<p>Internal Server Error</p>
{/if}
