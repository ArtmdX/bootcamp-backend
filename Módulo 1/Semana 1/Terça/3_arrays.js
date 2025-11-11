// Criar arrays (revisão rápida)
const numeros = [1, 2, 3, 4, 5];
const nomes = ['Ana', 'João', 'Maria'];

// 1. .map() - Transformar cada elemento
// "Pegue cada número e devolva ele multiplicado por 2"
const dobrados = numeros.map(num => num * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]

const maiusculos = nomes.map(nome => nome.toUpperCase());
console.log(maiusculos); // ["ANA", "JOÃO", "MARIA"]

// 2. .filter() - Selecionar elementos que atendem condição
// "Pegue apenas os números pares"
const pares = numeros.filter(num => num % 2 === 0);
console.log(pares); // [2, 4]

const nomesComA = nomes.filter(nome => nome.includes('a'));
console.log(nomesComA); // ["Ana", "Maria"]

// 3. .find() - Encontrar o PRIMEIRO elemento que atende condição
const primeiroPar = numeros.find(num => num % 2 === 0);
console.log(primeiroPar); // 2

const nomeComJ = nomes.find(nome => nome.startsWith('J'));
console.log(nomeComJ); // "João"

// 4. .reduce() - Reduzir array a um único valor
const soma = numeros.reduce((acumulador, numero) => {
  return acumulador + numero;
}, 0); // 0 é o valor inicial

console.log(soma); // 15

// 5. IMPORTANTE: Encadeamento (chaining)
const resultado = numeros
  .filter(num => num > 2) // [3, 4, 5]
  .map(num => num * 2) // [6, 8, 10]
  .reduce((acc, num) => acc + num, 0); // 24

console.log(resultado); // 24
