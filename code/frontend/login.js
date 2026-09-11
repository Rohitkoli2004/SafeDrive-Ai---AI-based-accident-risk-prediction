//-----------------Login----------------
if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "home.html";
}

// AUTO REDIRECT
if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "home.html";
}

function goSignup() {
    window.location.href = "signup.html";
}

async function login() {

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: user, password: pass})
    });

    let data = await res.json();

    if (data.status === "success") {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", user); 
    window.location.href = "home.html";
    } else {
        document.getElementById("msg").innerText = "Invalid credentials";
    }
}

//----------Anounce-------------
let msg = document.getElementById("msg");

if (data.status === "success") {
    msg.innerText = "Login successful";
    msg.className = "success";

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
} else {
    msg.innerText = "Invalid credentials";
    msg.className = "error";
}