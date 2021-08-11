import { getPost, getUser, updatePost } from "../requests.js";
import { updatePostCard } from "./postCard.js";
import { insertPostComments } from "./postComment.js";

export function modalListener() {
	const modal = document.querySelector("#modal-content");

	modal.addEventListener("click", async function (event) {
		const target = event.target;

		if (target.matches("[data-action~='load-editor']") || target.matches("[data-action~='load-editor'] *")) {
			const id = sessionStorage.postId;
			clearModalContent();
			await updateModalContentEditor(id);
			return;
		}

		if (target.matches("[data-action~='load-post']") || target.matches("[data-action~='load-post'] *")) {
			const id = sessionStorage.postId;
			clearModalContent();
			await updateModalContentPost(id);
			await insertPostComments(id);
			return;
		}

		if (target.matches("[data-action~='save-post']") || target.matches("[data-action~='save-post'] *")) {
			const form = document.forms["post-editor-form"];

			const id = sessionStorage.postId;
			const data = {
				title: form.elements["title"].value,
				body: form.elements["content"].value,
			};

			await updatePost(id, data);
			updatePostCard(id, data);
		}
	});
}

export async function updateModalContentPost(id) {
	const modal = document.querySelector("#modal-content");
	const post = await getPost(id);
	const user = await getUser(post.userId);

	modal.insertAdjacentHTML("beforeend", loadModalContentPost(post, user));
	sessionStorage.postId = id;
}

export async function updateModalContentEditor(id) {
	const modal = document.querySelector("#modal-content");
	const post = await getPost(id);

	modal.insertAdjacentHTML("beforeend", loadModalContentEditor(post));
}

export function clearModalContent() {
	document.querySelector("#modal-content").innerHTML = null;
}

function loadModalContentPost(post, user) {
	const template = `
		<div class="modal-header bg-dark text-white">
			<h5 class="modal-title" id="modal-label">Blog Post</h5>
			<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<img class="modal-img-height" src="https://picsum.photos/400/600?random=${post.id}" alt="preview" />
		<div class="modal-body">
			<div class="d-flex justify-content-between gap-3 align-items-start">
				<h4 class="mb-3">${post.title}</h4>
				<button type="button" class="btn btn-sm btn-outline-dark" data-action="load-editor"><i class="bi bi-pen-fill"></i></button>
			</div>
			<p>${post.body}</p>
			<p class="card-body-author-height fs-7 text-black-50 text-end m-0"><span class="fw-bold">${user.name}</span>, <span class="fst-italic">${user.email}</span></p>
		</div>
		<div class="modal-footer">
			<div class="accordion w-100" id="post-comments-accordion">
				<div class="accordion-item">
					<h2 class="accordion-header" id="post-comments-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#post-comments-section" aria-expanded="true" aria-controls="post-comments-section">Load Comments</button>
					</h2>
					<div id="post-comments-section" class="accordion-collapse collapse" aria-labelledby="post-comments-header" data-bs-parent="#post-comments-accordion">
						<div class="accordion-body" style="overflow-y: scroll; max-height: 30rem"></div>
					</div>
				</div>
			</div>
		</div>
	`;

	return template;
}

function loadModalContentEditor(post) {
	const template = `
		<div class="modal-content">
			<div class="modal-header bg-dark text-white">
				<h5 class="modal-title" id="post-editor-modal-label"><i class="bi bi-pen-fill"></i> Edit Post</h5>
				<button type="button" class="btn-close btn-close-white" data-action="load-post" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form id="post-editor-form">
					<label for="input-title">Title</label>
					<div class="input-group mb-3">
						<span class="input-group-text">Title</span>
						<input type="text" name="title" class="form-control" placeholder="Insert a fancy title..." aria-label="title" minlength="8" value="${post.title}"/>
					</div>
					<label for="input-content">Content</label>
					<div class="input-group">
						<textarea name="content" class="form-control" fs-7 p-2" rows="5" aria-label="content">${post.body}</textarea>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-action="load-post">Close</button>
				<button type="button" class="btn btn-primary" data-action="save-post">Save changes</button>
			</div>
		</div>
	`;

	return template;
}
