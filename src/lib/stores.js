import { writable } from "svelte/store"

export const user = writable({
	_id: null,
	joined: null,
})
