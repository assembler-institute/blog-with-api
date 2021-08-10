    /* fetch("https://jsonplaceholder.typicode.com/users")
                                                                                .then(response => response.json())

                                                                                .then(data => {
                                                                                data.forEach(post => {
                                                                                console.log(post.id)
                                                                                console.log(post.username)
                                                                                console.log(post.email)
                                                                                });
                                                                                }) */
    /* recievedData.forEach(element => {
                    console.log(element)
                }); */


    document.querySelector("#prueba").addEventListener("click", objects)


    function objects(e) {
        console.log(e.target.id)
        for (let i = 0; i < recievedData.length; i++) {
            const element = recievedData[i];
            document.querySelector("#modalTitle").textContent = element.title;
            document.querySelector("#modalBody").textContent = element.body;

            /* document.querySelector("#modal-container").innerHTML = `<!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                ${body}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>` */
        }
    }