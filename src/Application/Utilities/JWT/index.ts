import jwt from "jsonwebtoken"

/**
 *  create a JWT token
 * 
*/
function Create<T extends Record<string, unknown>>(payload: T, signingKey: string): string {
	const token = jwt.sign(payload, signingKey, { expiresIn: "2h" })
	return token
}

/**
 *  verify if a provided JWT is valid or not
 *  
*/
function Verify<T extends Record<string, unknown>>(token: string, signingKey: string): Option<T> {
	try {
		return jwt.verify(token, signingKey) as T
	} catch (_) {
		return
	}
}

export default {
	Create,
	Verify,
}