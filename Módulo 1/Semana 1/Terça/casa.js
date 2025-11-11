// Cenário: E-commerce
const numeros = [2, 64, 6, 6, 16, 1, 6, 41];

const pedidos = [
  { id: 1, valor: 150, status: 'entregue' },
  { id: 2, valor: 200, status: 'pendente' },
  { id: 3, valor: 50, status: 'entregue' },
  { id: 4, valor: 300, status: 'cancelado' },
  { id: 5, valor: 100, status: 'entregue' }
];

// 1. Função que retorna apenas pedidos entregues
const pedidosEntregues = pedidos => {
  // implementar
};

// 2. Função que retorna o valor total dos pedidos entregues
const valorTotalEntregue = pedidos => {
  // implementar (filter + reduce)
};

// 3. Função que encontra pedido por ID
const buscarPedido = (pedidos, id) => {
  // implementar (find)
};

// 4. DESAFIO: Valor médio dos pedidos entregues
const mediaEntregues = pedidos => {
  // implementar
};

// Exemplo como iterar sobre um array

// for (const pedido of pedidos) {
//   console.log(pedido.valor);
// }

// for (let i; i < pedidos.length; i++) {
//   console.log(pedidos[i].valor);
// }

// pedidos.forEach(pedidos => {
//   console.log(pedidos.valor);
// });
