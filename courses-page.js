const menuButton = document.querySelector("#courseMenu");
const courseNav = document.querySelector("#courseNav");
const topButton = document.querySelector("#courseTop");

menuButton.addEventListener("click", () => {
  const open = courseNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});

courseNav.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  courseNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
});

document.querySelectorAll(".chapter-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".chapter-list details[open]").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

window.addEventListener("scroll", () => {
  topButton.classList.toggle("visible", window.scrollY > 700);
}, { passive: true });

topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
