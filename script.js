const sampleEventTitle = "Tech Fest - Innovision"; // string
const totalEventSeats = 100;                      // number
const isEventOnline = false;                      // boolean

let sampleSeatsLeft = 50;                         // let when value needs to change
sampleSeatsLeft = sampleSeatsLeft - 1;            // reassignment demonstration

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
// A4: Decide with control flow
// Evaluates availability based on seat numbers: "Full", "Few left", or "Open".
// ------------------------------------------------------------------------------
function getSeatStatus(seats) {
  if (seats === 0) {
    return "Full";
  } else if (seats < 5) {
    return "Few left";
  } else {
    return "Open";
  }
}


console.log("--- [A5] Processing events with for...of loop ---");
for (const ev of events) {
  const status = getSeatStatus(ev.seats);
  console.log(`[for...of] Title: ${ev.title} | Seats: ${ev.seats} (${status}) | Online: ${ev.online}`);
}


function formatEvent(ev) {
  const status = getSeatStatus(ev.seats);
  const mode = ev.online ? "Online" : "In-Person";
  return `${ev.title} | Date: ${ev.date} | Seats: ${ev.seats} (${status}) | Mode: ${mode}`;
}

const singleFormattedExample = formatEvent(events[0]);
console.log("--- [A6] Single Formatted Event:", singleFormattedExample);


const mappedEvents = events.map((ev) => formatEvent(ev));
console.log("--- [A7] Mapped Events with Arrow Function:", mappedEvents);

const availableEvents = events.filter((ev) => ev.seats > 0);
console.log(`--- [A7] Available Events (${availableEvents.length} open):`, availableEvents.map((ev) => ev.title));


function demonstrateScope() {
  const functionScopedConst = "I am private to this function";
  return functionScopedConst;
}
demonstrateScope();





