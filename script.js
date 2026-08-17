
function searchMechanics() {
    const location = document.querySelector("#location").value;
    const car = document.querySelector("#car").value;
    const result = document.querySelector("#search-result");

    if (location === "" || car === "") {
        result.innerHTML = "⚠️ Please enter your location and select your car.";
        return;
    }

    result.innerHTML = `
        <h3>🔧 Mechanics found!</h3>
        <p>📍 Location: ${location}</p>
        <p>🚗 Car: ${car}</p>
        <p>✅ 3 mechanics are available.</p>
    `;
}
