const menuButton=document.querySelector("#menuButton");
const sidebar=document.querySelector("#sidebar");
const themeButton=document.querySelector("#themeToggle");
menuButton?.addEventListener("click",()=>{const open=sidebar.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open))});
sidebar?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{sidebar.classList.remove("open");menuButton?.setAttribute("aria-expanded","false")}));
document.addEventListener("keydown",event=>{if(event.key==="Escape"){sidebar?.classList.remove("open");menuButton?.setAttribute("aria-expanded","false")}});
const themeKey="smartech-ai-theme";
try{if(localStorage.getItem(themeKey)==="dark"){document.body.classList.add("dark");themeButton.textContent="☀"}}catch{}
themeButton?.addEventListener("click",()=>{document.body.classList.toggle("dark");const dark=document.body.classList.contains("dark");themeButton.textContent=dark?"☀":"☾";try{localStorage.setItem(themeKey,dark?"dark":"light")}catch{}});
