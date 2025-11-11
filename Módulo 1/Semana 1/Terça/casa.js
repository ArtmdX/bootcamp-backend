// Cenário: E-commerce

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

// 3. Função que aplica taxa de serviço de 10% em todos
const aplicarTaxa = pedidos => {
  // implementar (map)
};

// 4. Função que encontra pedido por ID
const buscarPedido = (pedidos, id) => {
  // implementar (find)
};

// 5. DESAFIO: Valor médio dos pedidos entregues
const mediaEntregues = pedidos => {
  // implementar
};
