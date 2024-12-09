// Format date (e.g., "2025-01-08" -> "Jan 08, 2025")
function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format price
function formatPrice(price) {
    return `USD ${price.toFixed(2)}`;
}