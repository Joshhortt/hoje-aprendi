console.log("Ola Hoje Aprendi!");

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Fechar";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Partilhar";
  }
});
