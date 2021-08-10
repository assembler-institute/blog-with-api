export default async function getPostsByLimit(start, limit) {
	const url = `http://localhost:3000/posts?_start=${start}&_limit=${limit}`;
	const posts = await fetch(url).then((response) => response.json());

	return posts;
}
