export async function getPostsByLimit(start, limit) {
	const url = `${sessionStorage.url}/posts?_start=${start}&_limit=${limit}`;
	const response = await fetch(url);
	const posts = await response.json();

	return posts;
}

export async function getPost(id) {
	const url = `${sessionStorage.url}/posts/${id}`;
	const response = await fetch(url);
	const post = await response.json();

	return post;
}

export async function getPostImage(id) {
	return await fetch(`https://picsum.photos/id/${id}/info`).then((response) => response.json());
}

export async function getPostComments(id) {
	const url = `${sessionStorage.url}/posts/${id}/comments`;
	const response = await fetch(url);
	const comments = await response.json();

	return comments;
}

export async function getUser(id) {
	const url = `${sessionStorage.url}/users/${id}`;
	const response = await fetch(url);
	const user = await response.json();

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
