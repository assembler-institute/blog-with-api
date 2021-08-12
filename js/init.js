import { insertPostCards } from "./components/postCard.js";

document.addEventListener("DOMContentLoaded", async function () {
	sessionStorage.start = 0;
	sessionStorage.limit = 12;
	sessionStorage.url = "http://localhost:3000";

	await insertPostCards();
});
