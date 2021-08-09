export default async function getUserById(id) {
	const url = `http://localhost:3000/users/${id}`;
	const user = await fetch(url).then((response) => response.json());

	return user;
}
