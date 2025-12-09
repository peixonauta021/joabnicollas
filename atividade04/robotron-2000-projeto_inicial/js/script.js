const botoes = document.querySelectorAll(".controle-ajuste");
const estatNumElems = document.querySelectorAll(".estatistica-numero");
const baseStats = Array.from(estatNumElems).map(el => parseInt(el.textContent));

const multiplicadoresPorPeca = {
  "braços":    [10, 2, 0, 1],
  "blindagem": [6, 8, 4, 0],
  "núcleos":   [0, 10, 12, 1],
  "pernas":    [4, 2, 0, 10],
  "foguetes":  [2, 6, 8, 5]
};

function atualizarEstatisticas() {
  const pecas = document.querySelectorAll(".peca");
  let incremento = [0, 0, 0, 0];

  pecas.forEach(peca => {
    const tituloEl = peca.querySelector(".peca-titulo");
    const nomePeca = tituloEl ? tituloEl.textContent.trim().toLowerCase() : "";
    const contador = peca.querySelector(".controle-contador");
    let qtd = contador ? parseInt(contador.value) || 0 : 0;

    if (multiplicadoresPorPeca[nomePeca]) {
      const mult = multiplicadoresPorPeca[nomePeca];
      for (let i = 0; i < incremento.length; i++) {
        incremento[i] += mult[i] * qtd;
      }
    }
  });

  for (let i = 0; i < estatNumElems.length; i++) {
    estatNumElems[i].textContent = baseStats[i] + incremento[i];
  }
}

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const controle = botao.parentNode;
    const contador = controle.querySelector(".controle-contador");

    let valor = parseInt(contador.value) || 0;
    const txt = botao.textContent.trim();

    if ((txt === "+" || txt === "＋") && valor < 10) valor++;
    if ((txt === "-" || txt === "−") && valor > 0) valor--;

    contador.value = valor.toString().padStart(2, "0");
    atualizarEstatisticas();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  atualizarEstatisticas();
});