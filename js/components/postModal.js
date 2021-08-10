import { getPost, getUser } from "../requests.js";

export async function updatePostModalContent(id) {
	const postModal = document.querySelector("#post-modal");
	const post = await getPost(id);
	const user = await getUser(post.userId);

	postModal.querySelector("img").src = `https://picsum.photos/400/600?random=${id}`;
	postModal.querySelector("#post-modal-title").textContent = post.title;
	postModal.querySelector("#post-modal-body").textContent = post.body;
	postModal.querySelector("#post-modal-user").children[0].textContent = user.name;
	postModal.querySelector("#post-modal-user").children[1].textContent = user.email;
}
