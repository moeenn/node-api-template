const project = "node-template"
const username = "devuser"
const password = "devpass"

db.createCollection(project)
db.createUser({
	user: username,
	pwd: password,
	roles: [
		{
			role: "readWrite",
			db: project
		}
	],
})
