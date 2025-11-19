/**
 * ============================================
 * TERÇA-FEIRA - DEVER DE CASA
 * Sistema de Pedidos com async/await
 * ============================================
 *
 * OBJETIVO:
 * Criar um sistema completo de gerenciamento de pedidos
 * usando Promises e async/await
 *
 * TEMPO ESTIMADO: 1-1.5 horas
 */

// ============================================
// TIPOS E INTERFACES
// ============================================

interface Cliente {
  id: number;
  nome: string;
  email: string;
  credito: number;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
}

interface ItemPedido {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Pedido {
  id: number;
  clienteId: number;
  itens: ItemPedido[];
  total: number;
  status: "pendente" | "processando" | "aprovado" | "cancelado";
  dataCriacao: Date;
}

interface ResultadoPagamento {
  sucesso: boolean;
  pedidoId: number;
  mensagem: string;
}

// ============================================
// BANCO DE DADOS SIMULADO
// ============================================

const clientes: Cliente[] = [
  { id: 1, nome: "Samuel Silva", email: "samuel@email.com", credito: 5000 },
  { id: 2, nome: "Arthur Costa", email: "arthur@email.com", credito: 3000 },
  { id: 3, nome: "Maria Santos", email: "maria@email.com", credito: 1000 },
];

const produtos: Produto[] = [
  { id: 1, nome: "Notebook", preco: 3000, estoque: 5, categoria: "Eletrônicos" },
  { id: 2, nome: "Mouse", preco: 50, estoque: 20, categoria: "Acessórios" },
  { id: 3, nome: "Teclado", preco: 150, estoque: 15, categoria: "Acessórios" },
  { id: 4, nome: "Monitor", preco: 800, estoque: 8, categoria: "Eletrônicos" },
  { id: 5, nome: "Webcam", preco: 200, estoque: 0, categoria: "Acessórios" },
];

const pedidos: Pedido[] = [];

// ============================================
// PARTE 1: FUNÇÕES DE BUSCA
// ============================================

/**
 * TODO 1: Implemente buscarCliente
 *
 * - Busca cliente por ID no array de clientes
 * - Delay de 300ms
 * - Se não encontrar, rejeitar com erro "Cliente não encontrado"
 */
function buscarCliente(id: number): Promise<Cliente> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cliente = clientes.find((c) => c.id === id);
      if (cliente) {
        resolve(cliente);
      } else {
        reject(new Error("Cliente não encontrado"));
      }
    }, 300);
  });
}

/**
 * TODO 2: Implemente buscarProduto
 *
 * - Busca produto por ID no array de produtos
 * - Delay de 400ms
 * - Se não encontrar, rejeitar com erro "Produto não encontrado"
 */
function buscarProduto(id: number): Promise<Produto> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produto = produtos.find((p) => p.id === id);
      if (produto) {
        resolve(produto);
      } else {
        reject(new Error("Produto não encontrado"));
      }
    }, 400);
  });
}

// ============================================
// PARTE 2: FUNÇÕES DE VALIDAÇÃO
// ============================================

/**
 * TODO 3: Implemente validarEstoque
 *
 * - Verifica se produto tem estoque suficiente
 * - Delay de 200ms
 * - Se não tiver estoque, rejeitar com erro "Produto sem estoque"
 * - Se estoque insuficiente, rejeitar com erro "Estoque insuficiente"
 */
function validarEstoque(produto: Produto, quantidade: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (produto.estoque === 0) {
        reject(new Error(`Produto "${produto.nome}" sem estoque`));
      } else if (produto.estoque < quantidade) {
        reject(
          new Error(
            `Estoque insuficiente. Disponível: ${produto.estoque}, Solicitado: ${quantidade}`
          )
        );
      } else {
        resolve();
      }
    }, 200);
  });
}

/**
 * TODO 4: Implemente validarCredito
 *
 * - Verifica se cliente tem crédito suficiente
 * - Delay de 300ms
 * - Se crédito insuficiente, rejeitar com erro apropriado
 */
function validarCredito(cliente: Cliente, valor: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cliente.credito < valor) {
        reject(
          new Error(
            `Crédito insuficiente. Disponível: R$ ${cliente.credito}, Necessário: R$ ${valor}`
          )
        );
      } else {
        resolve();
      }
    }, 300);
  });
}

// ============================================
// PARTE 3: FUNÇÕES DE PROCESSAMENTO
// ============================================

