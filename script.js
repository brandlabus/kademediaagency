document.addEventListener("DOMContentLoaded", () => {
  // 1. Select the necessary elements from the HTML
  const header = document.querySelector(".the-header");
  const navigation = document.querySelector(".navigation");
  const menuToggle = document.querySelector(".menu-toggle");

  // 2. Check if the menu elements exist before running code
  if (menuToggle && navigation) {
    // --- Toggle Button Click Event ---
    menuToggle.addEventListener("click", () => {
      // Toggle the 'active' class to show/hide the menu
      navigation.classList.toggle("active");

      // Handle the Icon Switching (Bars to X)
      const icon = menuToggle.querySelector("i");
      if (icon) {
        if (navigation.classList.contains("active")) {
          // Menu is OPEN: Show X icon
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          // Menu is CLOSED: Show Bars icon
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });

    // --- Close Menu When a Link is Clicked ---
    const navLinks = document.querySelectorAll(".nav-one a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Hide the menu
        navigation.classList.remove("active");

        // Reset icon back to Bars
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // 3. Header Background on Scroll
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    }
  });

  // 4. Accordion Logic (for the About section)
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const targetId = header.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const isExpanded = header.classList.contains("active");

      // Close all other accordion items first
      accordionHeaders.forEach((h) => {
        h.classList.remove("active");
        if (h.nextElementSibling) {
          h.nextElementSibling.style.maxHeight = null;
        }
        // Reset other icons if using lucide
        const icon = h.querySelector('[data-lucide="minus"]');
        if (icon) {
          icon.setAttribute("data-lucide", "plus");
        }
      });

      // Open the clicked item if it wasn't already open
      if (!isExpanded && content) {
        header.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";

        // Set icon for active item
        const plusIcon = header.querySelector('[data-lucide="plus"]');
        if (plusIcon) {
          plusIcon.setAttribute("data-lucide", "minus");
        }
      }

      // Refresh icons if using Lucide library
      if (typeof lucide !== "undefined" && lucide.createIcons) {
        lucide.createIcons();
      }
    });
  });

  // Initialize icons on page load
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }

  const sectionsToAnimate = document.querySelectorAll(
    ".our-services-section, .about-us-section, .call-to-action-section, .clients-section, .final-cta-section, .footer-section"
  );

  const sectionObserverOptions = {
    root: null,
    threshold: 0.15, // Trigger when 15% of the section is visible
  };

  const sectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the class to start the CSS animation
        entry.target.classList.add("js-animate-in");

        // Stop observing this element once it has been animated
        observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(
    sectionObserverCallback,
    sectionObserverOptions
  );

  // Start observing all targeted sections
  sectionsToAnimate.forEach((section) => {
    sectionObserver.observe(section);
  });
});
