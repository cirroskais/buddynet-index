import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: "calones.buddy",
		port: 8000,
	},
})
