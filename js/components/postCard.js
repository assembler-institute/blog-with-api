import searchParentTarget from "../utils/searchParentTarget.js";
import { getPostsByLimit, getUser } from "../requests.js";
import { insertPostComments } from "./postComment.js";
import { updateModalPostContent } from "./modal.js";

export function postCardListener() {
	document.addEventListener("click", async function (event) {
		const target = searchParentTarget(event.target, (element) => element.matches("[data-component='post-card']"));

		if (target) {
			sessionStorage.postId = target.dataset.postId;
			const id = sessionStorage.postId;

			await updateModalPostContent(id);
			await insertPostComments(id);
		}
	});
}

export async function insertPostCards() {
	const grid = document.querySelector("#post-card-grid");
	const start = sessionStorage.start;
	const limit = sessionStorage.limit;

	const posts = await getPostsByLimit(start, limit);

	posts.forEach(async (post) => {
		const user = await getUser(post.userId);
		const postCard = createPostCard(post, user);
		grid.insertAdjacentHTML("beforeend", postCard);
	});

	return posts;
}

export function clearPostCards() {
	document.querySelector("#post-card-grid").innerHTML = null;
}

function createPostCard(post, user) {
	const template = `
		<div class="col-12 col-sm-6 col-lg-4 p-3 d-flex justify-content-center">
			<article data-component="post-card" class="card w-100 shadow-sm" data-post-id=${post.id} data-bs-toggle="modal" data-bs-target="#modal">
				<img class="card-img-top card-img-height" src="https://picsum.photos/400/600?random=${post.id}" alt="preview" />
				<div class="card-body p-3">
					<h6 class="fs-5">${post.title}</h6>
					<p class="card-body-paragraph-height fs-6 m-0">${post.body}</p>
				</div>
				<div class="card-footer p-3">
					<p class=" fs-7 text-black-50 text-end m-0">Author: <span class="fw-bold">${user.name}</span>, <span class="fst-italic">${user.email}</span></p>
				</div>
			</article>
		</div>
	`;

	return template;
}
