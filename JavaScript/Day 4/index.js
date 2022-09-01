import fetch from "node-fetch";

fetch("https://jsonplaceholder.typicode.com/users")
.then((res) => {
    return res.json()
}).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})