const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const url = "data/members.json";

// Fetch the member data
async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();
        displayMembers(members);

    } catch (error) {
        console.error(error);
    }
}

// Display member cards
function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("card");

        const logo = document.createElement("img");
        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} logo`;
        logo.loading = "lazy";
        logo.width = 120;
        logo.height = 120;

        const name = document.createElement("h2");
        name.textContent = member.name;

        const industry = document.createElement("p");
        industry.innerHTML = `<strong>Industry:</strong> ${member.industry}`;

        const address = document.createElement("p");
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

        const website = document.createElement("p");

        const link = document.createElement("a");
        link.href = member.website;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Visit Website";

        website.appendChild(link);

        const membership = document.createElement("p");

        let level = "";

        switch (member.membership) {
            case 1:
                level = "Member";
                break;
            case 2:
                level = "Silver";
                break;
            case 3:
                level = "Gold";
                break;
        }

        membership.innerHTML = `<strong>Membership:</strong> ${level}`;

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(industry);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        membersContainer.appendChild(card);
    });
}

// Toggle Grid View
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

// Toggle List View
listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

// Load data
getMembers();