document.addEventListener('DOMContentLoaded', () => {
  const components = ['header', 'hero', 'about', 'packages', 'umrah-packages', 'ads-banner', 'recommendations', 'footer'];

  components.forEach((component) => {
    fetch(`components/${component}.html`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${component}`);
        return response.text();
      })
      .then(data => {
        document.getElementById(component).innerHTML = data;

        // Load slide.js after hero.html is loaded
        if (component === 'hero') {
          const script = document.createElement('script');
          script.src = 'assets/js/slide.js';
          script.defer = true;
          document.body.appendChild(script);
        }
      })
      .catch(error => console.error(`Error loading component: ${component}`, error));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const slideshow = document.getElementById('ads-slideshow');
  const slides = slideshow.querySelector('.flex');
  const dots = document.querySelectorAll('[data-slide]');
  const totalSlides = dots.length;

  let currentSlide = 0;

  // Function to move to a specific slide
  const goToSlide = (index) => {
    const percentage = -(index * 100 / totalSlides); // Calculate the percentage to translate
    slides.style.transform = `translateX(${percentage}%)`;

    // Update active dot
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-gray-900', i === index); // Highlight active dot
      dot.classList.toggle('bg-gray-400', i !== index);
    });

    currentSlide = index;
  };

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides; // Loop back to the first slide
    goToSlide(currentSlide);
  }, 5000);

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Initialize the first slide
  goToSlide(currentSlide);
});
document.addEventListener('DOMContentLoaded', () => {
  fetch('components/ads-banner.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('ads-banner').innerHTML = data;
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Remove active state from all tabs and hide all content
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(content => content.classList.add('hidden'));

      // Activate the clicked tab and show corresponding content
      tab.classList.add('active');
      document.getElementById(target).classList.remove('hidden');
    });
  });
});
