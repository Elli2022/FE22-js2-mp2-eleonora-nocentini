

// Definierar en Tamagotchi class
class Tamagotchi {
  #name;
  #type;
  #hunger;
  #happiness;
  #stress;
  #hungerInterval;
  #happinessInterval;
  #stressInterval
  #feedBtn;
  #playBtn;
  #stressBtn;
  #statusEl;
  #hungerEl;
  #stressEl;
  #happinessEl;
  #dead = false;


  //konstruktorn
  constructor(name, type) {
    this.#name = name;
    this.#type = type;
    this.#hunger = 10;
    this.#happiness = 10;
    this.#stress = 0;
    //tidsintervall för hunger
    this.#hungerInterval = setInterval(() => {
      if (!this.#dead) {
        this.#hunger--;
        this.update();
      }
    }, 2000);

    //tidsintervall för happiness
    this.#happinessInterval = setInterval(() => {
      if (!this.#dead) {
        this.#happiness--;
        this.update();
      }
    }, 3000);

    //tidsintervall för stress
    this.#stressInterval = setInterval(() => {
      if (!this.#dead) {
        this.#stress++;
        this.update();
      }
    }, 1000);

    //skapar en feed-knapp med en eventlistener där den kollar om this.#hunger går under 0 och inte kan gå högre än till 10
    this.#feedBtn = document.createElement("button");
    this.#feedBtn.innerText = "Feed";
    this.#feedBtn.style.backgroundColor = 'red';
    this.#feedBtn.style.borderRadius = '20px';
    this.#feedBtn.style.marginTop = '20px';
    this.#feedBtn.addEventListener("click", () => {
      if (this.#hunger > 0 && this.#hunger < 10 && !this.#dead) {
        this.#hunger++;
        this.update();
      }
    });

    //skapar en play-knapp med en eventlistener där den kollar om this.#happines går under 0 och inte kan gå högre än till 10
    this.#playBtn = document.createElement("button");
    this.#playBtn.innerText = "Play";
    this.#playBtn.style.backgroundColor = 'red';
    this.#playBtn.style.borderRadius = '20px';
    this.#playBtn.style.marginTop = '20px';
    this.#playBtn.addEventListener("click", () => {
      if (this.#happiness > 0 && this.#happiness < 10 && !this.#dead) {
        this.#happiness++;
        this.update();
      }
    });

    //skapar en stress-knapp med en eventlistener där den kollar om this.#stress går över 10 men inte kan gå lägre än till 0.
    this.#stressBtn = document.createElement("button");
    this.#stressBtn.innerText = "Stress";
    this.#stressBtn.style.backgroundColor = "red";
    this.#stressBtn.style.borderRadius = "20px";
    this.#stressBtn.style.marginTop = "20px";
    this.#stressBtn.addEventListener("click", () =>{
      if(this.#stress > 0 && this.#stress < 10 && !this.#dead){
        this.#stress--;
        this.update();
      }
    })

    //skapar texten med status på "hunger" och "happiness"
    this.#statusEl = document.createElement("div");
    this.#statusEl.innerText = `${this.#name} (${this.#type})`;
    this.#hungerEl = document.createElement("div");
    this.#hungerEl.innerText = `Hunger: ${this.#hunger}`;
    this.#happinessEl = document.createElement("div");
    this.#happinessEl.innerText = `Happiness: ${this.#happiness}`;
    this.#stressEl = document.createElement("div");
    this.#stressEl.innerText = `Stress: ${this.#stress}`;

    //skapar ny div som är den nya tamagotchin. Skapas för varje gång användaren matar in ett nytt namn och typ och klickar på knappen "Create Tamagotchi"
    const el = document.createElement("div");
    el.style.border = '2px solid black';
    el.style.height = "150px";
    el.style.width = '120px';
    el.style.borderRadius = "90% 90% 70% 70% / 100% 100% 80% 80%";
    el.style.textAlign = 'center';
    el.style.padding = '40px';

    //skapar en ny div som ska  vara Tamagotchins skärm
    const innerEl = document.createElement("div");
    innerEl.style.width = "120px";
    innerEl.style.height = "80px";
    innerEl.style.backgroundColor = "white";
    innerEl.style.borderRadius = "10px";
    innerEl.style.textAlign = 'center';


    //funktion som gör att färgen på tamagotchin randomiseras för att kunna urskilja de olika tamagotchis
    function random_bg_color() {
      let x = Math.floor(Math.random() * 256);
      let y = Math.floor(Math.random() * 256);
      let z = Math.floor(Math.random() * 256);
      let bgColor = "rgb(" + x + "," + y + "," + z + ")";
      console.log(bgColor);
      el.style.background = bgColor;
    }
    //anropar den färgsättande funktionen
    random_bg_color();

    //appendar allt till rätt element
    innerEl.appendChild(this.#statusEl);
    innerEl.appendChild(this.#hungerEl);
    innerEl.appendChild(this.#happinessEl);
    innerEl.appendChild(this.#stressEl);
    el.appendChild(innerEl);
    el.appendChild(this.#feedBtn);
    el.appendChild(this.#playBtn);
    el.appendChild(this.#stressBtn);
    document.body.appendChild(el);
  }


  //metoden update som visar status på tamagotchis - om den är död eller ej, samt uppdaterar texterna på alla "behov-text-elementen"
  update() {
    if (this.#hunger === 0 || this.#happiness === 0 || this.#stress === 10) {
      this.#dead = true;
      this.#statusEl.style.color = "red";
      this.#hungerEl.style.color = "red";
      this.#happinessEl.style.color = "red";
      this.#stressEl.style.color = "red";
      this.#feedBtn.disabled = true;
      this.#playBtn.disabled = true;
      this.#stressBtn.disabled = true;
    }
    this.#hungerEl.innerText = `Hunger: ${this.#hunger}`;
    this.#happinessEl.innerText = `Happiness: ${this.#happiness}`;
    this.#stressEl.innerText = `Stress: ${this.#stress}`;
  }

}

//export av klassen
export { Tamagotchi }



