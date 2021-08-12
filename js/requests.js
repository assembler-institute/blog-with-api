export async function getPostsByLimit(start, limit) {
	const url = `${sessionStorage.url}/posts?_start=${start}&_limit=${limit}`;
	const posts = await fetch(url).then((response) => response.json());

	return posts;
}

export async function getPost(id) {
	const url = `${sessionStorage.url}/posts/${id}`;
	const posts = await fetch(url).then((response) => response.json());

	return posts;
}

export async function getPostImage(id) {
	return await fetch(`https://picsum.photos/id/${id}/info`).then((response) => response.json());
}

export async function getPostComments(id) {
	const url = `${sessionStorage.url}/posts/${id}/comments`;
	const comments = await fetch(url).then((response) => response.json());

	return comments;
}

export async function getUser(id) {
	const url = `${sessionStorage.url}/users/${id}`;
	const user = await fetch(url).then((response) => response.json());

	return user;
}

export async function updatePost(id, data) {
	const url = `${sessionStorage.url}/posts/${id}`;
	const options = {
		method: "PATCH",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	};

	const response = await fetch(url, options);

	return response;
}

export async function deletePost(id) {
	const url = `${sessionStorage.url}/posts/${id}`;
	const options = {
		method: "DELETE",
	};

	const response = await fetch(url, options);

	return response;
}
