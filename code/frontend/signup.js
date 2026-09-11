function goLogin() {
    window.location.href = "login.html";
}

async function signup() {

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (!user || !pass) {
        let msg = document.getElementById("msg");
        msg.innerText = "Fill all fields";
        msg.className = "error";
    return;
}

    let res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: user, password: pass})
    });

    let msg = document.getElementById("msg");

    if (data.status === "created") {
        msg.innerText = "Account created successfully!";
        msg.className = "success";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);

    } else if (data.status === "exists") {
        msg.innerText = "User already exists";
        msg.className = "error";
    } else {
        msg.innerText = "Something went wrong";
        msg.className = "error";
}
}