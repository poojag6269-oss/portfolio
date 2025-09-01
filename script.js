const typingText = "Frontend Developer | React | JavaScript | SDE-1";
let index = 0;

function typeEffect() {
  if (index < typingText.length) {
    document.getElementById("typing").innerHTML += typingText.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks for contacting me, I'll get back to you soon!");
});
