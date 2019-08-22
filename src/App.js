import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";
import { ReactComponent as CardImage } from "./card.svg";
import { ReactComponent as CardBack } from "./card-back.svg";

function App() {
  const [deck, setDeck] = useState(getDeck());
  console.log(deck);
  return (
    <div className="App">
      <p>Cards</p>
      <ShuffleButton
        onclick={() => {
          console.log("Clicked");
          setDeck(shuffleDeck(deck));
        }}
      />

      {deck && (
        <div className={"cardContainer"}>
          {/* <div className="cardBlank">
            <CardImage />
          </div>
          <div className="cardBlank">
            <CardBack />
          </div> */}
          {deck.map(card => {
            return <Card key={`${card.rank}-${card.value}`} data={card} />;
          })}
        </div>
        // <div style={{ marginLeft: 10 + "px" }}>
        //   <AnimatedCard rank={"diam"} />
        //   <AnimatedCard rank={"club"} />
        // </div>
      )}
    </div>
  );
}

function getDeck() {
  let ranks = ["Spade", "Heart", "Club", "Diamond"];
  let deck = [];
  ranks.forEach(rank => {
    for (let i = 1; i <= 13; i++) {
      deck.push({ rank, value: i });
    }
  });

  console.log(deck);
  return deck;
}

function Card({ data }) {
  console.log(`card${data.rank}${data.value}`);
  return (
    <div className="card">
      {/* <div className={`cardInner`}>{`${data.value} of ${data.rank}s`}</div> */}
      <div className={`cardInner card${data.rank}${data.value}`} />
    </div>
  );
}

function ShuffleButton({ onclick }) {
  return <button onClick={onclick}>Shuffle</button>;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleDeck(deck) {
  const cloneDeck = [...deck];
  for (var i = 0; i < cloneDeck.length; i++) {
    var rndNo = getRandomInt(0, 51);
    var card = cloneDeck[i];
    cloneDeck[i] = cloneDeck[rndNo];
    cloneDeck[rndNo] = card;
  }
  console.log("Shuffled deck:", cloneDeck);
  return cloneDeck;
}

function AnimatedCard({ rank }) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    // opacity: flipped ? 1 : 0,
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${
      flipped ? 180 : 0
    }deg) translateX(${flipped ? -160 : 0}px)`,
    config: { mass: 5, tension: 700, friction: 100 }
  });
  return (
    <div onClick={() => set(state => !state)}>
      <animated.div
        class="cardo back"
        style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
      />
      <animated.div
        class={`cardo front ${rank} ${rank === "diam" && flipped && "top"}`}
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateY(180deg)`)
        }}
      />
    </div>
  );
}

export default App;
