import { deletePost } from "./delete_post.js"
import { modalEdit } from "./edit_post.js"
import { showSummary } from "./show_summary.js"


document.addEventListener("click", (event) => {
    if (event.target.matches('[data-bs-target="#summary-modal"]')) {
        showSummary(event)
    } else if (event.target.matches('[data-delete]')) {
        deletePost(event)
    } else if (event.target.matches('[data-id]')) {
        modalEdit(event)
    }
})