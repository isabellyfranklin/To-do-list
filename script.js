const SuaListaDeTarefa = document.getElementById("SuaLista");
const avisoNenhumaLista = document.getElementById("semTarefa");
const btnMostraNovaTarefa = document.getElementById("BtnNovaTarefa");
const novaTarefa = document.getElementById("novaTarefa");
const resultadoVezesNaSemana = document.getElementById("resultado-vezes");

let corAtual = "";

function verificarListaVazia() {
    if (SuaListaDeTarefa.children.length === 0) {
        avisoNenhumaLista.style.display = "block";
    } else {
        avisoNenhumaLista.style.display = "none";
    }
}

function adicionar() {
    const nomeTarefa = document.getElementById("nome-tarefa").value;

    if (nomeTarefa === "") {
        alert("Por favor, adicionar uma tarefa");
        return; // para aqui, não continua criando a tarefa
    }

    const novaLi = document.createElement("li");
    novaLi.innerHTML = `
        <div class="card-tarefa">
            <div class="circulo"><span>0%</span></div>
            <div class="conteudo">
                <h2>${nomeTarefa}</h2>
                <p>0 / 27 vezes este mês · ${resultadoVezesNaSemana.textContent}/sem</p>
                <div class="dias">
                    <div class="dia">S</div>
                    <div class="dia">T</div>
                    <div class="dia">Q</div>
                    <div class="dia">Q</div>
                    <div class="dia">S</div>
                    <div class="dia">S</div>
                    <div class="dia">D</div>
                </div>
                <button class="feito">✓ Feito hoje</button>
            </div>
        </div>
    `;

    SuaListaDeTarefa.appendChild(novaLi);

    novaTarefa.style.display = "none";
    document.getElementById("nome-tarefa").value = "";

    verificarListaVazia(); // atualiza o aviso depois de adicionar
}


// ==========================================
// 3. LISTENERS de elementos que JÁ EXISTEM desde o início
//    (botão de abrir formulário, seletor de cor, etc)
// ==========================================
btnMostraNovaTarefa.addEventListener("click", function () {
    novaTarefa.style.display = "flex";
});

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


// ==========================================
// 4. DELEGAÇÃO DE EVENTOS: para elementos que AINDA NÃO EXISTEM
//    (os botões "Feito hoje" dentro de cada card criado dinamicamente)
// ==========================================
SuaListaDeTarefa.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("feito")) {
        console.log("Clicou no botão feito de:", evento.target);
        // aqui você trata a lógica de marcar como feito
    }
});


// ==========================================
// 5. POR ÚLTIMO: rodar checagens iniciais
//    (isso roda uma vez, assim que a página carrega)
// ==========================================
verificarListaVazia();