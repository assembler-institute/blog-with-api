/* ***************************
 * **** GLOBAL VARIABLES  ****
 * ***************************/

//funcion anonima autoejecutable inicial para captar los POSTS
//APIs recogidos con funcion creada en base a PROMESAS
(() => {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=20")
    .then((res) => {
      //el fetch tiene este metodo JSON() para convertir la respuesta API en un objeto jason. Porque si no, lo que nos devuelve es un texto. Ponemos return para que el siguiente .then, pueda seguir trabajando con él
      // Con el fetch, necesitamos validar el  OK de la respuesta, ya que nos dará un false si las cosas van mal y así lo enviamos al .catch()
      if (res.ok == true) {
        return res.json();
      } else {
        // Usamos el metodo Promise() porque el fetch es un objeto Promesa y gracias a esto y el reject, lo podemos enviar al .catch()
        return Promise.reject(res);
      }
      //return res.ok ? res.json(): Promise.reject(res);
      //return res.text();
    })
    .then((res2) => {
      //console.log(res2);
      //el JSON() nos devuelve el resultado convertido y lo mete de forma automatica en la siguiente variable dentro del .then
      //console.log(res2);
      let mainBody = $("#mainContainer");
      res2.forEach((post) => {
        let postCount = $(
          `<article class="row article mb-2" article-user-id = "article-user-${post.userId}" id=article-post-${post.id}>`
        );
        postCount.append(`
					<div class="col-11">
						<h6 class="col-12" id="main-article-title-${post.id}"> ${post.title}</h6>
						<p class="col-12" id="main-article-body-${post.id}">${post.body}</p>
					</div>
				`);
        postCount.append(`
					<div class="col-1 d-flex flex-column flex-md-row align-items-start">
						<i class="fas fa-address-book p-1 d-flex justify-content-center" id="btn-${post.id}" userid = "user-${post.userId}" postid= post-${post.id} style="cursor:pointer;"></i>
            <i class="fas fa-dumpster p-1 d-flex justify-content-center" style="cursor:pointer;" id="btn-trash-${post.id}"></i>
					</div>
          <hr>`);
        mainBody.append(postCount);

        let btnUser = $(`#btn-${post.id}`);
        let btnTrash = $(`#btn-trash-${post.id}`);
        btnUser.on("click", showModal);
        btnTrash.on("click", deletePost);
      });
    })
    .catch((error) => {
      console.log("estoy en el Catch:", error);
      let mainTitle = $("#h4-main-title");
      //let message = error.statusTe
      mainTitle[0].innerHTML = `Error: ${error.status}`;
    })
    .finally(() => {
      // console.log(
      //   "Esto se ejecutara independientemente del resultado del Fetch"
      // );
    });
})();