function createEventCard(eventItem) {
  const listItem = document.createElement("li");
  const article = document.createElement("article");

  const seatStatus = getSeatStatus(eventItem.seats);

  // Reflect state: add full class if no seats remain (B3)
  if (eventItem.seats === 0) {
    listItem.classList.add("full");
  }

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
  const seatsText = document.createTextNode(`${eventItem.seats} (${seatStatus})`);
  seatsParagraph.append(seatsLabel, seatsText);

  // Visual styling reflection (B3)
  if (eventItem.seats === 0) {
    seatsParagraph.style.color = "var(--ink-muted)";
  }

  // 6. Mode (Online / In-Person)
  const modeParagraph = document.createElement("p");
  const modeLabel = document.createElement("strong");
  modeLabel.textContent = "Mode: ";
  modeParagraph.append(modeLabel, document.createTextNode(eventItem.online ? "Online" : "In-Person"));

  // 7. Description
  const description = document.createElement("p");
  description.textContent = eventItem.description || "";

  // 8. RSVP Button
  const rsvpButton = document.createElement("button");
  rsvpButton.type = "button";
  rsvpButton.className = "rsvp-button";
  rsvpButton.dataset.eventId = eventItem.id;

  if (eventItem.seats === 0) {
    rsvpButton.disabled = true;
    rsvpButton.setAttribute("aria-disabled", "true"); // setAttribute (B3)
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
 * Render events into the grid wrapper by mapping the array of objects (B2)
 */
function renderEvents(itemsToRender = events) {
  const eventsList = document.querySelector(".events-grid-wrapper ul");
  if (!eventsList) return;

  // Transform each event into its DOM element using .map()
  const eventCards = itemsToRender.map(createEventCard);
  eventsList.replaceChildren(...eventCards);
}


function renderEventDropdownOptions(itemsToRender = events) {
  const eventSelect = document.querySelector("#event");
  if (!eventSelect) return;

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

async function loadEventsFromJSON() {
  const eventsList = document.querySelector(".events-grid-wrapper ul");
  if (!eventsList) return;

  const wrapper = eventsList.parentElement;
  let statusEl = wrapper.querySelector(".events-status");
  if (!statusEl) {
    statusEl = document.createElement("p");
    statusEl.className = "events-status";
    statusEl.setAttribute("role", "status");
    statusEl.setAttribute("aria-live", "polite");
    wrapper.insertBefore(statusEl, eventsList);
  }

  // State 1: Loading
  statusEl.textContent = "Loading events…";

  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: Expected array of events");
    }

    // State 2: Success
    renderEvents(data);
    renderEventDropdownOptions(data);
    statusEl.textContent = `Showing ${data.length} campus events loaded from JSON.`;
  } catch (error) {
    // State 3: Failure
    console.warn("Async fetch notice (using single source of truth fallback):", error.message);
    statusEl.textContent = "Displaying campus events from local data model.";
    renderEvents(events);
    renderEventDropdownOptions(events);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  // B1: Select elements with querySelector / querySelectorAll & getElementById
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const searchInput = document.getElementById("eventSearch");
  const eventsList = document.querySelector(".events-grid-wrapper ul");
  const registrationForm = document.querySelector("#registration form");

  // Dynamic responsive style hook for mobile menu toggle
  if (!document.querySelector("#event-manager-nav-style")) {
    const navStyle = document.createElement("style");
    navStyle.id = "event-manager-nav-style";
    navStyle.textContent = "@media (max-width: 39.999rem) { .nav-links.show { display: flex; } }";
    document.head.appendChild(navStyle);
  }

  // B4: Wire up a click — hamburger toggles navigation links with classList.toggle
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

  // Initialize events view: First render from Single Source of Truth, then try async load (B7)
  renderEvents(events);
  renderEventDropdownOptions(events);
  loadEventsFromJSON();

  // B6: React to typing — input listener on search box & Escape keydown to clear
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();

      // Filter events using arrow function (A7)
      const filtered = events.filter((ev) => {
        const titleMatch = ev.title.toLowerCase().includes(query);
        const venueMatch = (ev.venue || "").toLowerCase().includes(query);
        const descMatch = (ev.description || "").toLowerCase().includes(query);
        const modeMatch = (ev.online ? "online" : "in-person").includes(query);
        return titleMatch || venueMatch || descMatch || modeMatch;
      });

      renderEvents(filtered);

      const eventsWrapper = document.querySelector(".events-grid-wrapper");
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

  // B5: Use the event object — read event.target to know which RSVP button was clicked
  if (eventsList) {
    eventsList.addEventListener("click", (event) => {
      // event.target tells us the exact element that triggered the event (delegation)
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

  if (registrationForm) {
    const nameInput = registrationForm.querySelector("#name");
    const rollInput = registrationForm.querySelector("#roll");
    const emailInput = registrationForm.querySelector("#email");
    const courseInput = registrationForm.querySelector("#course");
    const eventSelect = registrationForm.querySelector("#event");

    // Built-in checks
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

    // Custom validation: Name must contain >= 2 non-whitespace characters
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

    // Submit handler
    registrationForm.addEventListener("submit", (event) => {
      if (nameInput) {
        const cleanName = nameInput.value.trim();
        nameInput.setCustomValidity(
          cleanName.length < 2 ? "Please enter a name with at least 2 characters." : ""
        );
      }

      // Block invalid submission
      if (!registrationForm.checkValidity()) {
        event.preventDefault();
        registrationForm.reportValidity();
        return;
      }

      // Valid submission handling
      event.preventDefault();

      let successMessage = registrationForm.querySelector(".form-success");
      if (!successMessage) {
        successMessage = document.createElement("p");
        successMessage.className = "form-success";
        successMessage.setAttribute("role", "status");
        successMessage.setAttribute("aria-live", "polite");
        registrationForm.appendChild(successMessage);
      }

      const selectedTitle = eventSelect.options[eventSelect.selectedIndex]?.text || "the event";
      successMessage.textContent = `Your registration form passed validation! Successfully registered for ${selectedTitle}.`;
    });
  }
});



// B9 & JSON/XML B2: Read one value via dot and index notation
console.log("--- [JSON B2] First Event Title:", events[0].title);
console.log("--- [JSON B2] Last Event Seats:", events[events.length - 1].seats);

// JSON/XML B3: Round-trip serialization & deserialization (Object -> text -> object)
const jsonString = JSON.stringify(events, null, 2);
console.log("--- [JSON B3] Serialized JSON String (sample):", jsonString.slice(0, 150) + "...\n");

const parsedAgain = JSON.parse(jsonString);
const isRoundTripIdentical = JSON.stringify(parsedAgain) === JSON.stringify(events);
console.log("--- [JSON B3] Round-trip Match (parsedAgain === events):", isRoundTripIdentical);

// JSON/XML B4 & B5: Read XML using DOMParser and benchmark byte sizes
Promise.all([
  fetch("events.json").then((response) => response.text()),
  fetch("events.xml").then((response) => response.text())
])
  .then(([jsonText, xmlText]) => {
    // B5: Size comparison
    const jsonSize = new Blob([jsonText]).size;
    const xmlSize = new Blob([xmlText]).size;
    console.log(`--- [JSON/XML B5] File Sizes: JSON = ${jsonSize} bytes | XML = ${xmlSize} bytes`);

    if (jsonSize > xmlSize) {
      console.log("JSON file is larger.");
    } else {
      console.log("XML file is larger (due to repeated opening and closing tags and verbose markup).");
    }

    // B4: Parse XML with DOMParser and extract the first title
    const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");
    const firstTitleEl = xmlDoc.getElementsByTagName("title")[0];
    const xmlTitleP = document.getElementById("xmlTitle");
    if (xmlTitleP && firstTitleEl) {
      xmlTitleP.textContent = `First XML Event: ${firstTitleEl.textContent}`;
    }
  })
  .catch((err) => {
    console.log("Note on fetch (e.g. running via file:// protocol):", err.message);
  });
