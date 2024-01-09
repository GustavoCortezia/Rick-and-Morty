let lista = document.getElementById("lista")
let paginacao = document.getElementById("paginacao")

let personagens = [];

let currentPage = 1;
let totalPages = 0;


//CONTEUDO

async function getPersonagens(page) {
    try {
        const response = await api.get(`/character?page=${page}`);
        const characters = response.data.results;
        criaCard(characters);
    } catch (err) {
        console.error('ERRO AO ENCONTRAR OS PERSONAGENS: ', err);
    }
}

function criaCard(characters) {
    lista.innerHTML = '';
    
    characters.forEach(async character => {
        const card = document.createElement('div');
        const infos = document.createElement('div');
        card.classList.add('card')
        infos.classList.add('infos')

        const response = await api.get(character.episode[character.episode.length - 1])
        const episodeLink = response.data.name

            card.innerHTML = `
            <img class="imagemCard" src="${character.image}">`
            infos.innerHTML = `
                <h2 class="nome" > ${character.name}</h2>
                <h3 class="status" >${character.status} - ${character.species}</h3>
                <p class="ultimaLocal">
                    Última localização conhecida <br>
                    <b> ${character.location.name} </b> </p>
                <p class="ultimoEP">
                    Visto a última vez em: <b> ${episodeLink} </b> </p>
                `

            card.append(infos);
            lista.append(card); 
        });

}

function renderizarConteudo(data) {
    lista.innerHTML = '';
    if (buscando === true) {
        criaCard(data);
    } 
    else {
        criaCard(data);
        botaoPaginacao();
    }
}

// PAGINAÇÃO

function botaoPaginacao() {
    paginacao.innerHTML = '';

    const botaoAnterior = document.createElement('button');
    botaoAnterior.textContent = 'Anterior';

    const botaoProximo = document.createElement('button');
    botaoProximo.textContent = 'Proximo';


    botaoAnterior.addEventListener('click', () => anterior());
    paginacao.appendChild(botaoAnterior);
 
    botaoProximo.addEventListener('click', () => proximo());
    paginacao.appendChild(botaoProximo);
}

async function proximo() {
    const totalPages = 42;
    if (currentPage < totalPages) {
        currentPage++;
        await getPersonagens(currentPage);
    }
}


async function anterior() {
    if (currentPage >= 2) {
        currentPage--;
        await getPersonagens(currentPage);
    }
}


let buscando = false;
async function procuraPersonagem() {
    const busca = document.getElementById('busca').value;
    if (busca !== '') {
        buscando = true;

        try {
            const response = await api.get(`/character?name=${busca}`);
            renderizarConteudo(response.data.results);
        } catch (err) {
            console.error('Erro ao pesquisar personagens', err);
        }
    } 
    else {
        buscando = false;
        await getPersonagens(currentPage);
    }
}

//FOOTER

async function footerInfo() {
    try { 
        const characters = (await api.get('character')).data.info.count
        const locations = (await api.get('location')).data.info.count
        const episodes = (await api.get('episode')).data.info.count
        
        const foooterPersonagens = document.getElementById("footerPerson");
        const footerLocations = document.getElementById("footerLocal");
        const foooterEpisodes = document.getElementById("footerEp");

        foooterPersonagens.innerText = `${characters}`
        footerLocations.innerText = `${locations}`
        foooterEpisodes.innerText = `${episodes}`

    } catch(err) {
        console.log('Erro ao coletar as informações', err);
    }
}


// INICIAR PROGRAMA

async function start() {
    await getPersonagens(currentPage);
    botaoPaginacao();
    footerInfo();
}


start();
