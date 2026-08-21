const SUPABASE_URL = "https://qzqibfgyqwrhjrgiyumg.supabase.co";
const SUPABASE_KEY = "sb_publishable_T0ydZcimtvIMUK29FuGb2g_VX5dUmpv";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
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


async function registerMechanic() {
    const name = document.getElementById("mechanic-name").value.trim();
    const location = document.getElementById("mechanic-location").value.trim();
    const phone = document.getElementById("mechanic-phone").value.trim();
    const price = document.getElementById("mechanic-price").value;
    const experience = document.getElementById("mechanic-experience").value;

    if (!name || !location || !phone || !price || !experience) {
        alert("⚠️ Please fill in all fields.");
        return;
    }

    const { data, error } = await supabaseClient
        .from("Bond")
        .insert([
            {
                name: name,
                location: location,
                phone: phone,
                price: Number(price),
                experience: Number(experience),
                car: car,
                rating: 5,
                status: "Available now"
            }
        ])
        .select();

    if (error) {
        console.error(error);

        alert(
            "❌ Registration failed\n\n" +
            error.message
        );

        return;
    }

    alert(
        `🎉 Welcome to CARFIX, ${name}!\n\n` +
        "Your profile has been created successfully."
    );

    console.log("New mechanic:", data);
}

function searchMechanics() {
    // Use a local variable name to avoid colliding with window.location
    const loc = document.querySelector("#location")?.value?.trim() ?? "";
    const car = document.querySelector("#car")?.value ?? "";
    const result = document.querySelector("#search-result");

    if (!result) return;

    if (loc === "" || car === "") {
        result.innerHTML = `
            <div class="error-message">
    :            ⚠️ Please enter your location and select your car.
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
                😔 No mechanics found for ${car} in ${loc}.
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="results-header">
            <h3>🔧 Mechanics near you</h3>
            <p>${matches.length} mechanic(s) found for ${car} in ${loc}</p>
        </div>

        <div class="mechanic-results">
            ${matches.map(mechanic => {
                const safeName = mechanic.name.replace(/'/g, "\\'");
                return `
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

                        <div class="mechanic-actions">
                            <button onclick="contactMechanic('${safeName}')">
                                📞 Contact
                            </button>

                            <button onclick="startConsultation('${safeName}')">
                                📹 Start Video Consultation
                            </button>
                        </div>

                    </div>
                `;
            }).join("")}
        </div>
    `;
}

function contactMechanic(name) {
    const mechanic = mechanics.find(item => item.name === name);
    if (!mechanic) return;
    const result = document.querySelector("#search-result");
    if (!result) return;

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

                <button onclick="startConsultation('${mechanic.name.replace(/'/g, "\\'")}')">
                    📹 Start Video Consultation
                </button>

            </div>

        </div>
    `;
}

function startConsultation(name) {
    alert(`Video consultation with ${name} will be available soon.`);
}

function showRegistration() {
    const result = document.querySelector("#search-result");
    if (!result) return;

    result.innerHTML = `
        <div class="registration-form">

            <button class="close-profile"
                onclick="searchMechanics()">
                ✕
            </button>

            <h2>🔧 Mechanic Registration</h2>

            <p>Join CARFIX and start helping drivers.</p>

            <input
                id="mechanic-name"
                type="text"
                placeholder="👤 Your name"
            >

            <input
                id="mechanic-location"
                type="text"
                placeholder="📍 Your location"
            >

            <input
                id="mechanic-phone"
                type="tel"
                placeholder="📞 Phone number"
            >

            <select id="mechanic-car">
                <option value="">Select your car specialties</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Volkswagen</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Other</option>
            </select>

            <input
                id="mechanic-price"
                type="number"
                placeholder="💰 Consultation price (€)"
            >

            <input
                id="mechanic-experience"
                type="number"
                placeholder="🛠️ Years of experience"
            >

            <button onclick="registerMechanic()">
                Create Mechanic Profile
            </button>

        </div>
    `;
}

async function testSupabase() {
    const { data, error } = await supabaseClient
        .from("mechanics")
        .select("*")
        .limit(1);

    if (error) {
        console.error("Supabase error:", error);
        alert("❌ Supabase connection error");
        return;
    }

    console.log("Supabase connected:", data);
    // only alert for debugging; remove in production
    alert("✅ Supabase connected successfully!");
}

// keep the single async registerMechanic above (which inserts into Supabase)

// Run a quick supabase connectivity test
try {
    testSupabase();
} catch (err) {
    console.error('Error running testSupabase()', err);
}
