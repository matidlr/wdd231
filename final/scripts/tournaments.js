// =========================================================
// PADEL COMMUNITY HUB
// tournaments.js
// =========================================================

import "./main.js";

// =========================================================
// VARIABLES
// =========================================================

let tournaments = [];
let players = [];

let favorites =
    JSON.parse(localStorage.getItem("padelFavorites")) || [];


// =========================================================
// DOM ELEMENTS
// =========================================================

const tournamentList =
    document.querySelector("#tournament-list");

const playerRankings =
    document.querySelector("#player-rankings");

const filterForm =
    document.querySelector("#filter-form");

const categorySelect =
    document.querySelector("#category");

const locationSelect =
    document.querySelector("#location");

const searchInput =
    document.querySelector("#search");

const favoriteTournaments =
    document.querySelector("#favorite-tournaments");

const favoriteCount =
    document.querySelector("#favorite-count");

const modal =
    document.querySelector("#tournament-modal");

const modalBody =
    document.querySelector("#modal-body");

const modalClose =
    document.querySelector("#modal-close");


// =========================================================
// LOAD TOURNAMENTS
// =========================================================

async function loadTournaments() {

    try {

        const response =
            await fetch("data/tournaments.json");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        tournaments = await response.json();

        displayTournaments(tournaments);
        displayFavorites();

    } catch (error) {

        console.error(
            "Error loading tournaments:",
            error
        );

        if (tournamentList) {
            tournamentList.innerHTML = `
                <p class="error-message">
                    Sorry, the tournament information
                    could not be loaded.
                </p>
            `;
        }
    }
}


// =========================================================
// LOAD PLAYERS
// =========================================================

async function loadPlayers() {

    try {

        const response =
            await fetch("data/players.json");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        players = await response.json();

        displayPlayers(players);

    } catch (error) {

        console.error(
            "Error loading players:",
            error
        );

        if (playerRankings) {
            playerRankings.innerHTML = `
                <p class="error-message">
                    Sorry, the player rankings
                    could not be loaded.
                </p>
            `;
        }
    }
}


// =========================================================
// DISPLAY TOURNAMENTS
// =========================================================

function displayTournaments(data) {

    if (!tournamentList) {
        return;
    }

    if (data.length === 0) {

        tournamentList.innerHTML = `
            <p class="empty-message">
                No tournaments were found.
            </p>
        `;

        return;
    }

    tournamentList.innerHTML = data
        .map((tournament) => {

            const isFavorite =
                favorites.includes(tournament.id);

            return `
                <article class="card tournament-card">

                    <img
                        class="card-image"
                        src="${tournament.image}"
                        alt="${tournament.name}"
                        loading="lazy"
                    >

                    <div class="card-content">

                        <p class="section-label">
                            ${tournament.category}
                        </p>

                        <h3>
                            ${tournament.name}
                        </h3>

                        <div class="tournament-meta">

                            <span>
                                <strong>Date:</strong>
                                ${formatDate(tournament.date)}
                            </span>

                            <span>
                                <strong>Location:</strong>
                                ${tournament.location}
                            </span>

                            <span>
                                <strong>Club:</strong>
                                ${tournament.club}
                            </span>

                            <span>
                                <strong>Players:</strong>
                                ${tournament.players}
                            </span>

                            <span>
                                <strong>Entry:</strong>
                                ${formatPrice(tournament.price)}
                            </span>

                        </div>

                    </div>

                    <div class="tournament-actions">

                        <button
                            class="button"
                            type="button"
                            data-modal-id="${tournament.id}"
                        >
                            View Details
                        </button>

                        <button
                            class="favorite-button ${
                                isFavorite ? "active" : ""
                            }"
                            type="button"
                            data-favorite-id="${tournament.id}"
                            aria-label="${
                                isFavorite
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }"
                            aria-pressed="${isFavorite}"
                        >
                            ${isFavorite ? "★" : "☆"}
                        </button>

                    </div>

                </article>
            `;
        })
        .join("");

    addTournamentEvents();
}


// =========================================================
// TOURNAMENT BUTTON EVENTS
// =========================================================

function addTournamentEvents() {

    const modalButtons =
        document.querySelectorAll("[data-modal-id]");

    modalButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.modalId);

            openModal(id);
        });

    });


    const favoriteButtons =
        document.querySelectorAll("[data-favorite-id]");

    favoriteButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.favoriteId);

            toggleFavorite(id);
        });

    });
}


