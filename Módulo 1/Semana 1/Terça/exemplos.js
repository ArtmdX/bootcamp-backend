const produtos = [
  { nome: 'Mouse', preco: 50 },
  { nome: 'Teclado', preco: 150 },
  { nome: 'Monitor', preco: 800 },
  { nome: 'Webcam', preco: 200 }
];

// 1. Criar função que retorna produtos abaixo de um preço
const abaixoDe = (produtos, precoMax) => {
  // implementar usando .filter
};

console.log(abaixoDe(produtos, 200));

// 2. Criar função que aplica desconto em todos os produtos
const aplicarDesconto = (produtos, percentual) => {
  // implementar usando .map
  // retornar novo array com precos atualizados
};

console.log(aplicarDesconto(produtos, 10));

// 3. Criar função que calcula o preço total
const calcularTotal = produtos => {
  // implementar usando .reduce
};

console.log(calcularTotal(produtos)); // 1200

// 4. DESAFIO: Produtos abaixo de 500 com 15% de desconto
const produtosComDesconto = produtos => {
  // usar .filter + .map + .reduce
  // filtrar abaixo de 500
  // aplicar 15% desconto
  // calcular total
};
