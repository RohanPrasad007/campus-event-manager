/**
 * ==============================================================================
 * IIIT Vadodara — Campus Event Manager
 * Web Development Lab (P5)
 * ==============================================================================
 *
 * 1. Single Source of Truth: The `events` array of objects models the event data.
 *    Each object contains:
 *      - title: string
 *      - date: string (YYYY-MM-DD)
 *      - seats: number
 *      - online: boolean
 *    along with metadata (id, icon, time, venue, description) to build the page.
 *
 * 2. Mapping Events: Uses Array.prototype.map to:
 *      - Map each event object to HTML card DOM elements on the page.
 *      - Map each event to <option> elements in the registration dropdown.
 *      - Map events into formatted strings via formatEvent(ev).
 *      - Map events into summary data objects.
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. DATA MODEL (Single Source of Truth)
// ------------------------------------------------------------------------------
const events = [
  {
    id: "tech-fest",
    icon: "💻",
    title: "Tech Fest - Innovision",
    date: "2026-09-12",
    time: "10:00 AM",
    venue: "Main Auditorium",
    seats: 12,
    online: false,
    description: "Annual technical festival featuring coding contests, robotics demonstrations and project exhibitions."
  },
  {
    id: "cultural-night",
    icon: "🎤",
    title: "Cultural Night - Rangmanch",
    date: "2026-09-20",
    time: "6:00 PM",
    venue: "Open Air Theatre",
    seats: 4,
    online: false,
    description: "An evening of music, dance and drama performances presented by students."
  },
  {
    id: "sports-meet",
    icon: "🏆",
    title: "Inter-Hostel Sports Meet",
    date: "2026-09-28",
    time: "8:00 AM",
    venue: "College Sports Ground",
    seats: 0,
    online: false,
    description: "Students compete in cricket, football, athletics and other exciting sports."
  },
  {
    id: "ai-lecture",
    icon: "🤖",
    title: "Guest Lecture on Artificial Intelligence",
    date: "2026-10-05",
    time: "11:00 AM",
    venue: "Seminar Hall 1 / Online",
    seats: 50,
    online: true,
    description: "An industry expert discusses recent developments and trends in AI and ML."
  },
  {
    id: "hackathon",
    icon: "⚡",
    title: "Coding Hackathon - CodeStorm",
    date: "2026-10-15",
    time: "10:00 AM",
    venue: "Computer Lab 2",
    seats: 100,
    online: false,
    description: "A 24-hour hackathon where students work in teams to build innovative projects and solve real-world problems."
  },
  {
    id: "web-workshop",
    icon: "🌐",
    title: "Workshop on Web Development",
    date: "2026-10-22",
    time: "11:00 AM",
    venue: "Computer Lab 1 / Online",
    seats: 25,
    online: true,
    description: "A hands-on beginner-friendly workshop covering HTML, CSS and JavaScript."
  },
  {
    id: "photography",
    icon: "📸",
    title: "Photography Exhibition - Frames",
    date: "2026-10-30",
    time: "2:00 PM",
    venue: "Central Lawn",
    seats: 40,
    online: false,
    description: "An exhibition showcasing photographs captured by students on different themes."
  },
  {
    id: "alumni-meet",
    icon: "🎓",
    title: "Annual Alumni Meet",
    date: "2026-11-08",
    time: "10:00 AM",
    venue: "Main Auditorium",
    seats: 150,
    online: false,
    description: "A gathering where alumni interact with current students and share their experiences and career journeys."
  }
];

// ------------------------------------------------------------------------------
// 2. LOGIC PACKAGING & MAPPING FUNCTIONS
// ------------------------------------------------------------------------------

/**
 * Helper to determine availability based on seats (Control Flow)
 */
function getSeatStatus(seats) {
  if (seats === 0) {
    return "Full";
  } else if (seats < 5) {
    return "Few left";
  } else {
    return "Open";
  }
}

/**
 * Format a single event into a readable one-line string.
 */
function formatEvent(ev) {
  const status = getSeatStatus(ev.seats);
  const mode = ev.online ? "Online" : "In-Person";
  return `${ev.title} | Date: ${ev.date} | Seats: ${ev.seats} (${status}) | Mode: ${mode}`;
}

