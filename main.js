let api = "https://www.breakingbadapi.com/api/";
let mainButtons = document.querySelector(".main-buttons");
let select = document.querySelector(".select");
let detailsContainer = document.querySelector(".show-details");

async function get() {
  try {
    let respons = await fetch(api);
    let data = await respons.json();
    showButtons(Object.keys(data));
  } catch {
    console.log(Error("Error"));
  }
}

function showButtons(buttonsNames) {
  for (let i = 0; i < buttonsNames.length; i++) {
    mainButtons.innerHTML += `<button style="margin:0 10px;" onclick="showSelect(this.innerHTML)">${buttonsNames[i]}</button>`;
  }
}

async function showSelect(val, opName, mainMsg) {
  if (val === "characters") {
    opName = "name";
    mainMsg = "choose A Character";
  } else if (val === "episodes") {
    opName = "title";
    mainMsg = "choose An episodes";
  } else if (val === "quotes") {
    opName = "quote";
    mainMsg = "choose A Quotes";
  } else if (val === "deaths") {
    opName = "death";
    mainMsg = "choose A Death";
  }
  try {
    let respons = await fetch(api + val);
    let data = await respons.json();
    let optionNumber = 1;
    let options = data.map(
      (op) => `<option data-opNum="${optionNumber++}">${op[opName]}</option>`
    );
    select.innerHTML = `
    <select
    class="mt-5 mb-5"
    onchange="showDetails(this.value, '${api + val}', '${opName}', '${val}')">
    <option disabled selected>${mainMsg}</option>
    ${options}
    </select>`;
  } catch {
    console.log(Error("Error"));
  }
}

async function showDetails(val, data, type, y) {
  try {
    let respons = await fetch(data);
    let jsonData = await respons.json();
    let x = jsonData.filter((x) => x[type] === val)[0];
    console.log(x);
    if (y === "characters") {
      detailsContainer.innerHTML = `
      <div class="card text-left position-reltiave">
        <h1>Name: ${x.name}</h1>
        <h3>Nick Name: ${x.nickname}</h3>
        <h3>BirthDay: ${x.birthday}</h3>
        <img src="${x.img}" style="width: 200px;"/>
      </div>`;
    } else if (y === "episodes") {
      detailsContainer.innerHTML = `
      <div class="card text-left">
        <h1>Episodes Title: ${x.title}</h1>
        <h3>Episode Number ${x.episode}</h3>
        <h3>Episode Season: ${x.season}</h3>
        <h3>Characters In THis Episode:
        <br>
        ${x.characters.join(" / ")}
        </h3>
      </div>`;
    } else if (y === "quotes") {
      detailsContainer.innerHTML = `
      <div class="card text-left">
        <h2>Quote: ${x.quote}</h2>
        <h2>Author: ${x.author}</h2>
      </div>`;
    } else if (y === "deaths") {
      detailsContainer.innerHTML = `
      <div class="card text-left">
        <h1>Death: ${x.death}</h1>
        <h1>Cause: ${x.cause}</h1>
        <h1>Episode: ${x.episode}</h1>
        <h1>Responsible$ {x.responsible}</h1>
      </div>`;
    }
  } catch {
    console.log(Error("Error"));
  }
}

get();
