const typingText = "Frontend Developer | React | JavaScript | SDE-1";
let index = 0;
let isDeleting = false;
let currentText = "";
let typingSpeed = 100;

function typeEffect() {
  const typingElement = document.getElementById("typing");

  if (!isDeleting && index <= typingText.length) {
    currentText = typingText.substring(0, index);
    typingElement.textContent = currentText;
    index++;
    typingSpeed = 100;
  } else if (isDeleting && index >= 0) {
    currentText = typingText.substring(0, index);
    typingElement.textContent = currentText;
    index--;
    typingSpeed = 50;
  }

  if (index === typingText.length + 1) {
    isDeleting = true;
    typingSpeed = 2000;
  }

  if (isDeleting && index === 0) {
    isDeleting = false;
    typingSpeed = 500;
  }

  setTimeout(typeEffect, typingSpeed);
}

window.addEventListener("load", () => {
  typeEffect();
});

const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const subject = this.querySelectorAll('input[type="text"]')[1].value;
  const message = this.querySelector("textarea").value;

  showNotification("Thanks for contacting me, " + name + "! I'll get back to you soon! 🚀");

  this.reset();
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        max-width: 300px;
    `;
  notification.textContent = message;

  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.5s ease";
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 4000);
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = document.querySelectorAll(
    ".skill-card, .project-card, .stat-card, .about-text, .about-stats"
  );

  elementsToObserve.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
});

document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const overlay = this.querySelector(".project-overlay");
    if (overlay) {
      overlay.style.opacity = "1";
    }
  });

  card.addEventListener("mouseleave", function () {
    const overlay = this.querySelector(".project-overlay");
    if (overlay) {
      overlay.style.opacity = "0";
    }
  });
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.style.color = "white";
    if (item.getAttribute("href") === `#${current}`) {
      item.style.color = "#fbbf24";
    }
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-content");
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 600;
  }
});

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + "+";
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        const targetValue = parseInt(statNumber.textContent);
        animateValue(statNumber, 0, targetValue, 2000);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  statObserver.observe(card);
});

window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

let dots = [];
const MAX_DOTS = 20;

document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 768) {
    const dot = document.createElement("div");
    dot.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            transition: all 0.5s ease;
        `;
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    document.body.appendChild(dot);
    dots.push(dot);

    if (dots.length > MAX_DOTS) {
      const oldDot = dots.shift();
      oldDot.style.opacity = "0";
      setTimeout(() => oldDot.remove(), 500);
    }

    setTimeout(() => {
      dot.style.opacity = "0";
      dot.style.transform = "scale(2)";
    }, 100);
  }
});

document.querySelectorAll(".project-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showNotification("This is a demo link. Connect your actual project URLs! 🔗");
  });
});

console.log("%c👋 Welcome to my portfolio!", "color: #6366f1; font-size: 20px; font-weight: bold;");
console.log("%cBuilt with ❤️ by Pooja Gupta", "color: #ec4899; font-size: 14px;");
