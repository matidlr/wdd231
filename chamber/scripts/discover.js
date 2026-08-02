import { items } from '../data/items.mjs';

document.addEventListener('DOMContentLoaded', () => {
  displayCards(items);
  handleLastVisitMessage();
  setFooterDates();
});

// Build 8 Cards with required elements: h2, figure, address, p, button
function displayCards(data) {
  const container = document.getElementById('discover-cards');
  container.innerHTML = '';

  data.forEach((item, index) => {
    const card = document.createElement('article');
    card.classList.add('card', `card-${index + 1}`); // Assigns card-1 through card-8 for grid-area targeting

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    `;

    container.appendChild(card);
  });
}

// LocalStorage Visit Tracker
function handleLastVisitMessage() {
  const messageArea = document.getElementById('visit-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisitDate');

  if (!lastVisit) {
    messageArea.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = now - parseInt(lastVisit, 10);
    const msInDay = 86400000; // 1000 * 60 * 60 * 24

    if (timeDifference < msInDay) {
      messageArea.textContent = "Back so soon! Awesome!";
    } else {
      const daysBetween = Math.floor(timeDifference / msInDay);
      const dayLabel = daysBetween === 1 ? "day" : "days";
      messageArea.textContent = `You last visited ${daysBetween} ${dayLabel} ago.`;
    }
  }

  // Update last visit timestamp
  localStorage.setItem('lastVisitDate', now.toString());
}

function setFooterDates() {
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
}