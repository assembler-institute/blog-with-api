$.get("https://jsonplaceholder.typicode.com/posts", function (data) {
  //console.log(JSON.stringify(data, null, 2));
  //alert("Load was performed.");
  console.log(data);
  for (post of data) {
    appendNewPostCard("postsWrapper", "postCardTemplate");
    displayAPIPostFields(
      document.querySelector("#postsWrapper").lastElementChild,
      post
    );
  }
});

function appendNewPostCard(containerId, templateId) {
  const templateContent = document.querySelector(`#${templateId}`).content;
  return document
    .getElementById(containerId)
    .appendChild(document.importNode(templateContent, true));
}

function displayAPIPostFields(postCard, postData) {
  postCard.querySelector("p").innerText = postData.body;
  postCard.querySelector("h3").innerText = postData.title;
}
