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

//Login
async function login() {

    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();
    let msg = document.getElementById("msg");
    let btn = document.querySelector("button");

    // 🔴 VALIDATION
    if (!user || !pass) {
        msg.innerText = "Please fill all fields";
        msg.className = "error";
        return;
    }

    // 🔵 LOADING STATE
    btn.innerText = "Logging in...";
    btn.disabled = true;
    msg.innerText = "";

    try {
        let res = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: user, password: pass})
        });

        let data = await res.json();

        if (data.status === "success") {

            msg.innerText = "Login successful";
            msg.className = "success";

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", user);

            setTimeout(() => {
                window.location.href = "home.html";
            }, 800);

        } else {
            msg.innerText = "Invalid username or password";
            msg.className = "error";
        }

    } catch (err) {
        msg.innerText = "Server error. Try again.";
        msg.className = "error";
    }

    // 🔁 RESET BUTTON
    btn.innerText = "Login";
    btn.disabled = false;
}

// Enter to Login
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        login();
    }
});

//----------Anounce-------------
let msg = document.getElementById("msg");

if (data.status === "success") {
    msg.innerText = "Login successful";
    msg.className = "success";

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", user);

    setTimeout(() => {
        window.location.href = "home.html";
    }, 800);

} else {
    msg.innerText = "Invalid credentials";
    msg.className = "error";
}