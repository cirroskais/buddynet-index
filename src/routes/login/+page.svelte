<script>
	import Input from "../../lib/Input.svelte"
	import Submit from "../../lib/Submit.svelte"

	/** @type {import('./$types').ActionData} */
	export let form

	let state = form?.state
	function changeState() {
		state = !state
	}
</script>

<div>
	<div class="max-w-sm mx-auto p-2">
		{#if form?.error}
			<p class="text-red-500">{form?.error}</p>
		{/if}

		<form class="flex flex-col" method="POST">
			<Input type={"text"} name={"username"} label={"Username"} value={form?.username} />
			<Input type={"password"} name={"password"} label={"Password"} />

			{#if !state}
				<Submit formaction={"?/login"} text={"Login"} />
				<button class="text-sm" on:click={changeState}>Don't have an account? Click to register.</button>
			{:else}
				<Input type={"password"} name={"password_confirm"} label={"Confirm Password"} />
				<Submit formaction={"?/register"} text={"Register"} />
				<button class="text-sm" on:click={changeState}>Have an account? Click to login.</button>
			{/if}
		</form>
	</div>
</div>
