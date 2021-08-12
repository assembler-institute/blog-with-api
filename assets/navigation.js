//---------------------------------NAV BAR -------------------------------------------//

navbar.addEventListener("click", (event) => {
    if (event.target.matches("button")) {
        switch (event.target.id) {
            case "page-1":
                blogGrid.innerHTML = "";
                h = 0;
                j = 9;
                createBlogs();
                document.getElementById("prev-li").classList.add("disabled");
                document.getElementById("next-li").classList.remove("disabled");

                break;

            case "page-2":
                blogGrid.innerHTML = "";
                h = 9;
                j = 18;
                createBlogs();

                document.getElementById("prev-li").classList.remove("disabled");
                document.getElementById("next-li").classList.remove("disabled");

                break;

            case "page-3":
                blogGrid.innerHTML = "";
                h = 18;
                j = 27;
                createBlogs();
                document.getElementById("prev-li").classList.remove("disabled");
                document.getElementById("next-li").classList.remove("disabled");

                break;

            case "page-previous":
                blogGrid.innerHTML = "";
                h -= 9;
                j -= 9;
                createBlogs();

                document.getElementById("next-li").classList.remove("disabled");

                if (h === 0) {
                    document.getElementById("prev-li").classList.add("disabled");
                }

                //---------------Remove the Number Tiles--------------//

                if (document.getElementById("new-tile") !== null) {
                    document.getElementById("new-tile").remove();
                }
                if ((h + 9) / 9 > 3) {
                    let newTile = `<li class="page-item" id = "new-tile">
                    <button class="page-link" id="page-${(h + 9) / 9}">....  ${
            (h + 9) / 9
          }</button>
                  </li>`;
                    document
                        .getElementById("next-li")
                        .insertAdjacentHTML("beforebegin", newTile);
                }

                break;

            case "page-next":
                document.getElementById("prev-li").classList.remove("disabled");

                blogGrid.innerHTML = "";
                h += 9;
                j += 9;

                if (j > retrieveData.length) {
                    j = retrieveData.length;
                }

                createBlogs();

                if (j > retrieveData.length - 3) {
                    document.getElementById("next-li").classList.add("disabled");
                }

                if (j > 27) {
                    if (document.getElementById("new-tile") !== null) {
                        document.getElementById("new-tile").remove();
                    }
                    let newTile = `<li class="page-item" id = "new-tile">
                    <button class="page-link" id="page-${(h + 9) / 9}">....  ${
            (h + 9) / 9
          }</button>
                  </li>`;
                    document
                        .getElementById("next-li")
                        .insertAdjacentHTML("beforebegin", newTile);
                }

                break;
            default:
                break;
        }
    }
});

//--------------------END NAV BAR-----------------------//