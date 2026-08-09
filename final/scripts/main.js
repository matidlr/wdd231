// =========================================================
// PADEL COMMUNITY HUB
// Shared JavaScript
// =========================================================

// =========================================================
// MOBILE NAVIGATION
// =========================================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    const navigationLinks =
        navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuButton.textContent = "☰";
        });
    });
}

// =========================================================
// CURRENT YEAR
// =========================================================

const currentYear =
    document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear().toString();
}

// =========================================================
// LAST MODIFIED
// =========================================================

const lastModified =
    document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent =
        `Last Modified: ${document.lastModified}`;
}