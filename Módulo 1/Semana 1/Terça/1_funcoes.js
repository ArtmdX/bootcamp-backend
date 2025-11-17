// 1. Função tradicional
function somar(a, b) {
  return a + b;
}

console.log(somar(5, 3)); // 8

// 2. Arrow function (nossa preferência)
const subtrair = (a, b) => {
  return a - b;
};

console.log(subtrair(10, 4)); // 6

// 3. Arrow function simplificada
const multiplicar = (a, b) => a * b;
console.log(multiplicar(3, 4)); // 12

// 4. Funções como parâmetros (importante para .map, .filter)
const executar = (funcao, a, b) => {
  return funcao(a, b);
};

console.log(executar(somar, 10, 5)); // 15
console.log(executar(multiplicar, 10, 5)); // 50

// 5. Parâmetros opcionais e valores padrão
const saudar = (nome, saudacao = 'Olá') => {
  return `${saudacao}, ${nome}!`;
};

saudar();
console.log(saudar('Samuel')); // Olá, Samuel!
console.log(saudar('Samuel', 'Bem-vindo')); // Bem-vindo, Samuel!
