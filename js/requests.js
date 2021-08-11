export async function getPostsByLimit(start, limit) {
	const url = `http://localhost:3000/posts?_start=${start}&_limit=${limit}`;
	const posts = await fetch(url).then((response) => response.json());

	return posts;
}

export async function getPost(id) {
	const url = `http://localhost:3000/posts/${id}`;
	const posts = await fetch(url).then((response) => response.json());

	return posts;
}

export async function getPostComments(id) {
	const url = `http://localhost:3000/posts/${id}/comments`;
	const comments = await fetch(url).then((response) => response.json());

	return comments;
}

export async function getUser(id) {
	const url = `http://localhost:3000/users/${id}`;
	const user = await fetch(url).then((response) => response.json());

	return user;
}

export async function updatePost(id, data) {
	const url = `http://localhost:3000/posts/${id}`;
	const options = {
		method: "PATCH",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	};

	await fetch(url, options).then((response) => console.log(response.status));
}
