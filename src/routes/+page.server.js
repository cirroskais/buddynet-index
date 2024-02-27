import { findDomains } from "../lib/server/database"

/** @type {import('./$types').PageLoad} */
export async function load({ request, locals }) {
	return {
		domains: await findDomains({}),
	}
}
