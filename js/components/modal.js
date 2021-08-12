import { getPost, getUser, updatePost, deletePost } from "../requests.js";
import { insertPostCards, clearPostCards } from "./postCard.js";
import { insertPostComments } from "./postComment.js";

export function modalPostListener() {
	const modal = document.querySelector("#modal");

	modal.addEventListener("click", async function (event) {
		const target = event.target;
		const id = sessionStorage.postId;

		if (target.matches("[data-action~='load-editor']") || target.matches("[data-action~='load-editor'] *")) {
			await updateModalEditorContent(id);
		} else if (target.matches("[data-action~='load-post']") || target.matches("[data-action~='load-post'] *")) {
			await updateModalPostContent(id);
			await insertPostComments(id);
		} else if (target.matches("[data-action~='close-modal']") || target.matches("[data-action~='close-modal'] *")) {
			closeModal();
		} else if (target.matches("[data-action~='save-post']") || target.matches("[data-action~='save-post'] *")) {
			const form = document.forms["post-editor-form"];
			const response = await updatePost(id, {
				title: form.elements["post-title"].value,
				body: form.elements["post-content"].value,
			});

			if (response.ok) {
				clearPostCards();
				await insertPostCards();
			}
			displayEditPostMessage(response);
		} else if (target.matches("[data-action~='delete-post']") || target.matches("[data-action~='delete-post'] *")) {
			const response = await deletePost(id);

			if (response.ok) {
				clearPostCards();
				await insertPostCards();
			}

			displayRemovePostMessage(response);
		}
	});
}

function displayEditPostMessage(response) {
	const modal = document.querySelector("#modal");

	if (response.ok) {
		const message = modal.querySelector("#post-editor-ok");
		const messageBs = new bootstrap.Collapse(message);

		messageBs.show();
		setTimeout(() => messageBs.hide(), 4000);
	} else {
		const message = modal.querySelector("#post-editor-error");
		const messageBs = new bootstrap.Collapse(message);

		messageBs.show();
		setTimeout(() => messageBs.hide(), 4000);
	}
}

function displayRemovePostMessage(response) {
	const modal = document.querySelector("#modal");

	if (response.ok) {
		const message = modal.querySelector("#post-delete-ok");
		const messageBs = new bootstrap.Collapse(message);
		const buttons = modal.querySelector("#modal-delete .modal-footer");
		const buttonsBs = new bootstrap.Collapse(buttons);

		messageBs.show();
		buttonsBs.hide();

		setTimeout(() => {
			messageBs.hide();
			buttonsBs.show();

			closeModal();
		}, 4000);
	} else {
		const message = modal.querySelector("#post-delete-error");
		const messageBs = new bootstrap.Collapse(message);

		messageBs.show();
		setTimeout(() => messageBs.hide(), 4000);
	}
}

function closeModal() {
	const modal = document.querySelector("#modal");
	const modalBs = bootstrap.Modal.getInstance(modal);

	modalBs.hide();

	const postSectionBs = new bootstrap.Collapse(modal.querySelector("#modal-post"), { toggle: false });
	const editSectionBs = new bootstrap.Collapse(modal.querySelector("#modal-editor"), { toggle: false });
	const deleteSectionBs = new bootstrap.Collapse(modal.querySelector("#modal-delete"), { toggle: false });

	postSectionBs.show();
	editSectionBs.hide();
	deleteSectionBs.hide();
}

export async function updateModalPostContent(id) {
	const modal = document.querySelector("#modal-post");
	const post = await getPost(id);
	const user = await getUser(post.userId);

	modal.querySelector("#post-image").src = `https://picsum.photos/400/600?random=${post.id}`;
	modal.querySelector("#post-title").textContent = post.title;
	modal.querySelector("#post-content").textContent = post.body;
	modal.querySelector("#user-name").textContent = user.name;
	modal.querySelector("#user-email").textContent = user.email;

	sessionStorage.postId = id;
}

export async function updateModalEditorContent(id) {
	const post = await getPost(id);
	const form = document.forms["post-editor-form"];

	form.elements["post-title"].value = post.title;
	form.elements["post-content"].textContent = post.body;
}
