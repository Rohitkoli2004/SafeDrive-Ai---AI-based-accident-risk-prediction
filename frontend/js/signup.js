async function signup() {

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
    btn.innerText = "Creating...";
    btn.disabled = true;
    msg.innerText = "";

    try {
        let res = await fetch("http://127.0.0.1:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        });

        let data = await res.json();   // 🔥 IMPORTANT FIX

        if (data.status === "created") {

            msg.innerText = "Account created successfully";
            msg.className = "success";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);

        } else if (data.status === "exists") {

            msg.innerText = "User already exists";
            msg.className = "error";

        } else {

            msg.innerText = "Something went wrong";
            msg.className = "error";
        }

    } catch (err) {
        msg.innerText = "Server error. Try again.";
        msg.className = "error";
    }

    // 🔁 RESET BUTTON
    btn.innerText = "Sign Up";
    btn.disabled = false;
}


/* 🔥 ENTER KEY SUPPORT */
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        signup();
    }
});

/* Back to Login */
function goLogin() {
    window.location.href = "login.html";
}