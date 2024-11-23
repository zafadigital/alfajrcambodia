function loadComponent(name, callback) {
  fetch(`components/${name}.html`)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${name}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(name).innerHTML = data;
      if (callback) callback(); // Execute the callback if provided
    })
    .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', () => {
  const components = [
    { name: 'header' },
    { name: 'hero', callback: () => { loadSlideScript(); } }, // Callback to load slides
    { name: 'about' },
    { name: 'packages' },
    { name: 'umrah-packages' },
    { name: 'footer' },
  ];

  components.forEach(component => {
    loadComponent(component.name, component.callback);
  });
});

function loadSlideScript() {
  const script = document.createElement('script');
  script.src = 'assets/js/slide.js';
  script.defer = true;
  document.body.appendChild(script);
}