// =========================================================
// FILTER
// =========================================================

function filterTournaments() {

    const category =
        categorySelect
            ? categorySelect.value
            : "all";

    const location =
        locationSelect
            ? locationSelect.value
            : "all";

    const search =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    const filtered =
        tournaments.filter((tournament) => {

            const categoryMatch =
                category === "all" ||
                tournament.category === category;

            const locationMatch =
                location === "all" ||
                tournament.location === location;

            const searchMatch =
                tournament.name
                    .toLowerCase()
                    .includes(search) ||
                tournament.club
                    .toLowerCase()
                    .includes(search);

            return (
                categoryMatch &&
                locationMatch &&
                searchMatch
            );
        });


    displayTournaments(filtered);
}


// =========================================================
// FAVORITES
// =========================================================

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(
            (favoriteId) => favoriteId !== id
        );

    } else {

        favorites.push(id);
    }


    localStorage.setItem(
        "padelFavorites",
        JSON.stringify(favorites)
    );


    displayTournaments(tournaments);
    displayFavorites();
}


// =========================================================
// DISPLAY FAVORITES
// =========================================================

function displayFavorites() {

    if (!favoriteTournaments) {
        return;
    }

    if (favoriteCount) {
        favoriteCount.textContent =
            favorites.length;
    }


    const favoriteData =
        tournaments.filter((tournament) =>
            favorites.includes(tournament.id)
        );


    if (favoriteData.length === 0) {

        favoriteTournaments.innerHTML = `
            <p class="empty-message">
                You have no favorite tournaments yet.
            </p>
        `;

        return;
    }


    favoriteTournaments.innerHTML =
        favoriteData
            .map((tournament) => `
                <div class="favorite-item">
                    ${tournament.name}
                </div>
            `)
            .join("");
}


// =========================================================
// MODAL
// =========================================================

function openModal(id) {

    const tournament =
        tournaments.find(
            (item) => item.id === id
        );

    if (!tournament || !modal || !modalBody) {
        return;
    }


    modalBody.innerHTML = `
        <h2 id="modal-title">
            ${tournament.name}
        </h2>

        <p>
            ${tournament.description}
        </p>

        <div class="tournament-meta">

            <span>
                <strong>Category:</strong>
                ${tournament.category}
            </span>

            <span>
                <strong>Date:</strong>
                ${formatDate(tournament.date)}
            </span>

            <span>
                <strong>Location:</strong>
                ${tournament.location}
            </span>

            <span>
                <strong>Club:</strong>
                ${tournament.club}
            </span>

            <span>
                <strong>Players:</strong>
                ${tournament.players}
            </span>

            <span>
                <strong>Entry Fee:</strong>
                ${formatPrice(tournament.price)}
            </span>

        </div>
    `;


    modal.showModal();
}


// =========================================================
// CLOSE MODAL
// =========================================================

if (modalClose && modal) {

    modalClose.addEventListener(
        "click",
        () => {
            modal.close();
        }
    );

}


// =========================================================
// PLAYER RANKINGS
// =========================================================

function displayPlayers(data) {

    if (!playerRankings) {
        return;
    }


    const sortedPlayers =
        [...data].sort(
            (a, b) =>
                a.ranking - b.ranking
        );


    playerRankings.innerHTML =
        sortedPlayers
            .map((player) => `
                <article class="ranking-item">

                    <div class="ranking-number">
                        ${player.ranking}
                    </div>

                    <div class="ranking-info">

                        <h3>
                            ${player.name}
                        </h3>

                        <p>
                            ${player.city} ·
                            ${player.category}
                        </p>

                    </div>

                    <div class="ranking-points">
                        ${player.points}
                        points
                    </div>

                </article>
            `)
            .join("");
}


// =========================================================
// FORMAT DATE
// =========================================================

function formatDate(dateString) {

    const date =
        new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


// =========================================================
// FORMAT PRICE
// =========================================================

function formatPrice(price) {

    return new Intl.NumberFormat(
        "es-AR",
        {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0
        }
    ).format(price);
}


// =========================================================
// FORM EVENT
// =========================================================

if (filterForm) {

    filterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            filterTournaments();
        }
    );
}


// =========================================================
// SEARCH EVENT
// =========================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterTournaments
    );
}


// =========================================================
// INITIALIZE
// =========================================================

loadTournaments();
loadPlayers();