/**
 * TODO 5: Implemente criarPedido
 *
 * - Cria um novo pedido com ID aleatório
 * - Status inicial: "pendente"
 * - Adiciona ao array de pedidos
 * - Delay de 500ms
 */
function criarPedido(
  clienteId: number,
  itens: ItemPedido[]
): Promise<Pedido> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pedido: Pedido = {
        id: Math.floor(Math.random() * 100000),
        clienteId,
        itens,
        total: itens.reduce((sum, item) => sum + item.subtotal, 0),
        status: "pendente",
        dataCriacao: new Date(),
      };

      pedidos.push(pedido);
      resolve(pedido);
    }, 500);
  });
}

/**
 * TODO 6: Implemente processarPagamento
 *
 * - Simula processamento de pagamento
 * - Delay de 1000ms
 * - 90% de chance de sucesso
 * - Atualiza status do pedido para "aprovado" ou "cancelado"
 * - Atualiza crédito do cliente se aprovado
 */
function processarPagamento(
  pedido: Pedido,
  cliente: Cliente
): Promise<ResultadoPagamento> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const aprovado = Math.random() > 0.1; // 90% de aprovação

      if (aprovado) {
        pedido.status = "aprovado";
        cliente.credito -= pedido.total;

        resolve({
          sucesso: true,
          pedidoId: pedido.id,
          mensagem: "Pagamento aprovado com sucesso",
        });
      } else {
        pedido.status = "cancelado";

        resolve({
          sucesso: false,
          pedidoId: pedido.id,
          mensagem: "Pagamento recusado",
        });
      }
    }, 1000);
  });
}

/**
 * TODO 7: Implemente atualizarEstoque
 *
 * - Reduz o estoque dos produtos vendidos
 * - Delay de 400ms
 */
function atualizarEstoque(itens: ItemPedido[]): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      itens.forEach((item) => {
        const produto = produtos.find((p) => p.id === item.produtoId);
        if (produto) {
          produto.estoque -= item.quantidade;
        }
      });
      resolve();
    }, 400);
  });
}

/**
 * TODO 8: Implemente enviarNotificacao
 *
 * - Simula envio de email/SMS
 * - Delay de 300ms
 * - 95% de chance de sucesso
 */
function enviarNotificacao(
  cliente: Cliente,
  pedido: Pedido
): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.05) {
        resolve();
      } else {
        reject(new Error("Falha ao enviar notificação"));
      }
    }, 300);
  });
}

// ============================================
// PARTE 4: FUNÇÃO PRINCIPAL
// ============================================

/**
 * TODO 9: Implemente realizarPedido
 *
 * FLUXO COMPLETO:
 * 1. Buscar cliente
 * 2. Buscar todos os produtos
 * 3. Validar estoque de cada produto
 * 4. Calcular total
 * 5. Validar crédito do cliente
 * 6. Criar pedido
 * 7. Processar pagamento
 * 8. Se aprovado:
 *    - Atualizar estoque
 *    - Enviar notificação
 * 9. Exibir resumo completo
 *
 * IMPORTANTE:
 * - Use try/catch
 * - Exiba mensagens claras em cada etapa
 * - Trate todos os erros possíveis
 */

interface ItemCarrinho {
  produtoId: number;
  quantidade: number;
}

