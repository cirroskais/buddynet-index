import { fail, redirect } from "@sveltejs/kit"
import { getUserFromUsername, createUser, createSessionFromUser } from "../../lib/server/database"
import { COOKIE } from "../../lib/constants"
import { compare } from "../../lib/server/bcrypt"

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData()
		const username = data.get("username")
		const password = data.get("password")

		const user = await getUserFromUsername(username)
		if (!user)
			return fail(400, {
				state: false,
				error: "Incorrect username/password.",
				username: username,
			})

		if (!(await compare(password, user.password)))
			return fail(400, {
				state: false,
				error: "Incorrect username/password.",
				username: username,
			})

		const session = await createSessionFromUser(user._id)

		cookies.set(COOKIE, session, { secure: false })
		throw redirect(302, "/")
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData()
		const username = data.get("username")
		const password = data.get("password")
		const password_confirm = data.get("password_confirm")

		if (password_confirm !== password)
			return fail(400, {
				state: true,
				error: "Your passwords do not match.",
				username: username,
			})

		if (password.length < 6 || password.length > 128)
			return fail(400, {
				state: true,
				error: "Your password must be over 6 characters and not over 128 characters.",
				username: username,
			})

		if (username.length < 2 || username.length > 16 || !new RegExp(/^[a-zA-Z0-9_]*$/g).test(username))
			return fail(400, {
				state: true,
				error: "Usernames can only be 2-16 characters long and only contain alphanumeric characters.",
				username: username,
			})

		const existingUser = await getUserFromUsername(username)
		if (existingUser)
			return fail(400, {
				state: true,
				error: "That username is taken.",
				username: username,
			})

		const user = await createUser(username, password)
		const session = await createSessionFromUser(user._id)

		cookies.set(COOKIE, session, { secure: false })
		throw redirect(302, "/")
	},
}
