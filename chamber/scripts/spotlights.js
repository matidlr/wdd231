const url = "data/members.json";

const spotlightContainer = document.querySelector("#spotlight-container");

async function loadSpotlights() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();

        // Only Gold and Silver members
        const qualified = members.filter(member =>
            member.membershipLevel === 2 ||
            member.membershipLevel === 3
        );

        // Shuffle randomly
        qualified.sort(() => Math.random() - 0.5);

        // Choose either 2 or 3 members
        const numberOfCards = Math.random() < 0.5 ? 2 : 3;
        const selected = qualified.slice(0, numberOfCards);

        displaySpotlights(selected);

    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {

    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </p>

            <p>
                ${member.membershipLevel === 3 ? "Gold Member" : "Silver Member"}
            </p>
        `;

        spotlightContainer.appendChild(card);

    });

}

loadSpotlights();