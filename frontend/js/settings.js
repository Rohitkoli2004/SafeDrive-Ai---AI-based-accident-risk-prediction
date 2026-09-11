/* LOAD USER */

document.getElementById("username").innerText =
    localStorage.getItem("username") || "User";


/* NAVIGATION */

function goDashboard(){

    window.location.href = "index.html";
}

function goAnalytics() {

    window.location.href = "analytics.html";
}



/* LOGOUT */

function logout(){

    localStorage.clear();

    window.location.href = "login.html";
}


/* DELETE ACCOUNT */

async function deleteAccount() {

    let confirmDelete =
        confirm("Delete account permanently?");

    if (!confirmDelete) return;

    let username =
        localStorage.getItem("username");

    if (!username) {

        alert("User not found");
        return;
    }

    try {

        let res = await fetch(
            "http://127.0.0.1:8000/delete-user",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username
                })
            }
        );

        let data = await res.json();

        if (data.status === "deleted") {

            alert("Account deleted");

            localStorage.clear();

            window.location.href =
                "signup.html";
        }
        else {

            alert("User not found");
        }

    }
    catch (err) {

        console.log(err);

        alert("Server error");
    }
}

// =========================
// HOME PAGE
// =========================

function goHome(){

    window.location.href =
        "home.html";
}


// =========================
// BACKEND STATUS
// =========================

async function checkBackendStatus(){

    let status =
        document.getElementById(
            "backendStatus"
        );

    try{

        let res =
            await fetch(
                "http://127.0.0.1:8000/"
            );

        if(res.ok){

            status.innerText = "Active";

            status.style.color =
                "#00ff88";
        }
        else{

            status.innerText = "Offline";

            status.style.color =
                "red";
        }

    }
    catch{

        status.innerText = "Offline";

        status.style.color =
            "red";
    }
}

checkBackendStatus();

setInterval(checkBackendStatus,5000);