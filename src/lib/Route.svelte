<script>
	export let username,
		fqdn,
		ipv6,
		port = 80

	let anchor = port == 80 ? fqdn : `${fqdn}:${port}`
</script>

<div class="flex">
	<p class="p-2">
		<a href="/user/{username}" class="text-lg text-blue-500 hover:text-blue-400">{username}</a>
	</p>
	<p class="p-2 ml-auto">
		<tt class="py-1 px-2 bg-black/40 rounded-md text-lg">
			<a href="http://{fqdn}:{port}/" class="text-lg text-blue-500 hover:text-blue-400">{anchor}</a>
		</tt>
	</p>
	<p class="p-2">
		<tt class="py-1 px-2 bg-black/40 rounded-md text-lg">{ipv6}</tt>
	</p>
</div>
