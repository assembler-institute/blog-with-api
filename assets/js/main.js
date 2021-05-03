const MY_JSON_SERVER_URL = "http://localhost:3000/";
const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/";
const DATA_SOURCE_URL = MY_JSON_SERVER_URL;

function addSpinner(element) {
  element.append(
    $("<span>", { class: "spinner-border spinner-border-sm ml-2" })
  );
}

function removeSpinner(element) {
  element.find("span.spinner-border")?.remove();
}

function showItems(items) {
  items.forEach((item) => {
    item.removeClass("d-none").addClass("d-flex");
  });
}

function hideItems(items) {
  items.forEach((item) => {
    item.addClass("d-none").removeClass("d-flex");
  });
}

function deletePost(actionData) {
  let confirmBtn = $("#confirmBtn");
  confirmBtn.removeClass("enabled").addClass("disabled");
  addSpinner(confirmBtn);
  let postId = actionData.postId;
  let deletingPost = $(`.postPreview[data-post-id=${postId}]`).parent();
  $.ajax({
    type: "DELETE",
    url: DATA_SOURCE_URL + `posts/${postId}`,
    success: () => {
      removeSpinner(confirmBtn);
      confirmBtn.removeClass("disabled").addClass("enabled");
      deletingPost.remove();
      $("#confirmModal").modal("hide");
    },
  });
}

function savePostChanges(actionData) {
  let saveChangesBtn = $("#saveEditBtn");
  saveChangesBtn.removeClass("enabled").addClass("disabled");
  addSpinner(saveChangesBtn);
  let postId = actionData.postId;
  let postTitle = actionData.postTitle;
  let postBody = actionData.postBody;
  let modifyingPost = $(`.postPreview[data-post-id=${postId}]`);
  $.ajax({
    type: "PATCH",
    url: DATA_SOURCE_URL + `posts/${postId}`,
    data: {
      title: postTitle,
      body: postBody,
    },
    success: () => {
      modifyingPost.children().first().text(postTitle);
      modifyingPost.children().last().text(postBody);
      $("#confirmModal").modal("hide");
      $("#postDetailsModal").modal("hide");
    },
  });
}

function confirmAction(trigger) {
  let requestedAction = JSON.parse(trigger.dataset.action);
  const actions = {
    editPost: savePostChanges,
    deletePost: deletePost,
  };
  if (
    requestedAction.action &&
    actions.hasOwnProperty(requestedAction.action)
  ) {
    actions[requestedAction.action](requestedAction.actionData);
  }
}

function confirmDeletePost(trigger) {
  let postId = trigger.dataset.postId;
  let requestedAction = {
    action: "deletePost",
    actionData: {
      postId: postId,
    },
  };
  $("#confirmModal")
    .find("#confirmBtn")
    .attr("data-action", JSON.stringify(requestedAction));
  $("#confirmMsg").text("Are you sure you want to delete the post?");
  $("#confirmModal").modal();
}

function confirmSaveChanges(trigger) {
  let triggerElement = $(`#${trigger.id}`);
  let postId = triggerElement.data("postId");
  let postModal = $("#postDetailsModal");
  let postTitle = postModal.find("#postModalTitle").text();
  let postBody = postModal.find("#postBody").text();
  let requestedAction = {
    action: "editPost",
    actionData: {
      postId: postId,
      postTitle: postTitle,
      postBody: postBody,
    },
  };
  $("#confirmModal")
    .find("#confirmBtn")
    .attr("data-action", JSON.stringify(requestedAction));
  $("#confirmMsg").text(
    "Are you sure you want to save the changes to the post?"
  );
  $("#confirmModal").modal();
}

function resetEditPanel(trigger) {
  let triggerElement = $(`#${trigger.id}`);
  let originalTitle = triggerElement.data("originalTitle");
  let originalBody = triggerElement.data("originalBody");
  let modal = $("#postDetailsModal");
  modal.find("#postModalTitle").text(originalTitle);
  modal.find("#postBody").text(originalBody);
}

function setEditButtons() {
  hideItems([$(".detailBtns")]);
  showItems([$(".editBtns")]);
}

function openPostEdit(trigger) {
  let postData = trigger.parent().parent().children().first();
  let postId = postData.data("postId");
  let postTitle = postData.children().first().text();
  let postBody = postData.children().last().text();
  let modal = $("#postDetailsModal");
  modal
    .find("#resetEditBtn")
    .attr("data-original-title", postTitle)
    .attr("data-original-body", postBody);
  modal.find("#postModalTitle").text(postTitle);
  modal.find("#postBody").text(postBody);
  hideItems([$("#postedByLabel"), $("#postUser")]);
  modal.find("#saveEditBtn").attr("data-post-id", postId);
  $("#postModalTitle, #postBody").attr("contenteditable", "true");
  setEditButtons(postId);
}

