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

    // Fetch all JSON files and remove "global" except from global.json
    Promise.all(
        sources.map((src) =>
            fetch(src)
                .then((res) => res.json())
                .then((data) => {
                    if (src !== "assets/js/global.json") {
                        delete data.global;
                    }
                    return data;
                })
        )
    )
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

    // Validate and construct the Terms and Conditions section
    const termsSection = Array.isArray(pkg.terms) && pkg.terms.length > 0
        ? `
        <div class="mt-8 space-y-8">
          <h2 class="text-xl font-bold text-gray-800">Terms and Conditions</h2>
          <ul class="text-gray-600 mt-2 text-sm list-disc list-inside">
            ${pkg.terms.map((term) => `<li>${term}</li>`).join("")}
          </ul>
        </div>`
        : "";

    // Validate and construct the Cancellation Policy section
    const cancellationSection = Array.isArray(pkg.cancellation) && pkg.cancellation.length > 0
        ? `
        <div class="mt-8 space-y-8">
          <h2 class="text-xl font-bold text-gray-800">Cancellation Policy</h2>
          <ul class="text-gray-600 mt-2 text-sm list-disc list-inside">
            ${pkg.cancellation.map((policy) => `<li>${policy}</li>`).join("")}
          </ul>
        </div>`
        : "";

    // Safely append sections to details container
    if (termsSection || cancellationSection) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = termsSection + cancellationSection;
        detailsContainer.appendChild(wrapper);
    }
}

// Function to load itinerary
function loadItinerary(itineraryId) {
    fetch(`assets/js/itineraries/${itineraryId}.json`)
        .then((response) => response.json())
        .then((itinerary) => {
            const itineraryList = document.getElementById("itinerary-list");
            itineraryList.innerHTML = itinerary
                .map((item) => {
                    const [boldPart, ...rest] = item.split("\n\n");
                    return `
                        <li class="mb-4">
                            <strong>${boldPart}</strong>
                            <p class="mt-2">${rest.join("\n\n")}</p>
                        </li>`;
                })
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
    const globalSource = "assets/js/global.json";

    fetch(globalSource)
        .then((res) => res.json())
        .then((globalData) => {
            if (globalData.global) renderTermsAndCancellation(globalData.global);
        })
        .catch((error) => console.error("Error fetching global terms and cancellation:", error));
}

// Function to render package details

function renderPackageDetails(pkg) {
    const detailsContainer = document.getElementById("details-container");

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
           class="bg-green-500 text-white w-full mt-4 py-2 rounded-lg hover:bg-green-600 block text-center">
          Booking Now
        </a>
        
        <!-- WhatsApp Button -->
        <a id="whatsapp-btn" href="#" target="_blank"
           class="bg-green-700 text-white w-full mt-2 py-2 rounded-lg hover:bg-green-800 block text-center">
          Contact via WhatsApp
        </a>
      </div>
    </div>
  `;

    // WhatsApp Dynamic URL with Proper Formatting
    const phoneNumber = "85569556444";
    const packageName = "*UHDU TOUR*";
    const programName = `*${pkg.title}*`;
    const duration = `*${pkg.duration}*`;
    const startDate = `*${pkg.startDate}*`;
    const endDate = `*${pkg.endDate}*`;
    const guests = `*${pkg.adults}* pax`;
    const departureAirport = "*Soekarno-Hatta International Airport*";
    const packageURL = encodeURIComponent("https://uhudtour.com/transaksi/paket-umrah/detail/194/17-maret-2025-platinum-akhir-ramadhan");

    const message = `Assalamualaikum ${packageName}

Saya ingin mendaftar paket umrah ${programName}
Program: ${duration}
Keberangkatan: ${startDate} hingga ${endDate}
Dari Bandara: ${departureAirport}

Dengan kamar:
- *Double*: 1 pax
- *Triple*: 20 pax

Mohon informasi lebih lanjut terkait paket tersebut.

${packageURL}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Update WhatsApp button link
    document.getElementById("whatsapp-btn").href = whatsappUrl;
}
