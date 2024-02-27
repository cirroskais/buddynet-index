import { error, redirect } from "@sveltejs/kit"
import { COOKIE } from "../../../lib/constants"
import { destorySession } from "../../../lib/server/database"

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, params, cookies }) {
	await destorySession(cookies.get(COOKIE))
	cookies.delete(COOKIE, { path: "/" })

	throw redirect(302, "/")
}
