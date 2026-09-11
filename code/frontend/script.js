//-----------------Login----------------
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }

    function logout() {
        localStorage.removeItem("loggedIn");
        window.location.href = "login.html";
    }
    
// ---------------- MAP ----------------
let map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

map.on('click', function(e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;

    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
});


// ---------------- HISTORY STORAGE ----------------
let history = JSON.parse(localStorage.getItem("history")) || [];

function saveHistory(data) {
    history.unshift(data);
    localStorage.setItem("history", JSON.stringify(history));
}


// ---------------- PREDICT ----------------
function predict() {

    let lat = document.getElementById("lat").value;
    let lng = document.getElementById("lng").value;

    if (!lat || !lng) {
        alert("Select location on map");
        return;
    }

    let url = `http://127.0.0.1:8000/predict?lat=${lat}&lng=${lng}
    &distance=${distance.value}
    &temp=${temp.value}
    &humidity=${humidity.value}
    &visibility=${visibility.value}
    &wind_speed=${wind.value}
    &precipitation=${rain.value}
    &weather=${weather.value}
    &signal=${signal.value}
    &day=${day.value}
    &hour=${hour.value}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {

        showResult(data);
        updateUI(data);
        saveHistory(data);

    })
    .catch(() => {
        alert("Backend not running!");
    });
}


// ---------------- RESULT ----------------
function showResult(data) {

    let color = "green";
    if (data.risk === "HIGH") color = "red";
    else if (data.risk === "MEDIUM") color = "orange";

    document.getElementById("result").innerHTML = `
        <b style="color:${color}; font-size:22px;">
            ${data.risk} RISK
        </b><br>
        ${(data.probability * 100).toFixed(2)}%
    `;
}


// ---------------- UI UPDATE ----------------
function updateUI(data) {

    let box = document.getElementById("historyBox");
    if (!box) return;

    let entry = document.createElement("div");
    entry.innerText = `${data.risk} (${(data.probability * 100).toFixed(1)}%)`;

    box.prepend(entry);

    let total = document.getElementById("totalCount");
    if (total) {
        total.innerText = parseInt(total.innerText || 0) + 1;
    }

    let last = document.getElementById("lastRisk");
    if (last) {
        last.innerText = data.risk;
    }
}


// ---------------- LOCATION ----------------
function getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {

        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        document.getElementById("lat").value = lat;
        document.getElementById("lng").value = lng;

        map.setView([lat, lng], 10);

        if (marker) map.removeLayer(marker);
        marker = L.marker([lat, lng]).addTo(map);

    });
}


// ---------------- NAVIGATION ----------------
function goHome() {
    window.location.href = "home.html";
}

function goAnalytics() {
    window.location.href = "analytics.html";
}

// --------------- Checking Status --------------
id="statuscheck01"
function checkBackendStatus() {

    fetch("http://127.0.0.1:8000/")
    .then(res => {
        if (res.ok) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    })
    .catch(() => {
        setStatus(false);
    });
}

function setStatus(isActive) {
    let status = document.getElementById("status");
    if (!status) return;

    if (isActive) {
        status.innerText = "Active";
        status.classList.remove("offline");
        status.classList.add("active");
    } else {
        status.innerText = "Offline";
        status.classList.remove("active");
        status.classList.add("offline");
    }
}

// --------------- Checking Status --------------
    
id="statuscheck02"
window.onload = function () {
        checkBackendStatus();
    };

id="statuscheck03"
setInterval(checkBackendStatus, 5000);

