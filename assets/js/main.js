document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();
    loadAllPackageDetails();
    loadGlobalDetails();
});

// Function to load header and footer
function loadHeaderFooter() {
    fetch("components/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header").innerHTML = data;
        });

    fetch("components/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer").innerHTML = data;
        });
}

// Function to fetch and combine data from multiple JSON files
function loadAllPackageDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get("id");

    const sources = [
        "assets/js/data.json",
        "assets/js/umrah-holiday.json",
        "assets/js/umrah-package.json",
    ];

    // Fetch all JSON files and combine the data
    Promise.all(sources.map((src) => fetch(src).then((res) => res.json())))
        .then((allData) => {
            const combinedData = allData.flatMap((data) => data.packages || []);
            const selectedPackage = combinedData.find((pkg) => pkg.id === packageId);

            if (selectedPackage) {
                renderPackageDetails(selectedPackage);

                // Dynamically load itinerary based on package itinerary ID
                const itineraryId = selectedPackage.itineraryId || "default-itinerary";
                loadItinerary(itineraryId);

                // Render terms and cancellation if available
                if (selectedPackage.terms || selectedPackage.cancellation) {
                    renderTermsAndCancellation(selectedPackage);
                }
            } else {
                console.error("Package not found for the given ID:", packageId);
                document.getElementById("details-container").innerHTML =
                    "<p class='text-gray-600'>Package not found.</p>";
            }
        })
        .catch((error) => console.error("Error fetching package data:", error));
}

// Function to render terms and cancellation
function renderTermsAndCancellation(pkg) {
    const detailsContainer = document.getElementById("details-container");

    const termsSection = pkg.terms ?
        `
    <div class="mt-8 space-y-8">
      <h2 class="text-xl font-bold text-gray-800">Terms and Conditions</h2>
      <ul class="text-gray-600 mt-2 text-sm list-disc list-inside">
        ${pkg.terms.map((term) => `<li>${term}</li>`).join("")}
      </ul>
    </div>` :
        "";

    const cancellationSection = pkg.cancellation ?
        `
    <div class="mt-8 space-y-8">
      <h2 class="text-xl font-bold text-gray-800">Cancellation Policy</h2>
      <ul class="text-gray-600 mt-2 text-sm list-disc list-inside">
        ${pkg.cancellation.map((policy) => `<li>${policy}</li>`).join("")}
      </ul>
    </div>` :
        "";

    // Append the sections
    detailsContainer.innerHTML += termsSection + cancellationSection;
}

// Function to load itinerary
function loadItinerary(itineraryId) {
    fetch(`assets/js/itineraries/${itineraryId}.json`)
        .then((response) => response.json())
        .then((itinerary) => {
            const itineraryList = document.getElementById("itinerary-list");
            itineraryList.innerHTML = itinerary
                .map((item) => `<li>${item}</li>`)
                .join("");
        })
        .catch((error) => {
            console.error("Error loading itinerary:", error);
            document.getElementById("itinerary-section").innerHTML =
                "<p class='text-gray-600'>Itinerary not available.</p>";
        });
}

// Fetch global details for fallback terms and conditions
function loadGlobalDetails() {
    fetch("assets/js/data.json")
        .then((response) => response.json())
        .then((data) => {
            if (data.global) renderTermsAndCancellation(data.global);
        })
        .catch((error) =>
            console.error("Error fetching global terms and cancellation:", error)
        );
}

// Fetch global details for fallback terms and conditions
function loadGlobalDetails() {
    fetch("assets/js/umrah-holiday.json")
        .then((response) => response.json())
        .then((data) => {
            if (data.global) renderTermsAndCancellation(data.global);
        })
        .catch((error) =>
            console.error("Error fetching global terms and cancellation:", error)
        );
}
// Fetch global details for fallback terms and conditions
function loadGlobalDetails() {
    fetch("assets/js/umrah-package.json")
        .then((response) => response.json())
        .then((data) => {
            if (data.global) renderTermsAndCancellation(data.global);
        })
        .catch((error) =>
            console.error("Error fetching global terms and cancellation:", error)
        );
}

