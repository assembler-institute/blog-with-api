import { insertPostCards } from "./postCard.js";
import { clearPostCards } from "./postCard.js";

const POST_CARDS_PER_PAGE = parseInt(sessionStorage.limit);

export function navigationListener() {
	document.querySelector("#navigation").addEventListener("click", function (event) {
		const navButtons = this.querySelectorAll(".page-link");
		const prevButton = navButtons[0];
		const nextButton = navButtons[2];

		if (event.target === prevButton) return goPrevPage(navButtons);
		if (event.target === nextButton) return goNextPage(navButtons);
	});
}

async function goNextPage(navButtons) {
	if (navButtons[2].disabled) return;

	sessionStorage.start = parseInt(sessionStorage.start) + POST_CARDS_PER_PAGE;

	clearPostCards();
	await insertPostCards();
	updatePrevPageButton(navButtons[0]);
	updateNextPageButton(navButtons[2]);
	updateCurrentPageIndex(navButtons[1], 1);
}

async function goPrevPage(navButtons) {
	if (navButtons[0].disabled) return;

	sessionStorage.start = parseInt(sessionStorage.start) - POST_CARDS_PER_PAGE;

	clearPostCards();
	await insertPostCards();
	updatePrevPageButton(navButtons[0]);
	updateNextPageButton(navButtons[2]);
	updateCurrentPageIndex(navButtons[1], -1);
}

function updateNextPageButton(nextButton) {
	const postCardNum = document.querySelectorAll("[data-component='post-card']").length;

	if (postCardNum < POST_CARDS_PER_PAGE) {
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
