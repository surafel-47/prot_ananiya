document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle")
  themeToggle.addEventListener("click", () => {
    console.log("Theme toggle clicked")
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light")
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.documentElement.classList.remove("dark")
  }

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll("a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
    })
  })

  // Initialize Fancybox
  // Assuming Fancybox is available globally or imported elsewhere.
  // If not, you'll need to import it here.
  // For example: import * as Fancybox from '@fancyapps/ui';
  // Or declare it if it's already loaded via a script tag:
  // const Fancybox = window.Fancybox;
  Fancybox.bind("[data-fancybox]", {
    // Fancybox options
  })



  // Load Certificates
  loadCertificates()

  // Initialize Testimonials Carousel
  initTestimonialsCarousel()

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the data to a server
    // For demonstration, we'll just log it and show an alert
    console.log({ name, email, subject, message })

    alert("Thank you for your message! I will get back to you soon.")
    contactForm.reset()
  })
})


// Load Portfolio Projects into Grid
function loadPortfolioProjects() {
  const grid = document.getElementById("projects-grid");
  const projects = portfolioData.projects;

  projects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.className = "bg-white dark:bg-dark-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800";
    
    projectElement.innerHTML = `
      <div class="aspect-video relative">
        <iframe 
          src="${project.videoUrl.replace('/view', '/preview')}" 
          frameborder="0" 
          allowfullscreen 
          class="w-full h-full absolute inset-0">
        </iframe>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
        <p class="text-gray-600 dark:text-gray-400">${project.description}</p>
      </div>
    `;

    grid.appendChild(projectElement);
  });
}

  // Load Portfolio Projects
  loadPortfolioProjects()

// Initialize Portfolio Carousel
function initPortfolioCarousel() {
  const carousel = document.getElementById("carousel")
  const prevButton = document.getElementById("carousel-prev")
  const nextButton = document.getElementById("carousel-next")

  let currentPosition = 0
  const itemWidth = document.querySelector(".carousel-item").offsetWidth
  const itemCount = portfolioData.projects.length

  // Set initial position
  carousel.style.transform = `translateX(0)`

  // Previous button click
  prevButton.addEventListener("click", () => {
    if (currentPosition > 0) {
      currentPosition--
      updateCarouselPosition()
    }
  })

  // Next button click
  nextButton.addEventListener("click", () => {
    const visibleItems = getVisibleItemCount()
    if (currentPosition < itemCount - visibleItems) {
      currentPosition++
      updateCarouselPosition()
    }
  })

  // Update carousel position
  function updateCarouselPosition() {
    carousel.style.transform = `translateX(-${currentPosition * itemWidth}px)`
  }

  // Get number of visible items based on screen width
  function getVisibleItemCount() {
    if (window.innerWidth >= 1024) {
      return 3 // Desktop: 3 items
    } else if (window.innerWidth >= 768) {
      return 2 // Tablet: 2 items
    } else {
      return 1 // Mobile: 1 item
    }
  }

  // Update on window resize
  window.addEventListener("resize", () => {
    // Reset position when screen size changes
    currentPosition = 0
    updateCarouselPosition()
  })
}

// Load Certificates
function loadCertificates() {
  const certificatesGrid = document.getElementById("certificates-grid")
  const certificates = portfolioData.certificates

  certificates.forEach((certificate) => {
    const certificateElement = document.createElement("div")
    certificateElement.className = "bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"

    certificateElement.innerHTML = `
            <a href="${certificate.image}" data-fancybox="certificates" data-caption="${certificate.title}">
                <img src="${certificate.image}" alt="${certificate.title}" class="w-full h-48 object-cover cursor-pointer">
            </a>
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${certificate.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Issued by: ${certificate.issuer}</p>
                <a href="${certificate.downloadUrl}" download class="inline-block bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                    <i class="fas fa-download mr-2"></i>Download
                </a>
            </div>
        `

    certificatesGrid.appendChild(certificateElement)
  })
}

// Initialize Testimonials Carousel
function initTestimonialsCarousel() {
  const carousel = document.getElementById("testimonials-carousel")
  const prevButton = document.getElementById("testimonial-prev")
  const nextButton = document.getElementById("testimonial-next")

  let currentPosition = 0
  const itemWidth = document.querySelector("#testimonials-carousel .carousel-item").offsetWidth
  const itemCount = portfolioData.testimonials.length

  // Set initial position
  carousel.style.transform = `translateX(0)`

  // Previous button click
  prevButton.addEventListener("click", () => {
    if (currentPosition > 0) {
      currentPosition--
      updateCarouselPosition()
    }
  })

  // Next button click
  nextButton.addEventListener("click", () => {
    const visibleItems = getVisibleItemCount()
    if (currentPosition < itemCount - visibleItems) {
      currentPosition++
      updateCarouselPosition()
    }
  })

  // Update carousel position
  function updateCarouselPosition() {
    carousel.style.transform = `translateX(-${currentPosition * itemWidth}px)`
  }

  // Get number of visible items based on screen width
  function getVisibleItemCount() {
    if (window.innerWidth >= 1024) {
      return 3 // Desktop: 3 items
    } else if (window.innerWidth >= 768) {
      return 2 // Tablet: 2 items
    } else {
      return 1 // Mobile: 1 item
    }
  }

  // Update on window resize
  window.addEventListener("resize", () => {
    // Reset position when screen size changes
    currentPosition = 0
    updateCarouselPosition()
  })
}

