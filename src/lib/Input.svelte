<script>
	export let type, name, label, value, extraClass, input
</script>

{#if label}
	<label for={name}>{label}</label>
{/if}
{#if type == "text"}
	<input class="bg-black/40 text-white py-1 px-2 rounded-md {extraClass}" {name} id={name} bind:value on:input={input} />
{:else if type == "password"}
	<input class="bg-black/40 text-white py-1 px-2 rounded-md {extraClass}" type="password" {name} id={name} bind:value on:input={input} />
{/if}
