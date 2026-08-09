// Padel Community Hub
// Clubs page JavaScript

import "./main.js";

// Select the containers used to display clubs and equipment.
const clubList = document.querySelector("#club-list");
const equipmentList = document.querySelector("#equipment-list");

// Load club data from the JSON file.
async function loadClubs() {
    try {
        const response = await fetch("data/clubs.json");

        if (!response.ok) {
            throw new Error("Unable to load clubs.json");
        }

        const clubs = await response.json();

        displayClubs(clubs);
    } catch (error) {
        console.error("Error loading clubs:", error);

        if (clubList) {
            clubList.innerHTML = "<p>Unable to load clubs.</p>";
        }
    }
}

// Display the club data on the page.
function displayClubs(clubs) {
    if (!clubList) {
        return;
    }

    clubList.innerHTML = "";

    clubs.forEach((club) => {
        const article = document.createElement("article");

        article.className = "club-card";

        article.innerHTML = `
            <img
                src="${club.image}"
                alt="${club.name}"
                loading="lazy"
            >
            <h3>${club.name}</h3>
            <p>${club.description}</p>
            <p><strong>Location:</strong> ${club.location}</p>
            <p><strong>Courts:</strong> ${club.courts}</p>
            <p><strong>Phone:</strong> ${club.phone}</p>
        `;

        clubList.appendChild(article);
    });
}

// Load equipment data from the JSON file.
async function loadEquipment() {
    try {
        const response = await fetch("data/equipment.json");

        if (!response.ok) {
            throw new Error("Unable to load equipment.json");
        }

        const equipment = await response.json();

        displayEquipment(equipment);
    } catch (error) {
        console.error("Error loading equipment:", error);

        if (equipmentList) {
            equipmentList.innerHTML = "<p>Unable to load equipment.</p>";
        }
    }
}

// Display the equipment data on the page.
function displayEquipment(equipment) {
    if (!equipmentList) {
        return;
    }

    equipmentList.innerHTML = "";

    equipment.forEach((item) => {
        const article = document.createElement("article");

        article.className = "equipment-card";

        article.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy"
            >
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Brand:</strong> ${item.brand}</p>
            <p><strong>Level:</strong> ${item.level}</p>
            <p><strong>Price:</strong> ${item.price}</p>
        `;

        equipmentList.appendChild(article);
    });
}

// Start loading the page data.
loadClubs();
loadEquipment();