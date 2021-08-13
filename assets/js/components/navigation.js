import { insertPostCards } from "./postCard.js";
import { clearPostCards } from "./postCard.js";

export function navigationListener() {
	document.querySelector("#navigation").addEventListener("click", async function (event) {
		const navButtons = this.querySelectorAll(".page-link");
		const prevButton = navButtons[0];
		const nextButton = navButtons[2];

		if (event.target === prevButton) {
			await goPrevPage(navButtons);
		} else if (event.target === nextButton) {
			await goNextPage(navButtons);
		}
	});
}

async function goNextPage(navButtons) {
	if (navButtons[2].disabled) return;

	sessionStorage.start = parseInt(sessionStorage.start) + parseInt(sessionStorage.limit);

	clearPostCards();
	const posts = await insertPostCards();
	updatePrevPageButton(navButtons[0]);
	updateNextPageButton(navButtons[2], posts);
	updateCurrentPageIndex(navButtons[1], 1);
}

async function goPrevPage(navButtons) {
	if (navButtons[0].disabled) return;

	sessionStorage.start = parseInt(sessionStorage.start) - parseInt(sessionStorage.limit);

	clearPostCards();
	const posts = await insertPostCards();
	updatePrevPageButton(navButtons[0]);
	updateNextPageButton(navButtons[2], posts);
	updateCurrentPageIndex(navButtons[1], -1);
}

function updateNextPageButton(nextButton, posts) {
	if (posts.length < parseInt(sessionStorage.limit)) {
		nextButton.parentElement.classList.add("disabled");
		nextButton.disabled = true;
	} else {
		nextButton.parentElement.classList.remove("disabled");
		nextButton.disabled = false;
	}
}

function updatePrevPageButton(prevButton) {
	if (sessionStorage.start == 0) {
		prevButton.parentElement.classList.add("disabled");
		prevButton.disabled = true;
	} else {
		prevButton.parentElement.classList.remove("disabled");
		prevButton.disabled = false;
	}
}

function updateCurrentPageIndex(pageButton, num) {
	pageButton.textContent = parseInt(pageButton.textContent) + num;
}
