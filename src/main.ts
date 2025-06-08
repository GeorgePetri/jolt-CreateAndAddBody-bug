import { setupCounter } from "./counter.ts";
import { createAndAddBody } from "./jolt.ts";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

const executeTest = () => {
  const id = createAndAddBody();
  console.log("id1", id.GetIndex());

  const id2 = createAndAddBody();
  console.log("id2", id2.GetIndex());

  //id 1 changed, it is now the same as id2
  console.log("id1", id.GetIndex());
};

executeTest();
