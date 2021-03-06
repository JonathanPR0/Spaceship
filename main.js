const sectionPrint = document.querySelector("#print");
const sectionHitch = document.querySelector("#hitch");
const option = document.querySelector("#option");
const optionButton = document.querySelector("#optionButton");
const spaceship = document.querySelector("#spaceship");
const crewsQuantity = document.querySelector("#crew");
const hitchButton = document.querySelector("#hitchButton");
const printList = document.querySelector("#print ul");
const message = document.querySelector("#quote");
const cite = document.querySelector("#message cite");
const phrase = document.querySelector("#phrase");
const arraySpaceships = [];

class Spaceship {
  constructor(name, quantity = 2) {
    this.name = name;
    this.crewsQuantity = quantity;
    this.isHitched = false;
    this.openDoors = false;
  }

  hitched() {
    this.isHitched = true;
    this.openDoors = true;
  }
}

const printSpacechips = () => {
  if (printList.innerHTML === "") {
    arraySpaceships.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="spaceship">${element.name}</span><span class="crew">- ${element.crewsQuantity} Tripulantes</span> <span class="doors"> (Portas: Abertas)</span>`;
      printList.appendChild(li);
    });
  }
};

hitchButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (spaceship.value !== " " && crewsQuantity.value !== " ") {
    const newSpaceship = new Spaceship(spaceship.value, crewsQuantity.value);
    newSpaceship.hitched();
    arraySpaceships.push(newSpaceship);
  }
  spaceship.value = "";
  crewsQuantity.value = "";
  printList.innerHTML = "";
});

optionButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (+option.value === 1) {
    sectionHitch.classList.add("active");
    sectionHitch.classList.remove("disabled");
    sectionPrint.classList.remove("active");
    sectionPrint.classList.add("disabled");
  } else if (+option.value === 2) {
    sectionPrint.classList.add("active");
    sectionPrint.classList.remove("disabled");
    sectionHitch.classList.remove("active");
    sectionHitch.classList.add("disabled");
    printSpacechips();
  } else if (+option.value === 3) {
    sectionHitch.classList.remove("active", "disabled");
    sectionPrint.classList.remove("active", "disabled");
    for (let i = 0; i <= arraySpaceships.length + 1; i += 1) {
      arraySpaceships.pop();
    }
    printList.innerHTML = "";
  }
});

const sentenceRequest = () => {
  fetch("./star-wars-phrases.json")
    .then((response) => response.json())
    .then((json) => {
      const randomNumber = Math.floor(Math.random() * 12);
      message.innerText = json[randomNumber].phrase;
      cite.innerText = `- ${json[randomNumber].author}`;
    });
};
sentenceRequest();

phrase.addEventListener("click", (event) => {
  event.preventDefault();
  sentenceRequest();
});
