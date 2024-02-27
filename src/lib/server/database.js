import { building } from "$app/environment"
import { Db, Collection, MongoClient } from "mongodb"
import { hash, compare } from "./bcrypt.js"
import { randomBytes } from "crypto"

const client = new MongoClient(process.env.MONGO_URL || import.meta.env.VITE_MONGO_URL || "mongodb://localhost:27017")

if (!building) {
	await client.connect()
}

const database = await client.db("buddylink-index")
const users = await database.collection("users")
const routes = await database.collection("routes")
const sessions = await database.collection("sessions")
const domains = await database.collection("domains")

export async function createUser(username, password) {
	const user = {
		_id: username,
		password: await hash(password),
		joined: Date.now(),
	}

	const document = await users.insertOne(user).catch((_) => {
		return _
	})

	if (document?.message) throw document
	return user
}

export async function getUserFromUsername(_id) {
	const document = await users.findOne({ _id })

	if (document?.message) throw document
	return document
}

export async function getUserFromSession(_id) {
	const document = await sessions.findOne({ _id })
	if (document?.message) throw document

	if (!document) return false

	const user = await users.findOne({ _id: document.username }, { projection: { password: false } })
	if (user?.message) throw user

	return user
}

export async function createSessionFromUser(username) {
	const session = {
		_id: randomBytes(32).toString("base64url"),
		username,
	}

	await sessions.insertOne(session)
	return session._id
}

export async function destorySession(session) {
	const document = await sessions.deleteOne({ _id: session })
	if (document?.message) throw document
	return true
}

export async function findDomains(filter) {
	const document = await domains.find(filter)
	if (document?.message) throw document

	return await document.toArray()
}

export async function createDomain(username, domain, location) {
	const document = await domains.insertOne({
		_id: domain,
		location,
		owner: username,
		created: Date.now(),
	})

	if (document?.message) throw document
	return true
}

export async function deleteDomain(_id) {
	const document = await domains.deleteOne({
		_id,
	})

	if (document?.message) throw document
	return true
}