// Map the events array to formatted strings
const mappedEvents = events.map(formatEvent);
console.log("Mapped Events (formatted strings):", mappedEvents);

// Map the events array to summary data objects
const mappedEventSummaries = events.map((ev) => ({
  title: ev.title,
  date: ev.date,
  seats: ev.seats,
  online: ev.online,
  status: getSeatStatus(ev.seats)
}));
console.log("Mapped Event Summaries:", mappedEventSummaries);

/**
 * Map an event object into a DOM card (<li><article>...</article></li>)
 */
function createEventCard(eventItem) {
  const listItem = document.createElement("li");
  const article = document.createElement("article");

  const seatStatus = getSeatStatus(eventItem.seats);

  // 1. Heading
  const heading = document.createElement("h3");
  heading.textContent = `${eventItem.icon || "📅"} ${eventItem.title}`;

  // 2. Date
  const dateParagraph = document.createElement("p");
  const dateLabel = document.createElement("strong");
  dateLabel.textContent = "Date: ";
  const timeEl = document.createElement("time");
  timeEl.dateTime = eventItem.date;
  timeEl.textContent = eventItem.date;
  dateParagraph.append(dateLabel, timeEl);

  // 3. Time
  const timeParagraph = document.createElement("p");
  const timeLabel = document.createElement("strong");
  timeLabel.textContent = "Time: ";
  timeParagraph.append(timeLabel, document.createTextNode(eventItem.time || "To be announced"));

  // 4. Venue
  const venueParagraph = document.createElement("p");
  const venueLabel = document.createElement("strong");
  venueLabel.textContent = "Venue: ";
  venueParagraph.append(
    venueLabel,
    document.createTextNode(eventItem.venue || (eventItem.online ? "Online" : "To be announced"))
  );

  // 5. Seats & Status
  const seatsParagraph = document.createElement("p");
  const seatsLabel = document.createElement("strong");
  seatsLabel.textContent = "Seats: ";
  seatsParagraph.append(seatsLabel, document.createTextNode(`${eventItem.seats} (${seatStatus})`));

  // 6. Mode (Online / In-Person)
  const modeParagraph = document.createElement("p");
  const modeLabel = document.createElement("strong");
  modeLabel.textContent = "Mode: ";
  modeParagraph.append(modeLabel, document.createTextNode(eventItem.online ? "Online" : "In-Person"));

  // 7. Description
  const description = document.createElement("p");
  description.textContent = eventItem.description || "";

  // 8. RSVP / Action Button
  const rsvpButton = document.createElement("button");
  rsvpButton.type = "button";
  rsvpButton.className = "rsvp-button";
  rsvpButton.dataset.eventId = eventItem.id;

  if (eventItem.seats === 0) {
    rsvpButton.disabled = true;
    rsvpButton.textContent = "Event Full";
  } else {
    rsvpButton.textContent = "RSVP / Register";
  }

  article.append(
    heading,
    dateParagraph,
    timeParagraph,
    venueParagraph,
    seatsParagraph,
    modeParagraph,
    description,
    rsvpButton
  );

  listItem.appendChild(article);
  return listItem;
}

/**
 * Render the event cards into the DOM by mapping the events array.
 * This ensures the array of objects is the single source of truth the page is built from.
 */
function renderEvents(itemsToRender = events) {
  const eventsList = document.querySelector(".events-grid-wrapper ul");
  if (!eventsList) return;

  // Use Array.prototype.map to transform event objects into card DOM elements
  const eventCards = itemsToRender.map(createEventCard);
  eventsList.replaceChildren(...eventCards);
}

/**
 * Map the events array to populate the registration dropdown options (<select id="event">).
 */
function renderEventDropdownOptions(itemsToRender = events) {
  const eventSelect = document.querySelector("#event");
  if (!eventSelect) return;

  // Map each event object to an HTML <option> element
  const options = itemsToRender.map((ev) => {
    const option = document.createElement("option");
    option.value = ev.id;
    option.textContent = `${ev.title} (${ev.online ? "Online" : "In-Person"})${
      ev.seats === 0 ? " - [Full]" : ""
    }`;
    if (ev.seats === 0) {
      option.disabled = true;
    }
    return option;
  });

  eventSelect.replaceChildren(...options);
}

