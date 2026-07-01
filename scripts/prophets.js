const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector("#cards");

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();

    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {

    prophets.forEach((prophet) => {

        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const birthDate = document.createElement("p");
        const birthPlace = document.createElement("p");
        const portrait = document.createElement("img");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        birthDate.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;

        birthPlace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute(
            "alt",
            `Portrait of ${prophet.name} ${prophet.lastname}`
        );
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "320");
        portrait.setAttribute("height", "440");

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        cards.appendChild(card);

    });

}

getProphetData();