async function realizarPedido(
  clienteId: number,
  carrinho: ItemCarrinho[]
): Promise<void> {
  try {
    console.log("\n" + "=".repeat(50));
    console.log("🛍️  INICIANDO NOVO PEDIDO");
    console.log("=".repeat(50) + "\n");

    const inicio = Date.now();

    // 1. Buscar cliente
    console.log("[1/8] Buscando dados do cliente...");
    const cliente = await buscarCliente(clienteId);
    console.log(`✅ Cliente: ${cliente.nome}`);
    console.log(`   Crédito disponível: R$ ${cliente.credito}\n`);

    // 2. Buscar produtos
    console.log("[2/8] Buscando produtos...");
    const produtos = await Promise.all(
      carrinho.map((item) => buscarProduto(item.produtoId))
    );
    console.log(`✅ ${produtos.length} produto(s) encontrado(s)\n`);

    // 3. Validar estoque
    console.log("[3/8] Validando estoque...");
    await Promise.all(
      carrinho.map((item, index) =>
        validarEstoque(produtos[index], item.quantidade)
      )
    );
    console.log("✅ Estoque disponível para todos os produtos\n");

    // 4. Montar itens do pedido
    console.log("[4/8] Calculando valores...");
    const itensPedido: ItemPedido[] = carrinho.map((item, index) => ({
      produtoId: item.produtoId,
      nomeProduto: produtos[index].nome,
      quantidade: item.quantidade,
      precoUnitario: produtos[index].preco,
      subtotal: produtos[index].preco * item.quantidade,
    }));

    const total = itensPedido.reduce((sum, item) => sum + item.subtotal, 0);
    console.log(`✅ Total do pedido: R$ ${total.toFixed(2)}\n`);

    // 5. Validar crédito
    console.log("[5/8] Validando crédito...");
    await validarCredito(cliente, total);
    console.log("✅ Cliente tem crédito suficiente\n");

    // 6. Criar pedido
    console.log("[6/8] Criando pedido...");
    const pedido = await criarPedido(cliente.id, itensPedido);
    console.log(`✅ Pedido #${pedido.id} criado\n`);

    // 7. Processar pagamento
    console.log("[7/8] Processando pagamento...");
    const resultadoPagamento = await processarPagamento(pedido, cliente);

    if (!resultadoPagamento.sucesso) {
      console.log(`\n❌ ${resultadoPagamento.mensagem}`);
      console.log("O pedido foi cancelado.\n");
      return;
    }

    console.log(`✅ ${resultadoPagamento.mensagem}\n`);

    // 8. Finalizar (estoque e notificação)
    console.log("[8/8] Finalizando...");
    await atualizarEstoque(itensPedido);
    console.log("✅ Estoque atualizado");

    try {
      await enviarNotificacao(cliente, pedido);
      console.log("✅ Notificação enviada");
    } catch (erro) {
      console.log("⚠️ Falha ao enviar notificação (não crítico)");
    }

    const fim = Date.now();

    // Resumo final
    console.log("\n" + "=".repeat(50));
    console.log("✅ PEDIDO REALIZADO COM SUCESSO!");
    console.log("=".repeat(50));
    console.log(`\n📦 Pedido: #${pedido.id}`);
    console.log(`👤 Cliente: ${cliente.nome}`);
    console.log(`📧 Email: ${cliente.email}`);
    console.log(`\n📋 Itens:`);
    itensPedido.forEach((item) => {
      console.log(
        `   - ${item.quantidade}x ${item.nomeProduto} - R$ ${item.subtotal.toFixed(2)}`
      );
    });
    console.log(`\n💰 Total: R$ ${pedido.total.toFixed(2)}`);
    console.log(`💳 Crédito restante: R$ ${cliente.credito.toFixed(2)}`);
    console.log(`⏱️  Tempo de processamento: ${((fim - inicio) / 1000).toFixed(2)}s\n`);
  } catch (erro) {
    console.log("\n" + "=".repeat(50));
    console.log("❌ ERRO NO PROCESSAMENTO DO PEDIDO");
    console.log("=".repeat(50));
    console.log(`\n${(erro as Error).message}\n`);
  }
}

// ============================================
// PARTE 5: FUNÇÕES EXTRAS (OPCIONAL)
// ============================================

/**
 * TODO 10 (OPCIONAL): Implemente listarPedidosCliente
 *
 * - Lista todos os pedidos de um cliente
 * - Mostra resumo de cada pedido
 */
async function listarPedidosCliente(clienteId: number): Promise<void> {
  try {
    const cliente = await buscarCliente(clienteId);
    const pedidosCliente = pedidos.filter((p) => p.clienteId === clienteId);

    console.log(`\n📋 PEDIDOS DE ${cliente.nome.toUpperCase()}`);
    console.log("=".repeat(50) + "\n");

    if (pedidosCliente.length === 0) {
      console.log("Nenhum pedido encontrado.\n");
      return;
    }

    pedidosCliente.forEach((pedido) => {
      console.log(`Pedido #${pedido.id}`);
      console.log(`  Status: ${pedido.status}`);
      console.log(`  Total: R$ ${pedido.total.toFixed(2)}`);
      console.log(`  Data: ${pedido.dataCriacao.toLocaleString("pt-BR")}`);
      console.log(`  Itens: ${pedido.itens.length}`);
      console.log("");
    });
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

/**
 * TODO 11 (OPCIONAL): Implemente relatorioEstoque
 *
 * - Exibe relatório de estoque de todos os produtos
 * - Destaca produtos com estoque baixo (< 5)
 */
async function relatorioEstoque(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("\n📊 RELATÓRIO DE ESTOQUE");
      console.log("=".repeat(50) + "\n");

      produtos.forEach((produto) => {
        const alerta = produto.estoque < 5 ? "⚠️ " : "";
        console.log(
          `${alerta}${produto.nome.padEnd(20)} | Estoque: ${produto.estoque.toString().padStart(3)} | Preço: R$ ${produto.preco}`
        );
      });

      console.log("");
      resolve();
    }, 500);
  });
}

