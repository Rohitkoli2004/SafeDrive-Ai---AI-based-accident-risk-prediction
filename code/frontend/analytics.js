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

// LOAD DATA
let history = JSON.parse(localStorage.getItem("history")) || [];

// 🔥 CLEAN DATA (important)
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

    // COUNT
    let low = 0, med = 0, high = 0, totalProb = 0;

    history.forEach(item => {
        if (item.risk === "LOW") low++;
        else if (item.risk === "MEDIUM") med++;
        else if (item.risk === "HIGH") high++;

        let prob = parseFloat(item.probability);
        if (!isNaN(prob)) {
            totalProb += prob;
        }
    });

    let total = history.length;

    // ✅ SAFE CALCULATIONS
    let avg = total > 0 ? ((totalProb / total) * 100).toFixed(1) : 0;
    let highPercent = total > 0 ? ((high / total) * 100).toFixed(1) : 0;

    // FIND MOST COMMON
    let common = "LOW";
    if (med > low && med > high) common = "MEDIUM";
    if (high > low && high > med) common = "HIGH";

    // UPDATE CARDS
    document.getElementById("totalCard").innerText = `Total: ${total}`;
    document.getElementById("highCard").innerText = `High %: ${highPercent}%`;
    document.getElementById("avgCard").innerText = `Avg Prob: ${avg}%`;
    document.getElementById("commonCard").innerText = `Common: ${common}`;

    // =========================
    // 🔥 CHARTS (PRO VERSION)
    // =========================

    // RISK DISTRIBUTION
    new Chart(document.getElementById("riskChart"), {
        type: "doughnut",
        data: {
            labels: ["LOW", "MEDIUM", "HIGH"],
            datasets: [{
                data: [low, med, high],
                backgroundColor: [
                    "#00c6ff",   // LOW
                    "#ffc107",   // MEDIUM
                    "#ff4d4d"    // HIGH
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

    // TIMELINE DATA
    let labels = history.map((_, i) => `#${i + 1}`).reverse();

    let probs = history.map(item =>
        parseFloat((item.probability * 100).toFixed(1))
    ).reverse();

    // TIMELINE CHART
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