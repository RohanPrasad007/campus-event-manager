document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!document.querySelector("#event-manager-nav-style")) {
    const navStyle = document.createElement("style");
    navStyle.id = "event-manager-nav-style";
    navStyle.textContent = "@media (max-width: 39.999rem) { .nav-links.show { display: flex; } }";
    document.head.appendChild(navStyle);
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      const isExpanded = navLinks.classList.contains("show");
      hamburger.setAttribute("aria-expanded", String(isExpanded));
    });

    // Close the mobile menu after a navigation link is selected.
    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  const eventsSection = document.querySelector("#events");
  const eventsList = document.querySelector(".events-grid-wrapper ul");

  let searchInput = null;
  let eventsData = [];

  if (eventsSection && eventsList) {
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "event-search";

    const searchLabel = document.createElement("label");
    searchLabel.htmlFor = "event-search";
    searchLabel.textContent = "Search events:";

    searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.id = "event-search";
    searchInput.placeholder = "Type an event name, venue, or keyword...";
    searchInput.setAttribute("aria-describedby", "event-search-help");

    const searchHelp = document.createElement("p");
    searchHelp.id = "event-search-help";
    searchHelp.textContent = "Results update as you type. Press Escape to clear.";
    searchHelp.className = "search-help";

    searchWrapper.append(searchLabel, searchInput, searchHelp);
    eventsSection.insertBefore(searchWrapper, eventsSection.querySelector(".events-grid-wrapper"));

    searchInput.addEventListener("input", () => {
      filterVisibleEvents(searchInput.value);
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        searchInput.value = "";
        filterVisibleEvents("");
        searchInput.blur();
      }
    });
  }

  function filterVisibleEvents(query) {
    if (!eventsList) return;

    const normalizedQuery = query.trim().toLowerCase();
    const cards = eventsList.querySelectorAll("li");

    cards.forEach((card) => {
      const matches = card.textContent.toLowerCase().includes(normalizedQuery);
      card.hidden = !matches;
    });

    let noResults = eventsSection.querySelector(".no-search-results");
    const anyVisible = Array.from(cards).some((card) => !card.hidden);

    if (!anyVisible && normalizedQuery) {
      if (!noResults) {
        noResults = document.createElement("p");
        noResults.className = "no-search-results";
        noResults.setAttribute("role", "status");
        eventsList.parentElement.appendChild(noResults);
      }
      noResults.textContent = `No events found for "${query.trim()}".`;
    } else if (noResults) {
      noResults.remove();
    }
  }

  // -------------------- B7: Fetch the data --------------------
  async function loadEvents() {
    if (!eventsList) return;

    const wrapper = eventsList.parentElement;
    const status = document.createElement("p");
    status.className = "events-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    wrapper.insertBefore(status, eventsList);

    status.textContent = "Loading events…";
    eventsList.hidden = true;

    try {
      const response = await fetch("events.json");

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The events file does not contain a list of events.");
      }

      eventsData = data;
      renderEvents(eventsData);
      status.textContent = data.length
        ? `Showing ${data.length} campus events.`
        : "There are no events scheduled right now.";
      eventsList.hidden = false;
      filterVisibleEvents(searchInput ? searchInput.value : "");
    } catch (error) {
      console.error("Could not load events:", error);
      status.textContent =
        "Sorry, events could not be loaded. Please check your connection and try again.";
      eventsList.hidden = false;
    }
  }

  function renderEvents(events) {
    if (!eventsList) return;

    eventsList.replaceChildren();

    events.forEach((eventItem) => {
      const listItem = document.createElement("li");
      const article = document.createElement("article");

      const heading = document.createElement("h3");
      heading.textContent = `${eventItem.icon || "📅"} ${eventItem.title}`;

      const dateParagraph = document.createElement("p");
      const dateLabel = document.createElement("strong");
      dateLabel.textContent = "Date: ";
      const time = document.createElement("time");
      time.dateTime = eventItem.dateISO || "";
      time.textContent = eventItem.date || "Date to be announced";
      dateParagraph.append(dateLabel, time);

      const timeParagraph = document.createElement("p");
      const timeLabel = document.createElement("strong");
      timeLabel.textContent = "Time: ";
      timeParagraph.append(timeLabel, document.createTextNode(eventItem.time || "To be announced"));

      const venueParagraph = document.createElement("p");
      const venueLabel = document.createElement("strong");
      venueLabel.textContent = "Venue: ";
      venueParagraph.append(venueLabel, document.createTextNode(eventItem.venue || "To be announced"));

      const description = document.createElement("p");
      description.textContent = eventItem.description || "";

      const rsvpButton = document.createElement("button");
      rsvpButton.type = "button";
      rsvpButton.className = "rsvp-button";
      rsvpButton.dataset.eventId = eventItem.id;
      rsvpButton.textContent = "RSVP / Register";

      article.append(heading, dateParagraph, timeParagraph, venueParagraph, description, rsvpButton);
      listItem.appendChild(article);
      eventsList.appendChild(listItem);
    });
  }

 
  if (eventsList) {
    eventsList.addEventListener("click", (event) => {
      const clickedElement = event.target;
      const rsvpButton = clickedElement.closest(".rsvp-button");

      if (!rsvpButton || !eventsList.contains(rsvpButton)) return;

      const selectedEvent = eventsData.find(
        (eventItem) => String(eventItem.id) === rsvpButton.dataset.eventId
      );

      if (!selectedEvent) return;

      const eventSelect = document.querySelector("#event");
      if (eventSelect) {
        const matchingOption = Array.from(eventSelect.options).find((option) => {
          const optionText = option.textContent.toLowerCase();
          const eventTitle = selectedEvent.title.toLowerCase();
          return optionText.includes(eventTitle) || eventTitle.includes(optionText);
        });

        if (matchingOption) {
          eventSelect.value = matchingOption.value;
        } else {
          const option = document.createElement("option");
          option.value = selectedEvent.id;
          option.textContent = selectedEvent.title;
          eventSelect.appendChild(option);
          eventSelect.value = option.value;
        }
      }

      const registration = document.querySelector("#registration");
      if (registration) {
        registration.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // -------------------- B8: Validate the form --------------------
  const registrationForm = document.querySelector("#registration form");

  if (registrationForm) {
    const nameInput = registrationForm.querySelector("#name");
    const rollInput = registrationForm.querySelector("#roll");
    const emailInput = registrationForm.querySelector("#email");
    const courseInput = registrationForm.querySelector("#course");
    const eventSelect = registrationForm.querySelector("#event");

    // Built-in HTML validation constraints.
    if (nameInput) {
      nameInput.required = true;
      nameInput.minLength = 2;
      nameInput.autocomplete = "name";
    }

    if (rollInput) {
      rollInput.required = true;
    }

    if (emailInput) {
      emailInput.required = true;
      emailInput.type = "email";
      emailInput.pattern = "[^\\s@]+@[^\\s@]+\\.[^\\s@]+";
      emailInput.title = "Enter an email address such as student@example.com.";
      emailInput.autocomplete = "email";
    }

    if (courseInput) {
      courseInput.required = true;
    }

    if (eventSelect) {
      eventSelect.required = true;
    }

    // Custom validation: student name must contain at least two non-space characters.
    if (nameInput) {
      nameInput.setCustomValidity("");

      nameInput.addEventListener("input", () => {
        const cleanName = nameInput.value.trim();
        if (cleanName.length < 2) {
          nameInput.setCustomValidity("Please enter a name with at least 2 characters.");
        } else {
          nameInput.setCustomValidity("");
        }
      });
    }

    registrationForm.addEventListener("submit", (event) => {
      // Trim the name before checking it, so spaces alone are not accepted.
      if (nameInput) {
        const cleanName = nameInput.value.trim();
        nameInput.setCustomValidity(
          cleanName.length < 2 ? "Please enter a name with at least 2 characters." : ""
        );
      }

      if (!registrationForm.checkValidity()) {
        event.preventDefault();
        registrationForm.reportValidity();
        return;
      }

      // This is a front-end demo; no server is connected to save registrations.
      event.preventDefault();

      let successMessage = registrationForm.querySelector(".form-success");
      if (!successMessage) {
        successMessage = document.createElement("p");
        successMessage.className = "form-success";
        successMessage.setAttribute("role", "status");
        successMessage.setAttribute("aria-live", "polite");
        registrationForm.appendChild(successMessage);
      }

      successMessage.textContent =
        "Your form passed validation. This demo does not send or save registrations yet.";
    });
  }

  // Load events after setting up the page interactions.
  loadEvents();
});
const searchInput = document.getElementById("eventSearch");
const eventItems = document.querySelectorAll(".events-grid-wrapper li");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

    eventItems.forEach(function (item) {
        const eventText = item.textContent.toLowerCase();

        if (eventText.includes(searchText)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
});
console.log(events[0].title);
console.log(events[events.length - 1].seats);
const jsonString = JSON.stringify(events, null, 2);
console.log(jsonString);

const parsedAgain = JSON.parse(jsonString);
console.log(JSON.stringify(parsedAgain) === JSON.stringify(events));
Promise.all([
    fetch("events.json").then(response => response.text()),
    fetch("events.xml").then(response => response.text())
]).then(([jsonText, xmlText]) => {
    console.log("JSON Size:", new Blob([jsonText]).size, "bytes");
    console.log("XML Size:", new Blob([xmlText]).size, "bytes");

    if (jsonText.length > xmlText.length) {
        console.log("JSON file is larger.");
    } else {
        console.log("XML file is larger.");
    }
});

