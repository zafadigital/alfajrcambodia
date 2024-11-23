**Alfajr Cambodia Website**
This is the repository for the Alfajr Cambodia Website project, built with modular HTML components, Tailwind CSS for styling, and JavaScript for interactivity.

**Project Structure**
plaintext
Copy code

project/
│
├── index.html                # Main entry point (HTML file)
├── components/               # Contains reusable HTML components
│   ├── header.html           # Header component
│   ├── footer.html           # Footer component
│   ├── hero.html             # Hero section component
│   ├── about.html            # About section component
│   ├── packages.html         # Packages section component
│
├── assets/                   # Assets folder for images, CSS, and JavaScript
│   ├── css/
│   │   └── styles.css        # CSS for styling the website
│   ├── js/
│   │   ├── main.js           # JavaScript for loading components
│   │   ├── slide.js          # JavaScript for slider functionality
│   └── images/               # Images and icons used in the project
│
└── README.md                 # Documentation for the project

**Features**
Modular Components: Reusable HTML components for easy maintenance and updates.
Responsive Design: Tailwind CSS ensures a mobile-friendly and responsive layout.
Dynamic Content Loading: JavaScript dynamically loads components like header, footer, and sections.
Interactive Slider: Smooth auto-slider with dot navigation support.
Modern Styling: Tailwind CSS for consistent and clean styling.
Multi-Language Ready: Easily extensible for language detection and localization.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/alfajr-cambodia.git
cd alfajr-cambodia
Open the project in any browser:

bash
Copy code
open index.html
Development
Prerequisites
Basic knowledge of HTML, CSS, and JavaScript.
A modern browser (e.g., Chrome, Firefox, Edge).
Customization
Add Components:

Add new components in the components/ folder (e.g., contact.html).
Reference them in index.html by their ID and load them dynamically.
Update Styles:

Modify or add styles in assets/css/styles.css.
Enhance JavaScript:

Add new interactivity in assets/js/main.js.
Usage
To Add New Components:

Create a new .html file inside the components/ folder.
Use the id of the new component in index.html and load it dynamically via main.js.
To Modify the Slider:

Update slide content in the hero.html component.
Adjust slide interval or transitions in assets/js/slide.js.
Slider Instructions
The slider functionality is handled by the slide.js file:

Auto-slides every 5 seconds.
Supports navigation dots (if present in the HTML).
Example:
html
Copy code
<div class="slider-dots">
  <div class="active"></div>
  <div></div>
</div>
Contribution
Feel free to contribute to the project by submitting a pull request or reporting issues.

License
This project is licensed under the MIT License. See the LICENSE file for details.
