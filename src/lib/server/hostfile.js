import { findDomains } from "./database"
import fs from "fs/promises"

export function serialize(domains) {
	let hosts = ""

	domains.forEach(({ _id, location }) => {
		hosts += `${location} ${_id}\n`
	})

	return hosts.trim()
}

export async function write(serialized) {
	await fs.writeFile("hosts/hosts", serialized, { encoding: "utf-8" })
}

export async function sync() {
	const domains = await findDomains()
	await write(serialize(domains))
}
