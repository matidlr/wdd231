const params = new URLSearchParams(window.location.search);

document.querySelector("#firstname").textContent =
    params.get("firstname");

document.querySelector("#lastname").textContent =
    params.get("lastname");

document.querySelector("#email").textContent =
    params.get("email");

document.querySelector("#phone").textContent =
    params.get("phone");

document.querySelector("#business").textContent =
    params.get("business");

document.querySelector("#timestamp").textContent =
    params.get("timestamp");