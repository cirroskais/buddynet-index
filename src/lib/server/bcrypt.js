import bcrypt from "bcrypt"
const rounds = 10

export async function hash(plaintext) {
	return await bcrypt.hash(plaintext, rounds)
}

export async function compare(plaintext, hashed) {
	return await bcrypt.compare(plaintext, hashed)
}