// ============================================
// PARTE 6: TESTES
// ============================================

console.log("\n🧪 INICIANDO TESTES DO SISTEMA\n");

// TESTE 1: Pedido simples bem-sucedido
setTimeout(() => {
  console.log("TESTE 1: Pedido simples");
  realizarPedido(1, [
    { produtoId: 2, quantidade: 2 }, // Mouse
    { produtoId: 3, quantidade: 1 }, // Teclado
  ]);
}, 1000);

// TESTE 2: Pedido de valor alto
setTimeout(() => {
  console.log("TESTE 2: Pedido de valor alto");
  realizarPedido(1, [
    { produtoId: 1, quantidade: 1 }, // Notebook
    { produtoId: 4, quantidade: 1 }, // Monitor
  ]);
}, 6000);

// TESTE 3: Cliente sem crédito suficiente
setTimeout(() => {
  console.log("TESTE 3: Crédito insuficiente");
  realizarPedido(3, [
    { produtoId: 1, quantidade: 2 }, // 2 Notebooks = 6000
  ]);
}, 11000);

// TESTE 4: Produto sem estoque
setTimeout(() => {
  console.log("TESTE 4: Produto sem estoque");
  realizarPedido(2, [
    { produtoId: 5, quantidade: 1 }, // Webcam (estoque = 0)
  ]);
}, 14000);

// TESTE 5: Cliente inexistente
setTimeout(() => {
  console.log("TESTE 5: Cliente inexistente");
  realizarPedido(999, [{ produtoId: 2, quantidade: 1 }]);
}, 16000);

// TESTE 6: Listar pedidos de um cliente
setTimeout(() => {
  listarPedidosCliente(1);
}, 18000);

// TESTE 7: Relatório de estoque
setTimeout(() => {
  relatorioEstoque();
}, 20000);

// ============================================
// DESAFIOS EXTRAS (OPCIONAL)
// ============================================

/**
 * Se você terminou tudo, tente implementar:
 *
 * 1. Cancelar Pedido
 *    - Cancela um pedido aprovado
 *    - Restaura estoque
 *    - Reembolsa crédito
 *
 * 2. Aplicar Cupom de Desconto
 *    - Valida cupom
 *    - Aplica desconto no total
 *    - Limite de uso por cliente
 *
 * 3. Calcular Frete
 *    - Baseado no CEP (simule 3 regiões)
 *    - Frete grátis acima de X reais
 *
 * 4. Sistema de Pontos
 *    - Cliente ganha pontos a cada compra
 *    - Pode usar pontos como desconto
 *
 * 5. Parcelamento
 *    - Divide pagamento em X vezes
 *    - Valida se parcela mínima é respeitada
 */

// ============================================
// CRITÉRIOS DE AVALIAÇÃO
// ============================================

/**
 * ✅ CHECKLIST:
 *
 * [ ] Todas as funções TODO implementadas
 * [ ] Usa async/await corretamente
 * [ ] Tratamento de erros com try/catch
 * [ ] Validações funcionando
 * [ ] Mensagens claras no console
 * [ ] Testes executam sem erros
 * [ ] Código bem organizado
 * [ ] Tipos TypeScript corretos
 *
 * 🎯 CONCEITOS PRATICADOS:
 *
 * - Promises e async/await
 * - Operações sequenciais
 * - Validações assíncronas
 * - Tratamento de erros
 * - Fluxos complexos
 * - Manipulação de arrays
 * - Cálculos
 *
 * 💡 DICAS:
 *
 * 1. Implemente uma função de cada vez
 * 2. Teste cada função isoladamente
 * 3. Use console.log para debugar
 * 4. Revise os exemplos das aulas se travar
 * 5. Não tenha medo de errar!
 */

/**
 * 🎓 PRÓXIMA AULA:
 * Quarta-feira - Tratamento de erros e operações paralelas
 */
