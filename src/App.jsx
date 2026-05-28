import { useEffect, useMemo, useState } from "react";

const PET_TYPES = [
  { id: "cat", label: "Cat", sprite: "(=^.^=)" },
  { id: "dog", label: "Dog", sprite: "(U・ᴥ・U)" },
  { id: "rabbit", label: "Rabbit", sprite: "(\\_/)" }
];

const clamp = (value) => Math.max(0, Math.min(100, value));

function App() {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState(PET_TYPES[0].id);
  const [started, setStarted] = useState(false);
  const [hunger, setHunger] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [stress, setStress] = useState(0);
  const [message, setMessage] = useState("Waiting for your first Tamagotchi.");
  const [frame, setFrame] = useState(0);
  const isDead = started && (hunger <= 0 || happiness <= 0 || stress >= 100);

  useEffect(() => {
    if (!started) {
      return undefined;
    }

    const hungerTimer = setInterval(() => setHunger((value) => clamp(value - 3)), 1700);
    const happinessTimer = setInterval(() => setHappiness((value) => clamp(value - 4)), 2300);
    const stressTimer = setInterval(() => setStress((value) => clamp(value + 5)), 1200);

    return () => {
      clearInterval(hungerTimer);
      clearInterval(happinessTimer);
      clearInterval(stressTimer);
    };
  }, [started]);

  useEffect(() => {
    if (!started || isDead) {
      return undefined;
    }
    const animationTimer = setInterval(() => setFrame((value) => (value + 1) % 2), 550);
    return () => clearInterval(animationTimer);
  }, [isDead, started]);

  useEffect(() => {
    if (!started) {
      return;
    }

    if (isDead) {
      setMessage("Game over. Your Tamagotchi needs a restart.");
      return;
    }

    if (hunger < 30) {
      setMessage("Your pet is getting hungry.");
    } else if (happiness < 30) {
      setMessage("Your pet feels lonely. Play now.");
    } else if (stress > 70) {
      setMessage("Stress level is high. Tap Relax.");
    } else {
      setMessage("Your Tamagotchi is doing great.");
    }
  }, [happiness, hunger, isDead, started, stress]);

  const currentPet = useMemo(
    () => PET_TYPES.find((type) => type.id === petType) ?? PET_TYPES[0],
    [petType]
  );

  const mood = isDead
    ? "dead"
    : hunger < 25 || happiness < 25 || stress > 75
      ? "sad"
      : "happy";

  const sprite = getSprite(currentPet.id, mood, frame);

  const handleStart = (event) => {
    event.preventDefault();
    if (!petName.trim()) {
      setMessage("Give your Tamagotchi a name first.");
      return;
    }
    setStarted(true);
    setHunger(100);
    setHappiness(100);
    setStress(0);
    setMessage("Tamagotchi boot complete.");
  };

  const restart = () => {
    setStarted(false);
    setPetName("");
    setPetType(PET_TYPES[0].id);
    setHunger(100);
    setHappiness(100);
    setStress(0);
    setMessage("Waiting for your first Tamagotchi.");
  };

  return (
    <main className="page">
      <header className="title-wrap">
        <h1>Miniproject 2 in Javascript course 2 Tamagotchi</h1>
        <p>Retro shell, LCD screen and classic virtual pet gameplay.</p>
      </header>

      <section className="app-grid">
        <form className="panel setup-panel" onSubmit={handleStart}>
          <h2>Create Tamagotchi</h2>
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            value={petName}
            maxLength={18}
            onChange={(event) => setPetName(event.target.value)}
            placeholder="Example: Nori"
            disabled={started}
          />

          <label htmlFor="type-input">Type</label>
          <select
            id="type-input"
            value={petType}
            onChange={(event) => setPetType(event.target.value)}
            disabled={started}
          >
            {PET_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>

          {!started ? (
            <button type="submit" className="primary-btn">
              Start
            </button>
          ) : (
            <button type="button" className="ghost-btn" onClick={restart}>
              New Tamagotchi
            </button>
          )}
        </form>

        <section className="tama-shell panel" aria-live="polite" aria-label="Tamagotchi device">
          <div className="device-top">
            <span className="led" />
            <span className="device-brand">TAMAGOTCHI</span>
          </div>
          <div className="device-face">
            <div className="screw screw-tl" aria-hidden="true" />
            <div className="screw screw-tr" aria-hidden="true" />
            <div className="screw screw-bl" aria-hidden="true" />
            <div className="screw screw-br" aria-hidden="true" />
            <div className="screen-well">
              <div className={`screen mood-${mood}`}>
                <div className="scanline" />
                <div className="icon-row" aria-hidden="true">
                  <span role="img" aria-label="food">🍖</span>
                  <span role="img" aria-label="game">🎮</span>
                  <span role="img" aria-label="health">💊</span>
                  <span role="img" aria-label="sleep">💤</span>
                </div>
                <p className="pet-id">
                  {started ? `${petName} · ${currentPet.label}` : "No Pet Loaded"}
                </p>
            <div className={`sprite ${mood}`}>
              {started ? (
                currentPet.id === "cat" ? (
                  <CatSprite mood={mood} frame={frame} />
                ) : (
                  sprite
                )
              ) : (
                "◌"
              )}
            </div>
                <p className="status">{message}</p>
              </div>
            </div>
          </div>

          <div className="stats">
            <Stat label="Hunger" value={hunger} tone="good" />
            <Stat label="Happiness" value={happiness} tone="good" />
            <Stat label="Stress" value={100 - stress} tone="warn" invert />
          </div>

          <div className="controls">
            <button
              type="button"
              disabled={!started || isDead}
              onClick={() => setHunger((value) => clamp(value + 18))}
            >A</button>
            <button
              type="button"
              disabled={!started || isDead}
              onClick={() => setHappiness((value) => clamp(value + 18))}
            >B</button>
            <button
              type="button"
              disabled={!started || isDead}
              onClick={() => setStress((value) => clamp(value - 24))}
            >C</button>
          </div>
          <p className="control-help">A Feed · B Play · C Relax</p>
        </section>
      </section>
    </main>
  );
}

function getSprite(type, mood, frame) {
  const sprites = {
    cat: {
      happy: ["(=^.^=)", "(=^o^=)"],
      sad: ["(=;.;=)", "(=._.=)"],
      dead: ["(=x.x=)", "(=x.x=)"]
    },
    dog: {
      happy: ["(U・ᴥ・U)", "(UᵔᴥᵔU)"],
      sad: ["(U •́︿•̀ U)", "(U ._. U)"],
      dead: ["(U x_x U)", "(U x_x U)"]
    },
    rabbit: {
      happy: ["(\\_/)", "(\\_•)"],
      sad: ["(\\_/)..", "(\\_/)"],
      dead: ["(x_x)", "(x_x)"]
    }
  };

  const petSprites = sprites[type] ?? sprites.cat;
  const frames = petSprites[mood] ?? petSprites.happy;
  return frames[frame] ?? frames[0];
}

function CatSprite({ mood, frame }) {
  const eyes = mood === "dead" ? "x x" : mood === "sad" ? "o . o" : frame ? "o - o" : "o o";
  const mouth = mood === "dead" ? "_" : mood === "sad" ? "︵" : "ᴥ";

  return (
    <div className={`cat-sprite cat-${mood}`} aria-label="animated cat">
      <span className="cat-ears" aria-hidden="true">/\\_/\\</span>
      <span className="cat-face" aria-hidden="true">
        ({eyes})
      </span>
      <span className="cat-mouth" aria-hidden="true">{mouth}</span>
      <span className="cat-tail" aria-hidden="true">~</span>
    </div>
  );
}

function Stat({ label, value, tone, invert = false }) {
  const width = clamp(value);
  return (
    <div className="stat-item">
      <div className="stat-head">
        <span>{label}</span>
        <span>{invert ? `${100 - value}%` : `${value}%`}</span>
      </div>
      <div className="progress">
        <span className={`bar ${tone}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default App;
