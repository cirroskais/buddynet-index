import { fail, redirect } from "@sveltejs/kit"
import { IPV6_REGEX } from "../../../lib/constants"
import { createDomain, findDomains, deleteDomain } from "../../../lib/server/database"
import { sync } from "../../../lib/server/hostfile"

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData()
		const domain = data.get("domain")
		const location = data.get("location")

		if (domain.length < 6) return fail(400, { domain, location, error: 1 })
		if (domain.length > 24) return fail(400, { domain, location, error: 2 })
		if (!domain.endsWith(".buddy")) return fail(400, { domain, location, error: 3 })
		if (!new RegExp(/^[a-zA-Z0-9]*$/g).test(domain.split(".")[0])) return fail(400, { domain, location, error: 4 })
		if (!IPV6_REGEX.test(location)) return fail(400, { domain, location, error: 5 })

		await createDomain(locals.user._id, domain, location).catch((_) => _)

		await sync()

		throw redirect(302, "/domains")
	},
	delete: async ({ request, locals }) => {
		const data = await request.formData()
		const domain = data.get("domain")

		const document = await findDomains({ _id: domain, owner: locals.user._id })
		if (!document[0]) return fail(403, "Forbidden")

		await deleteDomain(domain)

		await sync()

		throw redirect(302, "/domains")
	},
}

/** @type {import('./$types').PageLoad} */
export async function load({ request, locals }) {
	return {
		domains: await findDomains({ owner: locals.user._id }),
	}
}
