class Tamagotchi {
  static #MAX_STAT = 10;
  static #MIN_STAT = 0;

  #name = '';
  #type = '';
  #hunger = Tamagotchi.#MAX_STAT;
  #happiness = Tamagotchi.#MAX_STAT;
  #stress = Tamagotchi.#MIN_STAT;
  #container;
  #card;
  #feedBtn;
  #playBtn;
  #relaxBtn;
  #statusEl;
  #hungerEl;
  #stressEl;
  #happinessEl;
  #dead = false;
  #timers = [];

  constructor(name, type, container) {
    this.#name = name;
    this.#type = type;
    this.#container = container;

    this.#build();
    this.#startTimers();
    this.update();
  }

  #build() {
    this.#card = document.createElement('article');
    this.#card.className = 'pet-card';
    this.#card.style.setProperty('--pet-color', this.#randomColor());

    this.#statusEl = document.createElement('h2');
    this.#statusEl.className = 'pet-name';
    this.#statusEl.textContent = `${this.#name} (${this.#type})`;

    const stats = document.createElement('div');
    stats.className = 'pet-stats';

    this.#hungerEl = document.createElement('p');
    this.#happinessEl = document.createElement('p');
    this.#stressEl = document.createElement('p');

    stats.append(this.#hungerEl, this.#happinessEl, this.#stressEl);

    const actions = document.createElement('div');
    actions.className = 'pet-actions';

    this.#feedBtn = this.#createActionButton('Feed', () => {
      this.#hunger = this.#clamp(this.#hunger + 1);
      this.update();
    });
    this.#playBtn = this.#createActionButton('Play', () => {
      this.#happiness = this.#clamp(this.#happiness + 1);
      this.update();
    });
    this.#relaxBtn = this.#createActionButton('Relax', () => {
      this.#stress = this.#clamp(this.#stress - 1);
      this.update();
    });

    actions.append(this.#feedBtn, this.#playBtn, this.#relaxBtn);
    this.#card.append(this.#statusEl, stats, actions);
    this.#container.appendChild(this.#card);
  }

  #createActionButton(label, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pet-action-btn';
    button.textContent = label;
    button.addEventListener('click', () => {
      if (this.#dead) {
        return;
      }
      onClick();
    });
    return button;
  }

  #startTimers() {
    this.#timers.push(
      setInterval(() => {
        if (this.#dead) {
          return;
        }
        this.#hunger = this.#clamp(this.#hunger - 1);
        this.update();
      }, 2000),
      setInterval(() => {
        if (this.#dead) {
          return;
        }
        this.#happiness = this.#clamp(this.#happiness - 1);
        this.update();
      }, 3000),
      setInterval(() => {
        if (this.#dead) {
          return;
        }
        this.#stress = this.#clamp(this.#stress + 1);
        this.update();
      }, 1000)
    );
  }

  #randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue} 75% 65%)`;
  }

  #clamp(value) {
    return Math.min(Tamagotchi.#MAX_STAT, Math.max(Tamagotchi.#MIN_STAT, value));
  }

  update() {
    if (
      this.#hunger === Tamagotchi.#MIN_STAT ||
      this.#happiness === Tamagotchi.#MIN_STAT ||
      this.#stress === Tamagotchi.#MAX_STAT
    ) {
      this.#dead = true;
      this.#feedBtn.disabled = true;
      this.#playBtn.disabled = true;
      this.#relaxBtn.disabled = true;
      this.#card.classList.add('is-dead');
      this.#statusEl.textContent = `${this.#name} (${this.#type}) - Game Over`;
      this.#timers.forEach((timerId) => clearInterval(timerId));
    }

    this.#hungerEl.textContent = `Hunger: ${this.#hunger}/${Tamagotchi.#MAX_STAT}`;
    this.#happinessEl.textContent = `Happiness: ${this.#happiness}/${Tamagotchi.#MAX_STAT}`;
    this.#stressEl.textContent = `Stress: ${this.#stress}/${Tamagotchi.#MAX_STAT}`;
  }
}

export { Tamagotchi };
