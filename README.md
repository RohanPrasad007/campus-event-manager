# IIIT Vadodara — Campus Event Manager

A responsive, accessible, and modern web application portal for discovering, registering, and managing campus events at the Indian Institute of Information Technology Vadodara (IIIT Vadodara).

Developed as part of the **MCA Semester 1 — Web Development Lab (P5)**.

---

## 👥 Project Team

| Role | Name | Student ID |
| :--- | :--- | :--- |
| **Team Leader** | Rohan Prasad | `20261651074` |
| **Member 1** | Khushi Sharma | `20261651050` |
| **Member 2** | Abhijeet Garg | `20261651001` |
| **Member 3** | Kashish | `20261651049` |
| **Member 4** | Ayush Chandra | `20261651026` |

---

## 🌟 Key Features & Architectural Highlights

### 1. Semantic HTML5 Foundation
* Semantic page regions: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, and `<footer>`.
* Structured event cards wrapped in `<article>` tags with microdata `<time>` elements.
* Accessible skip-to-content mechanism (`<a href="#main" class="skip">`) for keyboard navigation.

### 2. Design System & CSS Custom Properties (`:root`)
* Centralized color palette defined in `:root` tokens:
  * `--brand`: Primary blue (`#2563eb`)
  * `--accent`: Ocean cyan (`hsl(199, 89%, 48%)`)
  * `--ink`: Deep slate body text (`rgb(15, 23, 42)`)
  * `--paper`: Canvas background (`rgb(248, 250, 252)`)
  * `--surface`: Card background (`rgb(255, 255, 255)`)
* Color forms demonstrated: **Hex**, **rgb()**, **hsl()**, and semi-transparent alpha overlays (`rgb(0 0 0 / 40%)`).
* Complete dark theme support via [theme-dark.css](theme-dark.css).

### 3. Relative Units & Fluid Typography
* Relative units throughout: `rem` for typography and spacing; `%` and `vw` for fluid dimensions.
* Hairline borders preserved in `px` (`1px` / `2px`).
* Mathematical computation with `calc(100% - 2rem)` for clean input sizing.
* Fluid typography using `clamp(1.5rem, 4vw, 3rem)` for headings that scale smoothly without media queries.
* Reading comfort capped with `max-width: 65ch` on body paragraphs.

### 4. Universal Box Model (`border-box`)
* Universal reset: `* { box-sizing: border-box; }` at line 1 of the stylesheet.
* Predictable layout sizing: padding and borders are absorbed inside declared element dimensions, preventing horizontal scrollbars and layout breaking.

### 5. CSS Grid Page Layout (`grid-template-areas`)
* Top-level regions mapped cleanly using named grid areas:
  ```css
  grid-template-areas:
    "header"
    "nav"
    "main"
    "footer";
  ```
* Seamless multi-column expansion on wide screens (`min-width: 64rem`).

### 6. Responsive Card Grid (Zero Media Queries)
* The upcoming events list reflows natively using CSS Grid's intrinsic calculation:
  ```css
  .events-grid-wrapper ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 1.5rem;
  }
  ```
* Columns smoothly adapt from 4 $\to$ 3 $\to$ 2 $\to$ 1 as the viewport narrows, with **no `@media` queries**.

### 7. Mobile-First Navigation
* **Mobile (< 40rem / 640px)**: The navigation table is tucked away (`display: none;`), displaying an accessible 3-bar hamburger button (`.hamburger`).
* **Tablet & Desktop (≥ 40rem)**: The hamburger button automatically hides (`display: none;`), and the full navigation row is revealed (`display: flex; gap: 16px;`).

---

## 📁 Project Structure

```plaintext
.
├── index.html          # Main HTML5 portal document
├── style.css           # Primary production stylesheet (design tokens, grid, components)
├── base.css            # Base stylesheet with foundational resets and layout
├── theme-dark.css      # Dark mode variant stylesheet
├── notes.txt           # Project team member roster
├── 1st.jpeg            # Campus gallery image 1
├── 2nd.jpeg            # Campus gallery image 2
├── 3rd.jpeg            # Campus gallery image 3
├── 4th.jpeg            # Campus gallery image 4
├── iiit-logo.png       # Official IIIT Vadodara emblem
├── favicon-website.png # Website browser favicon
└── README.md           # Project documentation
```

---

## 🚀 Getting Started & How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/RohanPrasad007/campus-event-manager.git
cd campus-event-manager
```

### 2. Launch the Application
This is a pure vanilla web application that requires no build tools or package installations. Run it using any of the following methods:

* **Method 1: Direct File Open**
  ```bash
  # On macOS
  open index.html

  # On Windows
  start index.html

  # On Linux
  xdg-open index.html
  ```
  *(Or simply double-click `index.html` to open it in your default browser).*

* **Method 2: Local HTTP Server (Recommended)**
  ```bash
  # Using Python built-in server
  python3 -m http.server 8000

  # Or using npx
  npx serve .
  ```
  Then open [`http://localhost:8000`](http://localhost:8000) in your browser.

* **Method 3: VS Code Live Server**
  Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 📱 Responsive Breakpoints & Testing

* **Mobile Viewports (< 640px / 40rem)**:
  * Single-column stacked layout.
  * Hamburger menu icon active.
  * Cards scale down safely with `min(100%, 15rem)`.
* **Tablet Viewports (640px – 1024px)**:
  * Full horizontal navigation bar displayed.
  * Events cards reflow into 2 or 3 balanced columns.
* **Desktop Viewports (≥ 1024px / 64rem)**:
  * Full 4-column card grid.
  * Page container capped with `width: min(90%, 60rem)` and centered with `margin: 0 auto`.

---

## 📄 Validation & Standards
* **W3C CSS Level 3 Validation**: Compliant syntax with zero parse errors.
* **Semantic HTML5**: Fully validated document structure.
* **WCAG 2.1 Accessibility**: High-contrast color choices, skip-to-content link, keyboard focus outlines, and visible interactive hover states.
