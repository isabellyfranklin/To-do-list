const SuaListaDeTarefa = document.getElementById("SuaLista");
const avisoNenhumaLista = document.getElementById("semTarefa");
const btnMostraNovaTarefa = document.getElementById("BtnNovaTarefa");
const novaTarefa = document.getElementById("novaTarefa");
const resultadoVezesNaSemana = document.getElementById("resultado-vezes");
const imagem = "./img/icon-delete.svg";
const progressoGeral = document.getElementById("progressoGeral");


let corAtual = "";

function verificarListaVazia() {
    if (SuaListaDeTarefa.children.length === 0) {
        avisoNenhumaLista.style.display = "flex";
    } else {
        avisoNenhumaLista.style.display = "none";
    }
}

function adicionar() {
    const nomeTarefa = document.getElementById("nome-tarefa").value;
    if (nomeTarefa === "") {
        alert("Por favor, adicionar uma tarefa");
        return;
    }

    const metaSemana = parseInt(resultadoVezesNaSemana.textContent) || 1;
    const corEscolhida = corAtual !== "" ? corAtual.style.backgroundColor : "#333";

    const novaLi = document.createElement("li");
    novaLi.innerHTML = `
        <div class="card-tarefa" data-feitas="0" data-meta="${metaSemana}" data-cor="${corEscolhida}" style="border-left: 5px solid ${corEscolhida}">
         <span class="btn-excluir" title="Excluir tarefa">
         <img src="${imagem}" alt="Excluir">
         </span>
            <div class="circulo"><span>0%</span></div>
            <div class="conteudo">
                <h2>${nomeTarefa}</h2>
                <p>0 / 31 vezes este mês · ${metaSemana}/sem</p>
                <div class="dias">
                    <div class="dia" data-indice="0">S</div>
                    <div class="dia" data-indice="1">T</div>
                    <div class="dia" data-indice="2">Q</div>
                    <div class="dia" data-indice="3">Q</div>
                    <div class="dia" data-indice="4">S</div>
                    <div class="dia" data-indice="5">S</div>
                    <div class="dia" data-indice="6">D</div>
                </div>
                <button class="feito" style="background-color: ${corEscolhida}">✓ Feito hoje</button>
            </div>
        </div>
    `;

    SuaListaDeTarefa.appendChild(novaLi);
    novaTarefa.style.display = "none";
    document.getElementById("nome-tarefa").value = "";
    verificarListaVazia();
    atualizarProgressoGeral(); 
}

btnMostraNovaTarefa.addEventListener("click", function () {
    novaTarefa.style.display = "flex";
});

function cancelar() {
    novaTarefa.style.display = "none";
    document.getElementById("nome-tarefa").value = "";
    resultadoVezesNaSemana.textContent = "";

    caixas.forEach(function (item) {
        item.style.backgroundColor = "";
    });

    corAtual = "";
    document.querySelector(".btns button").style.backgroundColor = "";
}

const cores = document.querySelectorAll(".cores");
cores.forEach(function (cor) {
    cor.addEventListener("click", function () {
        corAtual = cor;
        const btnAdicionar = document.querySelector(".btns button");
        btnAdicionar.style.backgroundColor = cor.style.backgroundColor;
        resultadoVezesNaSemana.style.color = cor.style.backgroundColor;
    });
});

const caixas = document.querySelectorAll(".vezes");
caixas.forEach(function (caixa) {
    caixa.addEventListener("click", function () {
        caixas.forEach(function (item) {
            item.style.backgroundColor = "";
        });
        if (corAtual !== "") {
            caixa.style.backgroundColor = corAtual.style.backgroundColor;
        }
        resultadoVezesNaSemana.textContent = caixa.textContent + " x ";
    });
});

SuaListaDeTarefa.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("feito")) {
        const card = evento.target.closest(".card-tarefa");
        const indiceHoje = (new Date().getDay() + 6) % 7;
        const diaHoje = card.querySelector(`.dia[data-indice="${indiceHoje}"]`);

        if (diaHoje.classList.contains("feito-dia")) {
            alert("Você já marcou isso hoje!");
            return;
        }

        const cor = card.dataset.cor;
        diaHoje.classList.add("feito-dia");
        diaHoje.style.backgroundColor = cor;

        const feitas = parseInt(card.dataset.feitas) + 1;
        card.dataset.feitas = feitas;

        const meta = card.dataset.meta;
        card.querySelector(".conteudo p").textContent =
            `${feitas} / 27 vezes este mês · ${meta}/sem`;

        const porcentagem = Math.round((feitas / meta) * 100);
        card.querySelector(".circulo span").textContent = porcentagem + "%";
        card.querySelector(".circulo").style.borderColor = cor;
        atualizarProgressoGeral();  
    }

    if (evento.target.closest(".btn-excluir")){
        const card = evento.target.closest(".card-tarefa");
        card.closest("li").remove();
        atualizarProgressoGeral();  
    } 
});

function atualizarProgressoGeral() {
    const cards = document.querySelectorAll(".card-tarefa");

    if (cards.length === 0) {
        progressoGeral.textContent = "0%";
        progressoGeral.style.color = "gray";
        return;
    }

    let somaPorcentagens = 0;
    cards.forEach(function (card) {
        const feitas = parseInt(card.dataset.feitas);
        const meta = parseInt(card.dataset.meta);
        const porcentagem = Math.round((feitas / meta) * 100);
        somaPorcentagens += porcentagem;
    });

    const mediaGeral = Math.round(somaPorcentagens / cards.length);
    progressoGeral.textContent = mediaGeral + "%";

    if (mediaGeral >= 70) {
        progressoGeral.style.color = "#4caf50"; // verde
    } else if (mediaGeral >= 40) {
        progressoGeral.style.color = "#ff9800"; // laranja
    } else {
        progressoGeral.style.color = "#f44336"; // vermelho
    }
}

verificarListaVazia();
atualizarProgressoGeral();