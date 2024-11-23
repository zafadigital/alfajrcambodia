document.addEventListener("DOMContentLoaded", () => {
  // Dynamically load static components (header, footer)
  const components = ["header", "footer"];
  components.forEach((component) => {
    fetch(`components/${component}.html`)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(component).innerHTML = data;
      })
      .catch((error) => console.error(`Error loading ${component}:`, error));
  });

  // Load Hero Section Data from JSON
  fetch("data/hero.json")
    .then((response) => response.json())
    .then((slides) => {
      const heroContainer = document.getElementById("hero");
      const heroHTML = `
        <section class="relative bg-primary text-white overflow-hidden">
          <div id="slider" class="relative w-full h-screen md:h-[675px]">
            ${slides
              .map(
                (slide, index) => `
              <div class="absolute inset-0 transition-opacity duration-700 ${
                index === 0 ? "opacity-100" : "opacity-0"
              } slide">
                <img src="${slide.desktop}" alt="${slide.alt}" class="hidden md:block w-full h-full object-cover">
                <img src="${slide.mobile}" alt="${slide.alt}" class="block md:hidden w-full h-full object-cover">
              </div>
            `
              )
              .join("")}
          </div>
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex slider-dots space-x-2">
            ${slides
              .map(
                (_, index) => `
              <div class="${index === 0 ? "active" : ""}"></div>
            `
              )
              .join("")}
          </div>
        </section>
      `;
      heroContainer.innerHTML = heroHTML;
    })
    .catch((error) => console.error("Error loading hero.json:", error));

  // Load Feature Cards Section Data from JSON
  fetch("data/feature-section.json")
    .then((response) => response.json())
    .then((data) => {
      const featureCardsContainer = document.getElementById("feature-cards");
      const featureCardsHTML = `
        <section class="relative bg-gray-100 py-12 pt-20 z-30">
          <div class="container mx-auto grid grid-cols-2 md:grid-cols-7 gap-6 max-w-[1440px]">
            ${data.features
              .map(
                (feature) => `
              <div class="text-center py-4 feature-card rounded-lg bg-white shadow-lg">
                <img src="${feature.image}" alt="${feature.title}" class="mx-auto mb-2 w-12 h-12">
                <h3 class="text-sm font-semibold">${feature.title}</h3>
              </div>
            `
              )
              .join("")}
          </div>
        </section>
      `;
      featureCardsContainer.innerHTML = featureCardsHTML;
    })
    .catch((error) => console.error("Error loading feature-section.json:", error));

  // Load About Section
  fetch("data/feature.json")
    .then((response) => response.json())
    .then((data) => {
      const featureContainer = document.getElementById("feature");
      const aboutHTML = `
        <section class="bg-gray-100 py-12">
          <div class="container mx-auto text-center max-w-[1440px]">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">${data.about.title}</h2>
            <p class="text-gray-600 mb-8">${data.about.description}</p>
          </div>
        </section>
      `;
      featureContainer.innerHTML = aboutHTML;
    })
    .catch((error) => console.error("Error loading feature.json:", error));

  // Load Packages Section Data from JSON
  fetch("data/packages.json")
    .then((response) => response.json())
    .then((packages) => {
      const packagesContainer = document.getElementById("packages");
      const packagesHTML = `
        <section class="py-12 bg-gray-100 fade-in mobile-padding">
          <div class="container mx-auto text-center max-w-[1440px]">
            <h2 class="text-3xl text-center font-bold mb-6">Umrah Packages</h2>
            <p class="text-gray-600 mb-8">
              Experience the spiritual journey of a lifetime with our exclusive Umrah packages.
              From luxury accommodations to guided tours, we ensure your trip is memorable and seamless.
            </p>
            <div class="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
              ${packages
                .map((pkg, index) => {
                  const isBig = index % 3 === 0;
                  const colSpan = isBig ? "md:col-span-6" : "md:col-span-3";
                  return `
                    <div class="col-span-12 ${colSpan} bg-white rounded-lg shadow-md overflow-hidden">
                      <a href="${pkg.link}" class="block">
                        <div class="relative w-full h-[280px]">
                          <img src="${pkg.image}" alt="${pkg.title}" class="w-full h-full object-cover">
                        </div>
                        <div class="p-4">
                          <h3 class="text-lg font-bold">${pkg.title}</h3>
                          <p class="text-sm text-gray-600 mb-2">${pkg.description}</p>
                          <p class="text-xl text-red-600 font-bold">${pkg.price} *</p>
                        </div>
                      </a>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        </section>
      `;
      packagesContainer.innerHTML = packagesHTML;
    })
    .catch((error) => console.error("Error loading packages.json:", error));
});
document.addEventListener("DOMContentLoaded", () => {
  // Load Header and Footer
  const components = ["header", "footer"];
  components.forEach((component) => {
    fetch(`components/${component}.html`)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(component).innerHTML = data;
      })
      .catch((error) => console.error(`Error loading ${component}.html`, error));
  });

  // Load Feature Cards
  fetch("components/feature-cards.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("feature").innerHTML = data;
    })
    .catch((error) => console.error("Error loading feature-cards.html:", error));

  // Load Umrah Journey Section
  fetch("components/umrah-journey.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("feature").insertAdjacentHTML("afterend", data);
    })
    .catch((error) => console.error("Error loading umrah-journey.html:", error));
});
