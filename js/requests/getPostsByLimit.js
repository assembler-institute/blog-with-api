export default async function getPostsByLimit(start, end) {
	const url = `http://localhost:3000/posts?_start=${start}&_end=${end}`;
	const posts = await fetch(url).then((response) => response.json());

	return posts;
}