// Open the modal if the user clicks on the button to open it
function showModal() {
  // Capturing the IDs of the posts clicked
  let btnTrigger = event.target;
  let userId = btnTrigger.getAttribute("userid").substr(5, 1);
  let postId = btnTrigger.getAttribute("postid").substr(5, 2);
  // Capturing the text inside
  let titleTrigered = $(`#article-post-${postId} h6`);
  let bodyTrigered = $(`#article-post-${postId} p`);

  let defaultTex = $("#bodyInput");
  let defaultTitle = $("#titleInput");
  let canvasCloseBtn = $("#canvasCloseBtn");
  defaultTex[0].value = bodyTrigered[0].innerHTML;
  defaultTitle[0].value = titleTrigered[0].innerHTML;
  canvasCloseBtn.on("click", newDataPost);

  //console.log(btnTrigger);

  // funcion anonima autoejecutable inicial para captar los USERS
  // APIs recogidos con fucnion asincrona TRY CATCH
  (async function getUsersData() {
    try {
      let res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        ),
        // El await obliga a la anterior sentencia a recibir respuesta, a esperar y hasta que no esté bien, no pasa a la siguiente sentecia, para convertirlo en JSON()
        usersObj = await res.json();
      if (!res.ok) throw { status: res.status, statusText: status.text };

      //console.log(usersObj);

      let myAside = $("#aside");
      //const templateContent = $("#templateModal").content;
      const templateContent = document.getElementById("templateModal").content;
      let templateClone = document.importNode(templateContent, true);
      myAside.append(templateClone);

      let postTitle = $("#modalTitle");
      let postBody = $("#modalBody");
      let postUser = $("#userNameModal");
      let postMail = $("#userMailModal");

      postTitle.html(`${titleTrigered[0].innerHTML}`);
      postBody.html(`${bodyTrigered[0].innerHTML}`);
      postUser.html(`${usersObj.name}`);
      postMail.html(`${usersObj.email}`);

      // Closing the Modal if the user clicks on X or the Btn
      let editBtn = $("#editBtn");
      let btnCloseModal = $("#btn-close-modal");
      let btnCloseModal2 = $("#btnClose");
      btnCloseModal.on("click", closeModal);
      btnCloseModal2.on("click", closeModal);
      editBtn.on("click", getDataPost);

      btnCloseModal.attr("postid", `${postId}`);

      //Otra funccion anonima autoejecutable
      (async function getCommentsData() {
        try {
          let res = await fetch(
              `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
            ),
            commentsObj = await res.json();
          if (!res.ok) throw { status: res.status, statusText: status.text };
          //console.log(commentsObj);

          let bodyMainModal = $("#divComments");
          let x = 1;
          let myArray = [
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
          ];

          commentsObj.forEach((element) => {
            let myDiv = $(`<div class="accordion-item">`);
            myDiv.append(`
              <h2 class="accordion-header position-relative">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${
                  myArray[x - 1]
                }" aria-expanded="true">
                  ${commentsObj[x - 1].name}
                  <i id ="commentBtn-${
                    commentsObj[x - 1].id
                  }" class="far fa-edit text-danger ps-2" style="cursor: pointer; z-index:4000;"></i>
                </button>
              </h2>
              <div id="collapse${
                myArray[x - 1]
              }" class="accordion-collapse collapse show" aria-labelledby="heading${
              myArray[x - 1]
            }" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <strong>${commentsObj[x - 1].email}</strong><br>
                  ${commentsObj[x - 1].name}
                </div>
              </div>
            `);
            bodyMainModal.append(myDiv);
            let commentsBtn = $(`#commentBtn-${commentsObj[x - 1].id}`);
            commentsBtn.on("click", deleteComment);
            x++;
          });
        } catch {
        } finally {
        }
      })();

      let myModal = $("#asideModal");
      myModal.css("display", "inline-block");
    } catch (err) {
      let message = err.statusText || "Ocurrió un error";
    } finally {
    }
  })();
}

function getDataPost() {
  let btnTrigger = event.target;

  console.log(btnTrigger);
}

function deleteComment() {
  let btnTrigger = event.target;
  let parentBtn = btnTrigger.parentNode;
  let divParent = parentBtn.parentNode;
  let h2Parent = divParent.parentNode;
  h2Parent.remove(this);
}

function newDataPost() {
  let modalTitle = $("#modalTitle");
  let modalBody = $("#modalBody");

  let defaultTex = $("#bodyInput");
  let defaultTitle = $("#titleInput");

  modalTitle[0].innerHTML = defaultTitle[0].value;
  modalBody[0].innerHTML = defaultTex[0].value;
}

function deletePost() {
  // Capturing the IDs of the posts clicked
  let btnTrigger = event.target.id;
  let postId = btnTrigger.substr(10, 2);
  let postToDelete = $(`#article-post-${postId}`);
  postToDelete.remove();
}

function closeModal() {
  let myModal = $("#asideModal");
  let modalTitle = $("#modalTitle");
  let modalBody = $("#modalBody");
  let closeBtnId = $("#btn-close-modal").attr("postid");
  let changeTitle = $(`#main-article-title-${closeBtnId}`);
  let changeBody = $(`#main-article-body-${closeBtnId}`);

  changeTitle[0].innerHTML = modalTitle[0].innerHTML;
  changeBody[0].innerHTML = modalBody[0].innerHTML;

  myModal.css("display", "none");
  myModal.remove();
}
