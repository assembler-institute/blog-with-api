import { getPostComments } from "../requests.js";

export async function insertPostComments(id) {
	const postCommentSection = document.querySelector("#post-comments-section").children[0];
	const comments = await getPostComments(id);

	comments.forEach((comment) => {
		const postCommentCard = createPostCommentCard(comment);
		postCommentSection.insertAdjacentHTML("beforeend", postCommentCard);
	});
}

export function clearPostComments() {
	document.querySelector("#post-comments-section").children[0].innerHTML = null;
}

function createPostCommentCard(comment) {
	const template = `
		<div data-component="post-comment">
			<article class="card shadow-sm mb-3" data-comment-id=${comment.id}>
				<div class="card-body p-3">
					<h6>${comment.name}</h6>
					<p class="fs-6 m-0">${comment.body}</p>
				</div>
				<div class="card-footer p-3">
					<p class="fs-7 text-black-50 text-end m-0">By <span class="fst-italic">${comment.email}</span></p>
				</div>
			</article>
		</div>
	`;

	return template;
}
