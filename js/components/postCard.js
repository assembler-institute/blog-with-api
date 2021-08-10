import searchParentTarget from "../utils/searchParentTarget.js";
import { getPostsByLimit } from "../requests.js";
import { clearPostComments, insertPostComments } from "./postComment.js";
import { updatePostModalContent } from "./postModal.js";

export function postCardListener() {
	document.addEventListener("click", function (event) {
		const target = searchParentTarget(event.target, (element) => element.matches("[data-component='post-card']"));
		console.log(target);

		if (target) {
			updatePostModalContent(target.dataset.postId);
			clearPostComments();
			insertPostComments(target.dataset.postId);
		}
	});
}

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

function createPostCard(post, user) {
	const template = `
		<div class="col-12 col-sm-6 col-lg-4 p-3 d-flex justify-content-center">
			<article data-component="post-card" class="card w-100 shadow-sm" data-post-id=${post.id} data-bs-toggle="modal" data-bs-target="#post-modal">
				<img class="card-img-top card-img-height" src="https://picsum.photos/400/600?random=${post.id}" alt="preview" />
				<div class="card-body p-3">
					<h6 class="fs-5">${post.title}</h6>
					<p class="card-body-paragraph-height fs-6 m-0">${post.body}</p>
				</div>
				<div class="card-footer p-3">
					<p class="card-body-author-height fs-7 text-black-50 text-end m-0">Author: <span class="fw-bold">${user?.name}</span>, <span class="fst-italic">${user?.email}</span></p>
				</div>
			</article>
		</div>
	`;

	return template;
}
