lista = document.getElementById("lista")
let personagens = [];

async function getPersonagens(){
    axios.get("https://rickandmortyapi.com/api/character").then ((result) => {
       personagens.push(result.data.results);

       criaCard()

        console.log(personagens.length);

       console.log(personagens);
    }).catch((err) => {
        console.log(err);
    })
}
function criaCard() {
    // console.log(personagens[1].name);
    console.log(personagens[0].length);
    // console.log(personagens.info.count);

    personagens.forEach(personagem => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <img src="${personagem.image}" alt="" srcset="">

        <h4 class="teste">${personagem.name}</h4>

        <h4>Status: ${personagem.status}</h4>

        <h4>Espécie: ${personagem.species}</h4>
        </div>
        `
    });
}


async function footerInfo() {
    try {
      const responseChar = (await api.get('character')).data
      const responseLoc = (await api.get('character')).data
      const responseEp = (await api.get('character')).data

      const characters = responseChar.info.count
      const locations = responseLoc.info.count

    const foooterPersonagens = document.getElementById("footerPerson");

    foooterPersonagens.innerHTML = `${characters}`

    } catch(err) {
        console.log(err);
    }
}







getPersonagens()
