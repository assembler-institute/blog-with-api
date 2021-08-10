import { insertPostCards } from "./components/postCard.js";

export default function init() {
	document.addEventListener("DOMContentLoaded", async function () {
		sessionStorage.start = 0;
		sessionStorage.limit = 12;

		await insertPostCards(sessionStorage.start, sessionStorage.limit);
	});
}
