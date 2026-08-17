// Client-side search handler for the demo search box

function escapeHtml(str) {
    return String(str).replace(/[&<>\"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}

function searchMechanics() {
    const location = document.querySelector("#location").value.trim();
    const car = document.querySelector("#car").value;
    const result = document.querySelector("#search-result");

    if (!result) {
        console.error("Missing #search-result element in the DOM");
        return;
    }

    if (!location || !car) {
        result.innerHTML = "⚠️ Please enter your location and select your car.";
        return;
    }

    result.innerHTML = `
        <h3>🔧 Mechanics found!</h3>
        <p>📍 Location: ${escapeHtml(location)}</p>
        <p>🚗 Car: ${escapeHtml(car)}</p>
        <p>✅ 3 mechanics are available.</p>
    `;
}