// Function to render package details (as in the original script)
function renderPackageDetails(pkg) {
    const detailsContainer = document.getElementById("details-container");

    const featuresIcons = {
        flight: "https://media.umrahme.com/prod/saas/assets/media/icons/plane.png",
        hotels: "https://media.umrahme.com/prod/saas/assets/media/icons/hotel.png",
        transfers: "https://media.umrahme.com/prod/saas/assets/media/icons/car.png",
        activities: "https://media.umrahme.com/prod/saas/assets/media/icons/activity.png",
    };

    detailsContainer.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">${pkg.title}</h1>
          <div class="flex items-center space-x-4 mt-2">
            <p class="text-sm bg-gray-200 text-gray-800 py-1 px-3 rounded-full">${pkg.location}</p>
            <p class="text-sm bg-gray-200 text-gray-800 py-1 px-3 rounded-full">${pkg.duration}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <img src="${pkg.images[0]}" alt="Main Image" class="col-span-2 w-full h-[400px] object-cover rounded-lg">
          <img src="${pkg.images[1] || pkg.images[0]}" alt="Sub Image 1" class="w-full h-[200px] object-cover rounded-lg">
          <div class="relative">
            <img src="${pkg.images[2] || pkg.images[0]}" alt="Sub Image 2" class="w-full h-[200px] object-cover rounded-lg">
            ${
              pkg.images.length > 3
                ? `<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg rounded-lg">
                  +${pkg.images.length - 3}
                </div>`
                : ""
            }
          </div>
        </div>
        <div class="bg-white mt-8 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-bold text-gray-800">Features</h2>
          <div class="grid grid-cols-4 gap-4 text-center mt-4">
            ${Object.keys(pkg.features)
              .map(
                (key) => `
              <div>
                <img src="${featuresIcons[key]}" alt="${key}" class="w-6 h-6 mx-auto">
                <p class="text-gray-500 text-sm mt-1">${pkg.features[key]}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-lg font-semibold text-gray-800">Booking Details</h2>
  <div class="mt-4 space-y-2">
    <p><strong>Start Date:</strong> ${pkg.startDate}</p>
    <p><strong>End Date:</strong> ${pkg.endDate}</p>
    <p><strong>Guests:</strong> ${pkg.adults} Adults</p>
  </div>
  <div class="text-right mt-4">
    <h3 class="text-2xl font-bold text-green-600">USD ${pkg.price}</h3>
  </div>
  <a href="booking.html?id=${pkg.id}&startDate=${pkg.startDate}&endDate=${pkg.endDate}&adults=${pkg.adults}&price=${pkg.price}" 
     class="bg-green-500  text-white w-full mt-4 py-2 rounded-lg hover:bg-green-600 block text-center">
    Booking Now
  </a>
</div>

    </div>
    <div class="mt-8 space-y-8">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Description</h2>
        <p class="text-gray-600 mt-2">
          ${pkg.description || "No description available for this package."}
        </p>
      </div>
      <div id="itinerary-section">
        <h2 class="text-xl font-bold text-gray-800">Itinerary</h2>
        <ul id="itinerary-list" class="text-gray-600 mt-2 list-disc list-inside"></ul>
      </div>
    </div>
  `;
}

// Function to load itinerary (as in the original script)
function loadItinerary(itineraryId) {
    fetch(`assets/js/itineraries/${itineraryId}.json`)
        .then((response) => response.json())
        .then((itinerary) => {
            const itineraryList = document.getElementById("itinerary-list");
            itineraryList.innerHTML = itinerary
                .map((item) => `<li>${item}</li>`)
                .join("");
        })
        .catch((error) => {
            console.error("Error loading itinerary:", error);
            document.getElementById("itinerary-section").innerHTML =
                "<p class='text-gray-600'>Itinerary not available.</p>";
        });
}