export let modalHTML = `<div class="modal fade" id="modal-edit" tabindex="-1" aria-labelledby="modalEdit" style="display: none;" aria-hidden="true">
<div class="modal-dialog modal-fullscreen">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title h4" id="modalEdit">Post</h5>
      <button type="button" class="btn-close modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    
      <form id="form-edit-post">
        
        <div class="mb-3">
          <label for="postTitle" class="form-label">Post title</label>
          <input type="text" class="form-control" id="postTitle" name="title">
        </div>
        <div class="mb-3">
          <label for="postBody" class="form-label">Post content</label>
          <textarea class="form-control" id="postBody" name="body"></textarea>
        </div>

        <div class="mb-3">
          <label for="postDate" class="form-label">Publish Date</label>
          <input type="date" class="form-control" id="postDate" name="postDate">
        </div>

        <div class="d-flex justify-content-between">
          <button id="delete-post" type="button" class="btn btn-danger">Delete</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary modal-close" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>
`
export const initModal = () => {
  Modal = new bootstrap.Modal(document.getElementById('modal-edit'), {
    keyboard: true,
    backdrop: false,
    focus: true
  })

  return Modal
}

export let Modal;