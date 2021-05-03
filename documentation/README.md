The data of this site is being requested from a Free fake API called {JSON} Placeholder

In order to work with all kinds of requests implemented on the site (such as GET, PATCH and DELETE). I've used a local server and load all the data into the file "./data/db.json"

The URL for the request on "./assets/js/main.js" is the one pointing to the local server on port 3000 --> "http://localhost:3000/"

You could change it for "https://jsonplaceholder.typicode.com/" in order to work with the original API or start a local server on port 3000. This way you can watch what happen when you edit or delete a post of the blog.

To create this fake REST API I've used the json-server opensource tool.

You can get it here --> "https://github.com/typicode/json-server"
