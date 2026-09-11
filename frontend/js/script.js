// ================= LOGIN CHECK =================

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}


// ================= NAVIGATION =================

function goHome() {
    window.location.href = "home.html";
}

function goAnalytics() {
    window.location.href = "analytics.html";
}

function goSettings() {
    window.location.href = "settings.html";
}

// ================= MAP =================

let map = L.map("map").setView([20.5937, 78.9629], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

let marker = L.marker([20.5937, 78.9629]).addTo(map);

// ================= MAP CLICK =================

map.on("click", async function (e) {

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 11);

    selectedLocation = {
        lat: lat,
        lng: lng,
        city: "Selected Location"
    };

    cityInput.value =
        `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;

    try {

        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${API_KEY}`
        );

        const data = await response.json();

        if (data.length > 0) {

            selectedLocation.city = data[0].name;

            cityInput.value =
                `${data[0].name}, ${data[0].country}`;
        }

    } catch (error) {

        console.log("Reverse geocode failed");
    }
});


// ================= API KEY =================

const API_KEY = "031e4ad33fb79a8bead2c72e15077095";


// ================= GLOBAL STORAGE =================

let selectedLocation = null;
let debounceTimer;


// ================= ELEMENTS =================

const cityInput = document.getElementById("cityInput");
const suggestionsBox = document.getElementById("suggestions");
const predictBtn = document.getElementById("predictBtn");
const resultBox = document.getElementById("result");


// ================= LOCATION BUTTON =================

function getLocation() {

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        selectedLocation = {
            lat: lat,
            lng: lng,
            city: "Current Location"
        };

        map.setView([lat, lng], 13);
        marker.setLatLng([lat, lng]);

        try {

            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${API_KEY}`
            );

            const data = await response.json();

            if (data.length > 0) {

                selectedLocation.city = data[0].name;

                cityInput.value =
                    `${data[0].name}, ${data[0].country}`;
            }
            else {

                cityInput.value =
                    `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
            }

        } catch {

            cityInput.value =
                `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        }

    });
}


// ================= BACKEND STATUS =================

async function checkBackendStatus() {

    const statusBox =
        document.getElementById("status");

    try {

        let res =
            await fetch("http://127.0.0.1:8000/");

        if (res.ok) {

            statusBox.innerText = "Active";
            statusBox.style.color = "#00ff88";
        }
        else {

            statusBox.innerText = "Offline";
            statusBox.style.color = "#ff4d4d";
        }

    }
    catch {

        statusBox.innerText = "Offline";
        statusBox.style.color = "#ff4d4d";
    }
}

checkBackendStatus();
setInterval(checkBackendStatus, 5000);


// ================= AUTOCOMPLETE =================

cityInput.addEventListener("input", () => {

    clearTimeout(debounceTimer);

    selectedLocation = null;

    const query = cityInput.value.trim();

    if (query.length < 2) {

        suggestionsBox.style.display = "none";
        return;
    }

    debounceTimer =
        setTimeout(() => fetchCities(query), 300);
});


// ================= FETCH CITIES =================

async function fetchCities(query) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );

        const data = await response.json();

        suggestionsBox.innerHTML = "";

        if (!data.length) {
            suggestionsBox.style.display = "none";
            return;
        }

        suggestionsBox.style.display = "block";

        data.forEach(city => {

            const item =
                document.createElement("div");

            item.classList.add("suggestion-item");

            item.innerText =
                `${city.name}, ${city.country}`;

            item.addEventListener("click", () => {

                cityInput.value =
                    `${city.name}, ${city.country}`;

                selectedLocation = {
                    lat: city.lat,
                    lng: city.lon,
                    city: city.name
                };

                suggestionsBox.style.display = "none";

                map.setView([city.lat, city.lon], 11);

                marker.setLatLng([city.lat, city.lon]);
            });

            suggestionsBox.appendChild(item);
        });

    }
    catch (error) {

        console.log(error);
    }
}


// ================= CLOSE SUGGESTIONS =================

document.addEventListener("click", (e) => {

    if (
        !cityInput.contains(e.target) &&
        !suggestionsBox.contains(e.target)
    ) {
        suggestionsBox.style.display = "none";
    }
});


// ================= WEATHER =================

async function getWeather(lat, lng) {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    return {

        temp: data.main.temp,
        humidity: data.main.humidity,
        visibility: data.visibility
            ? data.visibility / 1000
            : 5,
        wind_speed: data.wind.speed,
        precipitation:
            data.rain?.["1h"] || 0
    };
}


// ================= PREDICT =================

predictBtn.addEventListener("click", async () => {

    if (!selectedLocation) {
        alert("Select city from suggestions");
        return;
    }

    try {

        predictBtn.innerText = "Predicting...";
        predictBtn.disabled = true;

        const weather =
            await getWeather(
                selectedLocation.lat,
                selectedLocation.lng
            );

        const params =
            new URLSearchParams({

                lat: selectedLocation.lat,
                lng: selectedLocation.lng,

                distance: 1,

                temp: weather.temp,
                humidity: weather.humidity,
                visibility: weather.visibility,
                wind_speed: weather.wind_speed,
                precipitation: weather.precipitation,

                weather: weatherCode,
                signal: 1,
                day: day,
                hour: hour
            });

        const response = await fetch(
            `http://127.0.0.1:8000/predict?${params}`
        );

        const data = await response.json();

        showResult(data);

        updateStats(data);

        saveHistory(data);

    }
   catch (error) {

    console.log(error);

    resultBox.className = "high-risk";

    resultBox.innerHTML = `
        <div class="risk-title">
            SERVER ERROR
        </div>

        <div class="risk-percent">
            Backend Offline
        </div>
    `;

    alert("Backend server is not running");
}
    finally {

        predictBtn.innerText =
            "Predict Risk";

        predictBtn.disabled = false;
    }
});


//============================================

const now = new Date();

const hour = now.getHours();

const day =
    (hour >= 6 && hour < 18) ? 1 : 0;


// Dynamic weather condition
let weatherCode = 1;

if (
    weather.precipitation > 5 ||
    weather.visibility < 2
) {
    weatherCode = 2;
}
else if (
    weather.precipitation === 0 &&
    weather.visibility > 7
) {
    weatherCode = 0;
}


// ================= SHOW RESULT =================

function showResult(data) {

    resultBox.className = "";

    let riskClass = "low-risk";

    if (data.risk === "HIGH")
        riskClass = "high-risk";

    else if (data.risk === "MEDIUM")
        riskClass = "medium-risk";

    resultBox.classList.add(riskClass);

    let probability =
    Number(data.probability).toFixed(2);

    resultBox.innerHTML = `
        <div class="risk-title">
            ${data.risk} RISK
        </div>

        <div class="risk-percent">
            ${probability}%
        </div>
    `;
}


// ================= SAVE HISTORY =================

function saveHistory(data) {

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
        risk: data.risk,
        probability: parseFloat(data.probability),
        city: selectedLocation.city,
        time: new Date().toLocaleString(),
        hour: new Date().getHours()
    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );
}


// ================= UPDATE STATS =================

function updateStats(data) {

    let total =
        document.getElementById("totalCount");

    if (total) {
        total.innerText =
            parseInt(total.innerText) + 1;
    }

    let last =
        document.getElementById("lastRisk");

    if (last) {
        last.innerText = data.risk;
    }
}