// ------------------------------------------------------------------------------
// 3. DOM INITIALIZATION & USER INTERACTIONS
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Menu Navigation Toggle
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

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Build the page from the single source of truth (events array)
  renderEvents(events);
  renderEventDropdownOptions(events);

  // Setup Search Filter
  const searchInput = document.getElementById("eventSearch");
  const eventsWrapper = document.querySelector(".events-grid-wrapper");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();

      // Filter events based on title, venue, description, or mode
      const filtered = events.filter((ev) => {
        const titleMatch = ev.title.toLowerCase().includes(query);
        const venueMatch = (ev.venue || "").toLowerCase().includes(query);
        const descMatch = (ev.description || "").toLowerCase().includes(query);
        const modeMatch = (ev.online ? "online" : "in-person").includes(query);
        return titleMatch || venueMatch || descMatch || modeMatch;
      });

      // Map and render the filtered events
      renderEvents(filtered);

      let noResults = document.querySelector(".no-search-results");
      if (filtered.length === 0 && query) {
        if (!noResults) {
          noResults = document.createElement("p");
          noResults.className = "no-search-results";
          noResults.setAttribute("role", "status");
          eventsWrapper?.appendChild(noResults);
        }
        noResults.textContent = `No events found for "${searchInput.value.trim()}".`;
      } else if (noResults) {
        noResults.remove();
      }
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        renderEvents(events);
        const noResults = document.querySelector(".no-search-results");
        if (noResults) noResults.remove();
        searchInput.blur();
      }
    });
  }

  // Setup RSVP Button Clicks: smooth scroll and auto-select in form
  const eventsList = document.querySelector(".events-grid-wrapper ul");
  if (eventsList) {
    eventsList.addEventListener("click", (event) => {
      const rsvpButton = event.target.closest(".rsvp-button");
      if (!rsvpButton || !eventsList.contains(rsvpButton)) return;

      const selectedEvent = events.find((ev) => ev.id === rsvpButton.dataset.eventId);
      if (!selectedEvent || selectedEvent.seats === 0) return;

      const eventSelect = document.querySelector("#event");
      if (eventSelect) {
        eventSelect.value = selectedEvent.id;
      }

      const registration = document.querySelector("#registration");
      if (registration) {
        registration.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // Registration Form Validation
  const registrationForm = document.querySelector("#registration form");
  if (registrationForm) {
    const nameInput = registrationForm.querySelector("#name");
    const rollInput = registrationForm.querySelector("#roll");
    const emailInput = registrationForm.querySelector("#email");
    const courseInput = registrationForm.querySelector("#course");
    const eventSelect = registrationForm.querySelector("#event");

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
        "Your form passed validation. Registration successfully recorded for " +
        (eventSelect.options[eventSelect.selectedIndex]?.text || "the event") +
        "!";
    });
  }
});

// ------------------------------------------------------------------------------
// 4. LAB ASSIGNMENT DATA CHECKS & VERIFICATIONS
// ------------------------------------------------------------------------------

// Read single values via dot and index notation
console.log(events[0].title);
console.log(events[events.length - 1].seats);

// Serialize to JSON and parse back to verify single source of truth consistency
const jsonString = JSON.stringify(events, null, 2);
console.log(jsonString);

const parsedAgain = JSON.parse(jsonString);
console.log(JSON.stringify(parsedAgain) === JSON.stringify(events));

// Comparison between JSON and XML representations
Promise.all([
  fetch("events.json").then((response) => response.text()),
  fetch("events.xml").then((response) => response.text())
])
  .then(([jsonText, xmlText]) => {
    console.log("JSON Size:", new Blob([jsonText]).size, "bytes");
    console.log("XML Size:", new Blob([xmlText]).size, "bytes");

    if (jsonText.length > xmlText.length) {
      console.log("JSON file is larger.");
    } else {
      console.log("XML file is larger.");
    }

    const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");
    const firstTitleEl = xmlDoc.getElementsByTagName("title")[0];
    const xmlTitleP = document.getElementById("xmlTitle");
    if (xmlTitleP && firstTitleEl) {
      xmlTitleP.textContent = `First XML Event: ${firstTitleEl.textContent}`;
    }
  })
  .catch((err) => {
    console.log("Note on fetch (e.g. file:// protocol):", err.message);
  });
