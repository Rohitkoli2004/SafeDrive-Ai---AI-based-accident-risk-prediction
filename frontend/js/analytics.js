//-----------------Login----------------
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}


// NAVIGATION
function goHome() {
    window.location.href = "home.html";
}

function goDashboard() {
    window.location.href = "index.html";
}

function goSettings() {
    window.location.href = "settings.html";
}

// LOAD DATA
let history =
    JSON.parse(
        localStorage.getItem("history")
    ) || [];


// CLEAN DATA
history = history.filter(item =>
    item &&
    item.risk &&
    item.probability !== undefined &&
    !isNaN(parseFloat(item.probability))
);


if (history.length === 0) {

    document.getElementById("emptyMsg").style.display = "block";

} else {

    document.getElementById("emptyMsg").style.display = "none";
    document.getElementById("chartsSection").style.display = "flex";

    let low = 0,
        med = 0,
        high = 0,
        totalProb = 0;


    history.forEach(item => {

        if (item.risk === "LOW") low++;
        else if (item.risk === "MEDIUM") med++;
        else if (item.risk === "HIGH") high++;

        totalProb += parseFloat(item.probability);
    });


    let total = history.length;

    // FIXED (NO *100)
    let avg =
        total > 0
            ? (totalProb / total).toFixed(1)
            : 0;

    let highPercent =
        total > 0
            ? ((high / total) * 100).toFixed(1)
            : 0;


    let common = "LOW";

    if (med > low && med > high)
        common = "MEDIUM";

    if (high > low && high > med)
        common = "HIGH";


    document.getElementById("totalCard").innerText =
        `Total: ${total}`;

    document.getElementById("highCard").innerText =
        `High %: ${highPercent}%`;

    document.getElementById("avgCard").innerText =
        `Avg Prob: ${avg}%`;

    document.getElementById("commonCard").innerText =
        `Common: ${common}`;


    // RISK CHART
    new Chart(document.getElementById("riskChart"), {
        type: "doughnut",
        data: {
            labels: ["LOW", "MEDIUM", "HIGH"],
            datasets: [{
                data: [low, med, high],
                backgroundColor: [
                    "#00c6ff",
                    "#ffc107",
                    "#ff4d4d"
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#fff"
                    }
                }
            }
        }
    });


    // FIXED TIMELINE
    let labels =
        history.map((_, i) => `#${i + 1}`).reverse();

    let probs =
        history.map(item =>
            parseFloat(item.probability).toFixed(1)
        ).reverse();


    new Chart(document.getElementById("timelineChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Probability %",
                data: probs,
                borderColor: "#00c6ff",
                backgroundColor: "rgba(0,198,255,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 4
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: { color: "#fff" }
                },
                y: {
                    ticks: { color: "#fff" }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#fff"
                    }
                }
            }
        }
    });
}

//======== Location Analysis ================

let cityCounts = {};

history.forEach(item => {
    if(item.city){
        cityCounts[item.city] =
            (cityCounts[item.city] || 0) + 1;
    }
});

new Chart(document.getElementById("locationChart"), {
    type: "bar",
    data: {
        labels: Object.keys(cityCounts),
        datasets: [{
            label: "Predictions",
            data: Object.values(cityCounts)
        }]
    }
});

//======== Time Analysis ================

let morning = 0, afternoon = 0, night = 0;

history.forEach(item => {

    if(item.hour >= 6 && item.hour < 12)
        morning++;

    else if(item.hour >= 12 && item.hour < 18)
        afternoon++;

    else
        night++;
});

new Chart(document.getElementById("timeChart"), {
    type: "pie",
    data: {
        labels: ["Morning", "Afternoon", "Night"],
        datasets: [{
            data: [morning, afternoon, night]
        }]
    }
});