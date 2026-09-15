const doryokutiButton = document.getElementById("doryokutiButton");
const hpButton = document.getElementById("hpButton");
const kaihukuryouButton = document.getElementById("kaihukuryouButton");

const doryokutiPage = document.getElementById("doryokutiPage");
const hpPage = document.getElementById("hpPage");
const kaihukuryouPage = document.getElementById("kaihukuryouPage");


doryokutiButton.addEventListener("click", function() {
    doryokutiPage.style.display = "block";
    hpPage.style.display = "none";
    kaihukuryouPage.style.display = "none";

    doryokutiButton.classList.add("active-menu");
    hpButton.classList.remove("active-menu");
    kaihukuryouButton.classList.remove("active-menu");
});


hpButton.addEventListener("click", function() {
    doryokutiPage.style.display = "none";
    hpPage.style.display = "block";
    kaihukuryouPage.style.display = "none";

    doryokutiButton.classList.remove("active-menu");
    hpButton.classList.add("active-menu");
    kaihukuryouButton.classList.remove("active-menu");
});


kaihukuryouButton.addEventListener("click", function() {
    doryokutiPage.style.display = "none";
    hpPage.style.display = "none";
    kaihukuryouPage.style.display = "block";

    doryokutiButton.classList.remove("active-menu");
    hpButton.classList.remove("active-menu");
    kaihukuryouButton.classList.add("active-menu");
});


hpPage.style.display = "none";
kaihukuryouPage.style.display = "none";
doryokutiButton.classList.add("active-menu");


const pokemonName = document.getElementById("pokemonName");
const beforeHP = document.getElementById("beforeHP");
const afterHP = document.getElementById("afterHP");
const nokoriHP = document.getElementById("nokoriHP");
const doryokutiCalculate = document.getElementById("doryokutiCalculate");

doryokutiCalculate.addEventListener("click", function() {

    if (
        pokemonName.value === "" ||
        beforeHP.value === "" ||
        afterHP.value === "" ||
        nokoriHP.value === ""
    ) {
        document.getElementById("doryokutiResult").textContent = "すべての項目を入力してください";
        return;
    }

    if (!pokemonNames.includes(pokemonName.value)) {
        document.getElementById("doryokutiResult").textContent = "正式なポケモン名を入力してください";
        return;
    }

    const data = new URLSearchParams();

    data.append("pokemonName", pokemonName.value);
    data.append("beforeHP", beforeHP.value);
    data.append("afterHP", afterHP.value);
    data.append("nokoriHP", nokoriHP.value);

    fetch("/calculate/doryokuti", {
        method: "POST",
        body: data
    })
    .then(response => {
        return response.text();
    })
    .then(result => {
        document.getElementById("doryokutiResult").textContent = "HP努力値候補：" + result;
    });
});


const pokemonName2 = document.getElementById("pokemonName2");
const hdoryokuti = document.getElementById("hdoryokuti");
const hpwariai = document.getElementById("hpwariai");
const hpyosouCalculate = document.getElementById("hpyosouCalculate");

hpyosouCalculate.addEventListener("click", function() {

    if (
        pokemonName2.value === "" ||
        hdoryokuti.value === "" ||
        hpwariai.value === ""
    ) {
        document.getElementById("hpyosouResult").textContent = "すべての項目を入力してください";
        return;
    }

    if (!pokemonNames.includes(pokemonName2.value)) {
        document.getElementById("hpyosouResult").textContent = "正式なポケモン名を入力してください";
        return;
    }

    const data = new URLSearchParams();

    data.append("pokemonName2", pokemonName2.value);
    data.append("hdoryokuti", hdoryokuti.value);
    data.append("hpwariai", hpwariai.value);

    fetch("/calculate/hp", {
        method: "POST",
        body: data
    })
    .then(response => {
        return response.text();
    })
    .then(result => {
        document.getElementById("hpyosouResult").textContent = "相手の残りHP:" + result;
    });
});


const pokemonName3 = document.getElementById("pokemonName3");
const adoryokuti = document.getElementById("adoryokuti");
const ahosei = document.getElementById("ahosei");
const aranku = document.getElementById("aranku");

kaihukuryouCalculate.addEventListener("click", function() {

    if (
        pokemonName3.value === "" ||
        adoryokuti.value === "" ||
        ahosei.value === "" ||
        aranku.value === ""
    ) {
        document.getElementById("kaihukuryouResult").textContent = "すべての項目を入力してください";
        return;
    }

    if (!pokemonNames.includes(pokemonName3.value)) {
        document.getElementById("kaihukuryouResult").textContent = "正式なポケモン名を入力してください";
        return;
    }

    const data = new URLSearchParams();

    data.append("pokemonName3", pokemonName3.value);
    data.append("adoryokuti", adoryokuti.value);
    data.append("ahosei", ahosei.value);
    data.append("aranku", aranku.value);

    fetch("/calculate/kaihukuryou", {
        method: "POST",
        body: data
    })
    .then(response => {
        return response.text();
    })
    .then(result => {
        document.getElementById("kaihukuryouResult").textContent = "回復量:" + result;
    });
});


/*予測変換*/
const pokemonSuggestions =
    document.getElementById("pokemonSuggestions");

const pokemonSuggestions2 =
    document.getElementById("pokemonSuggestions2");

const pokemonSuggestions3 =
    document.getElementById("pokemonSuggestions3");

function setupPokemonSearch(inputElement, suggestionsElement) {

    inputElement.addEventListener("input", function() {

        const input = inputElement.value;

        suggestionsElement.innerHTML = "";

        if (input === "") {
            return;
        }

        const katakanaInput = input.replace(
            /[\u3041-\u3096]/g,
            function(char) {
                return String.fromCharCode(
                    char.charCodeAt(0) + 0x60
                );
            }
        );

        const candidates = pokemonNames.filter(function(name) {
            return name.includes(input) ||
                   name.includes(katakanaInput);
        });

        if (pokemonNames.includes(input)) {
            suggestionsElement.innerHTML = "";
            return;
        }

        candidates.forEach(function(name) {

            const suggestion = document.createElement("div");

            suggestion.textContent = name;

            suggestion.addEventListener("click", function() {
                inputElement.value = name;
                suggestionsElement.innerHTML = "";
            });

            suggestionsElement.appendChild(suggestion);
        });
    });
}

setupPokemonSearch(
    pokemonName,
    pokemonSuggestions
);

setupPokemonSearch(
    pokemonName2,
    pokemonSuggestions2
);

setupPokemonSearch(
    pokemonName3,
    pokemonSuggestions3
);