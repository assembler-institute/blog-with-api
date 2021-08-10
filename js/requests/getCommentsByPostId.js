export default async function getCommentsByPostId(id) {
	const url = `http://localhost:3000/posts/${id}/comments`;
	const comments = await fetch(url).then((response) => response.json());

	return comments;
}
