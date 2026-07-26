// Set the timestamp when the page loads
document.querySelector("#timestamp").value = new Date().toISOString();



const npModal = document.querySelector("#npModal");
const bronzeModal = document.querySelector("#bronzeModal");
const silverModal = document.querySelector("#silverModal");
const goldModal = document.querySelector("#goldModal");



document.querySelector("#npLink").addEventListener("click", (event) => {
    event.preventDefault();
    npModal.showModal();
});

document.querySelector("#bronzeLink").addEventListener("click", (event) => {
    event.preventDefault();
    bronzeModal.showModal();
});

document.querySelector("#silverLink").addEventListener("click", (event) => {
    event.preventDefault();
    silverModal.showModal();
});

document.querySelector("#goldLink").addEventListener("click", (event) => {
    event.preventDefault();
    goldModal.showModal();
});

document.querySelector("#closeNP").addEventListener("click", () => {
    npModal.close();
});

document.querySelector("#closeBronze").addEventListener("click", () => {
    bronzeModal.close();
});

document.querySelector("#closeSilver").addEventListener("click", () => {
    silverModal.close();
});

document.querySelector("#closeGold").addEventListener("click", () => {
    goldModal.close();
});

// =====================
// Close when clicking outside the dialog
// =====================

function enableOutsideClose(dialog) {
    dialog.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();

        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!inside) {
            dialog.close();
        }
    });
}

enableOutsideClose(npModal);
enableOutsideClose(bronzeModal);
enableOutsideClose(silverModal);
enableOutsideClose(goldModal);