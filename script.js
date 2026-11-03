
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    document.getElementById("message").innerText = data.message;
}

async function fetchUsers() {
    const response = await fetch("/users");
    const users = await response.json();

    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");
        li.innerText = user.username;
        list.appendChild(li);
    });
}
