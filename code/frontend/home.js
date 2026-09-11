//-----------------Login----------------
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

//--------------------------------------
function goHome() {
    window.location.href = "home.html";
}

function goDashboard() {
    window.location.href = "index.html";
}

function goAnalytics() {
    window.location.href = "analytics.html";
}

//-----------Logout---------------
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username"); // important
    window.location.href = "login.html";
}

//-----------welcome-----------------
window.onload = function () {

    let user = localStorage.getItem("username");
    let toast = document.getElementById("welcomeToast");

    if (user && toast) {

        toast.innerHTML = `🔔 Welcome, <b>${user}</b> 👋`;

        // Show with slight delay (feels smoother)
        setTimeout(() => {
            toast.classList.add("show");
        }, 300);

        // Hide after 3.5 sec
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3800);
    }
};