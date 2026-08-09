// Padel Community Hub
// Clubs and Equipment JavaScript

import "./main.js";

// Cache DOM elements
const clubList = document.querySelector("#club-list");
const equipmentList = document.querySelector("#equipment-list");

// Utility: Prevent XSS by escaping dynamic user/data strings inserted into HTML
function sanitizeHTML(str) {
    if (str == null) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Utility: Format prices in Argentine pesos using a cached Formatter instance
const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
});

function formatPrice(price) {
    return currencyFormatter.format(price);
}

// Generic Fetcher to eliminate repetitive try/catch logic
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// Generic Error Renderer
function renderError(container, message) {
    if (!container) return;
    container.innerHTML = `
        <p class="error-message">
            ${sanitizeHTML(message)}
        </p>
    `;
}

// Template Generators
function createClubCard(club) {
    return `
        <article class="club-card">
            <img
                src="${sanitizeHTML(club.image)}"
                alt="${sanitizeHTML(club.name)}"
                loading="lazy"
            >
            <h3>${sanitizeHTML(club.name)}</h3>
            <p>${sanitizeHTML(club.description)}</p>
            <p><strong>Location:</strong> ${sanitizeHTML(club.location)}</p>
            <p><strong>Courts:</strong> ${sanitizeHTML(club.courts)}</p>
            <p><strong>Phone:</strong> ${sanitizeHTML(club.phone)}</p>
        </article>
    `;
}

function createEquipmentCard(item) {
    return `
        <article class="equipment-card">
            <img
                src="${sanitizeHTML(item.image)}"
                alt="${sanitizeHTML(item.name)}"
                loading="lazy"
            >
            <h3>${sanitizeHTML(item.name)}</h3>
            <p>${sanitizeHTML(item.description)}</p>
            <p><strong>Type:</strong> ${sanitizeHTML(item.type)}</p>
            <p><strong>Brand:</strong> ${sanitizeHTML(item.brand)}</p>
            <p><strong>Level:</strong> ${sanitizeHTML(item.level)}</p>
            <p><strong>Price:</strong> ${formatPrice(item.price)}</p>
        </article>
    `;
}

// Display Functions
function renderList(container, items, templateFn) {
    if (!container || !Array.isArray(items)) return;
    container.innerHTML = items.map(templateFn).join("");
}

// Controller Loaders
async function loadClubs() {
    if (!clubList) return; // Prevent network call if container isn't present
    try {
        const clubs = await fetchData("data/clubs.json");
        renderList(clubList, clubs, createClubCard);
    } catch (error) {
        console.error("Error loading clubs:", error);
        renderError(clubList, "The clubs could not be loaded.");
    }
}

async function loadEquipment() {
    if (!equipmentList) return; // Prevent network call if container isn't present
    try {
        const equipment = await fetchData("data/equipment.json");
        renderList(equipmentList, equipment, createEquipmentCard);
    } catch (error) {
        console.error("Error loading equipment:", error);
        renderError(equipmentList, "The equipment could not be loaded.");
    }
}

// Initialize Application
function init() {
    // Run requests concurrently instead of blocking sequentially
    Promise.allSettled([loadClubs(), loadEquipment()]);
}

// Ensure execution runs after DOM is ready or immediately if script is deferred/module
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}