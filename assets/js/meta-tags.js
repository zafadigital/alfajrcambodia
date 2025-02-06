document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = urlParams.get("id") || "Alfajr Cambodia";
  const pageTitle = packageId.replace("-", " ").toUpperCase() + " - Alfajr Cambodia";
  const packageImage = urlParams.get("image") || "https://www.alfajrcambodia.com/assets/images/alfajr-thumbnail.jpg";
  const packageDescription = urlParams.get("desc") || "Alfajr Cambodia helps you book flights, hotels, and DIY tour packages with ease. Experience seamless travel planning today!";

  // Update title dynamically
  document.title = pageTitle;

  // Update Open Graph meta tags
  document.querySelector('meta[property="og:title"]').setAttribute("content", pageTitle);
  document.querySelector('meta[property="og:description"]').setAttribute("content", packageDescription);
  document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
  document.querySelector('meta[property="og:image"]').setAttribute("content", packageImage);

  // Update Twitter Card meta tags
  document.querySelector('meta[name="twitter:title"]').setAttribute("content", pageTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute("content", packageDescription);
  document.querySelector('meta[name="twitter:image"]').setAttribute("content", packageImage);
});
