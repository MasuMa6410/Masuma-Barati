
    // Light/dark theme. Save the visitor's choice between visits.
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    function setTheme(theme) {
      root.dataset.theme = theme;
      const dark = theme === "dark";
      themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      themeIcon.innerHTML = dark
        ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>'
        : '<path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z"></path>';
      localStorage.setItem("portfolio-theme", theme);
    }
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemTheme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(savedTheme || systemTheme);
    themeToggle.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

    // Mobile menu opens and closes with the menu button or a navigation link.
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      menuToggle.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
      mobileMenu.classList.toggle("hidden", open);
    });
    document.querySelectorAll(".mobile-link").forEach(link => link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }));

    // Reveal sections as they enter the screen; respect reduced-motion preferences.
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
      }), { threshold: 0.12 });
      revealItems.forEach(item => observer.observe(item));
    } else revealItems.forEach(item => item.classList.add("visible"));

    document.getElementById("year").textContent = new Date().getFullYear();

    // Update this email in both the mailto link and the copy button will use it automatically.
    const emailLink = document.getElementById("emailLink");
    const copyMessage = document.getElementById("copyMessage");
    document.getElementById("copyEmail").addEventListener("click", async () => {
      const email = emailLink.getAttribute("href").replace("mailto:", "");
      if (email === "your.email@example.com") {
        copyMessage.textContent = "First replace the placeholder with your professional email address.";
        return;
      }
      try { await navigator.clipboard.writeText(email); copyMessage.textContent = "Email address copied."; }
      catch { copyMessage.textContent = "Copy isn't available here. Please use the Email me button."; }
    });

    // Placeholder project links prompt you to add the correct URLs before publishing.
    document.querySelectorAll("[data-placeholder-link]").forEach(link => link.addEventListener("click", event => {
      event.preventDefault();
      alert("Replace this placeholder with your actual project URL before publishing.");
    }));
 