function loadPostComments(loading) {
  let postId = loading.dataset.postId;
  if (postId) {
    addSpinner($("#commentsBtn"));
    $("#commentsBtn").removeClass("enabled").addClass("disabled");
    $.get(DATA_SOURCE_URL + `comments?postId=${postId}`, (res) => {
      $("#commentsBtn").addClass("d-none");
      $("#commentsLabel").removeClass("invisible").addClass("visible");
      if (res.length) {
        let ulComments = $("<ul>", { class: "p-0 commentsCard" });
        $("#postDetailsModal .detailBtns").append(ulComments);
        $.each(res, (index, comment) => {
          let liComment = $("<li>", { class: "list-group-item " });
          let name = $("<p>", {
            class: "font-weight-bold",
            text: comment.name,
          });
          let body = $("<p>", { text: comment.body });
          let email = $("<p>", { text: comment.email });
          liComment.append([name, body, email]);
          ulComments.append(liComment);
        });
      } else {
        $("#showModal .detailBtns").append(
          $("<p>", { text: "There is no comments" })
        );
      }
    });
  }
}

function getUserById(userId) {
  addSpinner($("#postedByLabel"));
  return $.get(
    DATA_SOURCE_URL + `users/${userId}`,
    removeSpinner($("#postedByLabel"))
  );
}

function setDetailsButtons() {
  hideItems([$(".editBtns")]);
  showItems([$(".detailBtns")]);
}

function showPostDetails(trigger) {
  let userId = trigger.data("userId");
  let postId = trigger.data("postId");
  let postTitle = trigger.children().first().text();
  let postBody = trigger.children().last().text();
  let modal = $("#postDetailsModal");
  modal.find("#postModalTitle").text(postTitle);
  modal.find("#postBody").text(postBody);
  showItems([$("#postedByLabel"), $("#postUser")]);
  getUserById(userId).then((user) => {
    $("#postUser").text(`${user.username} (${user.email})`);
  });
  modal.find("#commentsBtn").attr("data-post-id", postId);
  $("#postModalTitle, #postBody").attr("contenteditable", "false");
  setDetailsButtons(postId);
}

function openModal(event) {
  const actions = {
    details: showPostDetails,
    edit: openPostEdit,
  };
  let triggerElement = $(event.relatedTarget);
  let accessType = triggerElement.data("accessType");
  if (accessType && actions.hasOwnProperty(accessType)) {
    actions[accessType](triggerElement);
  }
}

function buildPostsList(posts) {
  $.each(posts, (index, post) => {
    let ul = $(".container-sm > ul");
    let li = $(
      `<li class="list-group-item d-flex justify-content-between align-items-start list-group-item-action"></li>`
    );

    let postPreview = $(`<div>`, {
      class: "ms-2 me-auto px-2 postPreview",
      "data-toggle": "modal",
      "data-target": "#postDetailsModal",
      "data-access-type": "details",
      "data-post-id": `${post.id}`,
      "data-user-id": `${post.userId}`,
    });
    let postTitle = $("<div>", {
      class: "font-weight-bold postTitle",
      text: post.title,
    });
    let postBody = $("<div>", {
      class: "font-weight-light postBody",
      text: post.body,
    });
    postPreview.append([postTitle, postBody]);

    let postActionsPanel = $("<div>", {
      class: "d-flex justify-content-end post-actions-panel m-10",
    });
    let editBtn = $("<button>", {
      type: "button",
      class: "btn btn-outline-primary shadow-none ml-1",
      "data-toggle": "modal",
      "data-target": "#postDetailsModal",
      "data-access-type": "edit",
    });
    let editIcon = $("<i>", { class: "bi bi-pencil-square" });
    editBtn.append(editIcon);
    let deleteBtn = $("<button>", {
      type: "button",
      class: "btn btn-outline-danger shadow-none ml-1",
      onclick: "confirmDeletePost(this)",
      "data-post-id": `${post.id}`,
    });
    let delIcon = $("<i>", { class: "bi bi-trash" });
    deleteBtn.append(delIcon);
    postActionsPanel.append([editBtn, deleteBtn]);

    li.append([postPreview, postActionsPanel]);
    ul.append(li);
  });
}

function resetPostModal() {
  let modal = $(this);
  modal.find("#postModalTitle").empty();
  modal.find("#postBody").empty();
  modal.find("#postUser").empty();
  commentsBtn = $("#commentsBtn");
  commentsBtn.parent().find("ul").remove();
  removeSpinner($("#commentsBtn"));
  commentsBtn.removeClass("d-none disabled").addClass("enabled");
  modal.find("#commentsLabel").removeClass("visible").addClass("invisible");
}

(function init() {
  $.ajax({
    type: "GET",
    url: DATA_SOURCE_URL + "posts",
    success: function (data) {
      buildPostsList(data);
    },
    error: function () {
      alert("Error!!");
    },
  });
  $("#postDetailsModal").on("show.bs.modal", openModal);
  $("#postDetailsModal").on("hidden.bs.modal", resetPostModal);
})();
