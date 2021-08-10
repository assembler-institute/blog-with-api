import getPostsByLimit from "../requests/getPostsByLimit.js";

export async function insertPostCards(start, limit) {
	const grid = document.querySelector("#post-card-grid");
	const posts = await getPostsByLimit(start, limit);

	posts.forEach((post) => {
		const postCard = createPostCard(post);
		grid.insertAdjacentHTML("beforeend", postCard);
	});
}

export function clearPostCards() {
	document.querySelector("#post-card-grid").innerHTML = null;
}

function createPostCard(post) {
	const template = `
		<div data-component="post-card" class="col-12 col-sm-6 col-lg-4 p-3 d-flex justify-content-center">
			<article class="card w-100 shadow-sm" data-post-id=${post.id} data-post-user=${post.userId}>
				<img class="card-img-top card-img-height" src="https://picsum.photos/400/600?random=${post.id}" alt="preview" />
				<div class="card-body p-3">
					<h6 class="fs-5">${post.title}</h6>
					<p class="card-body-paragraph-height fs-6 m-0">${post.body}</p>
				</div>
				<div class="card-footer p-3">
					<p class="card-body-author-height fs-7 text-black-50 text-end m-0">Author: <span class="fw-bold">Name</span>, <span class="fst-italic">Mail</span></p>
				</div>
			</article>
		</div>
	`;

	return template;
}
