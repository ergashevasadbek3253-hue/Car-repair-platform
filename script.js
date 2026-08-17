const mechanics = [
    {
        name: "Alex",
        location: "Riga, Latvia",
        cars: ["BMW", "Mercedes-Benz", "Volkswagen"],
        rating: "4.9",
        price: "€15",
        status: "Available now",
        image: "🔧"
    },
    {
        name: "Mike",
        location: "Riga, Latvia",
        cars: ["Toyota", "Ford", "Other"],
        rating: "4.8",
        price: "€12",
        status: "Available now",
        image: "🧰"
    },
    {
        name: "Daniel",
        location: "Riga, Latvia",
        cars: ["BMW", "Toyota", "Other"],
        rating: "4.7",
        price: "€10",
        status: "Busy",
        image: "👨‍🔧"
    }
];

function searchMechanics() {
    const location = document.querySelector("#location").value.trim();
    const car = document.querySelector("#car").value;
    const result = document.querySelector("#search-result");

    if (location === "" || car === "" || car === "Select your car") {
        result.innerHTML = `
            <div class="error-message">
                ⚠️ Please enter your location and select your car.
            </div>
        `;
        return;
    }

    const matches = mechanics.filter(mechanic =>
        mechanic.cars.includes(car)
    );

    if (matches.length === 0) {
        result.innerHTML = `
            <div class="error-message">
                😔 No mechanics found for ${car} in ${location}.
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="results-header">
            <h3>🔧 Mechanics near you</h3>
            <p>${matches.length} mechanic(s) found for ${car} in ${location}</p>
        </div>

        <div class="mechanic-results">
            ${matches.map(mechanic => `
                <div class="mechanic-card">

                    <div class="mechanic-icon">
                        ${mechanic.image}
                    </div>

                    <div class="mechanic-info">
                        <h3>${mechanic.name}</h3>

                        <p>📍 ${mechanic.location}</p>

                        <p>⭐ ${mechanic.rating}/5</p>

                        <p>🚗 ${mechanic.cars.join(", ")}</p>

                        <p>💰 ${mechanic.price} / consultation</p>

                        <p class="status">
                            ${mechanic.status === "Available now"
                                ? "🟢 Available now"
                                : "🟠 Currently busy"}
                        </p>
                    </div>

                    <button> function contactMechanic(name) {
    const mechanic = mechanics.find(item => item.name === name);

    if (!mechanic) {
        return;
    }

    const result = document.querySelector("#search-result");

    result.innerHTML = `
        <div class="profile-overlay">

            <div class="mechanic-profile">

                <button class="close-profile"
                    onclick="searchMechanics()">
                    ✕
                </button>

                <div class="profile-icon">
                    ${mechanic.image}
                </div>

                <h2>${mechanic.name}</h2>

                <p class="verified">✓ Verified Mechanic</p>

                <div class="profile-details">
                    <p>📍 ${mechanic.location}</p>
                    <p>⭐ ${mechanic.rating}/5 rating</p>
                    <p>🚗 ${mechanic.cars.join(", ")}</p>
                    <p>💰 ${mechanic.price} / consultation</p>
                    <p>
                        ${mechanic.status === "Available now"
                            ? "🟢 Available now"
                            : "🟠 Currently busy"}
                    </p>
                </div>

                <button onclick="startConsultation('${mechanic.name}')">
                    📹 Start Video Consultation
                </button>

            </div>

        </div>
    `;
}

function startConsultation(name) {
    alert(
        `Video consultation with ${name} will be available soon.`
    );
}
                    </button>

                </div>
            `).join("")}
        </div>
    `;
}

function contactMechanic(name) {
    alert(`You selected ${name}. Contact feature will be added soon!`);
}
