//modal display in the main content
function openPost() {
  const modalOpen = new bootstrap.Modal(document.getElementById("modal"));
  modalOpen.show();
  console.log(modalOpen);
}
export { openPost };
