import { redirect } from "@sveltejs/kit"
import cookie from "cookie"
import { COOKIE } from "./lib/constants"
import { getUserFromSession } from "./lib/server/database"

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookie = event.cookies.get(COOKIE)
	const user = await getUserFromSession(cookie)

	if (cookie && !user) {
		event.cookies.delete(COOKIE)
	}

	if (event.route.id.startsWith("/(user)/") && !user) {
		throw redirect(302, "/login")
	}

	event.locals.user = user

	return await resolve(event)
}
