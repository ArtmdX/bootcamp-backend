/**
 * ============================================
 * QUARTA-FEIRA - DEVER DE CASA
 * Sistema de E-commerce com Múltiplas Operações
 * ============================================
 *
 * OBJETIVO:
 * Criar um sistema completo de e-commerce que usa:
 * - Operações sequenciais (encadeamento)
 * - Operações paralelas (Promise.all/allSettled)
 * - Tratamento de erros
 * - Validações
 *
 * TEMPO ESTIMADO: 1-2 horas
 */

// ============================================
// TIPOS E INTERFACES
// ============================================

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

interface ItemCarrinho {
  produtoId: number;
  quantidade: number;
}

interface Pedido {
  id: number;
  usuarioId: number;
  itens: ItemPedido[];
  total: number;
  status: string;
  dataCriacao: Date;
}

interface ItemPedido {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Pagamento {
  pedidoId: number;
  valor: number;
  metodo: string;
  status: "aprovado" | "recusado" | "pendente";
  mensagem: string;
}

interface NotaFiscal {
  numero: string;
  pedidoId: number;
  valor: number;
  emissao: Date;
}

interface Email {
  destinatario: string;
  assunto: string;
  enviado: boolean;
}

// ============================================
// PARTE 1: FUNÇÕES AUXILIARES (SIMULAÇÃO DE APIs)
// ============================================

/**
 * TODO 1: Complete a função buscarUsuario
 *
 * - Recebe um ID
 * - Retorna Promise com dados do usuário
 * - Deve demorar 300ms
 * - Se ID for negativo, rejeitar com erro
 */
function buscarUsuario(id: number): Promise<Usuario> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("ID de usuário inválido"));
      } else {
        resolve({
          id,
          nome: "Samuel Silva",
          email: "samuel@email.com",
          cpf: "123.456.789-00",
        });
      }
    }, 300);
  });
}

/**
 * TODO 2: Complete a função buscarProduto
 *
 * - Recebe um ID de produto
 * - Retorna Promise com dados do produto
 * - Deve demorar 400ms
 * - Se ID for 404, rejeitar (produto não encontrado)
 */
function buscarProduto(id: number): Promise<Produto> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 404) {
        reject(new Error("Produto não encontrado"));
      } else {
        resolve({
          id,
          nome: `Produto ${id}`,
          preco: Math.random() * 1000 + 50,
          estoque: Math.floor(Math.random() * 100) + 10,
        });
      }
    }, 400);
  });
}

/**
 * TODO 3: Complete a função validarEstoque
 *
 * - Recebe produto e quantidade desejada
 * - Retorna Promise<boolean>
 * - Deve demorar 200ms
 * - Retorna true se tem estoque suficiente
 */
function validarEstoque(produto: Produto, quantidade: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(produto.estoque >= quantidade);
    }, 200);
  });
}

/**
 * TODO 4: Complete a função criarPedido
 *
 * - Recebe usuarioId e lista de itens
 * - Retorna Promise com o pedido criado
 * - Deve demorar 500ms
 * - Gera ID aleatório para o pedido
 */
function criarPedido(usuarioId: number, itens: ItemPedido[]): Promise<Pedido> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = itens.reduce((sum, item) => sum + item.subtotal, 0);

      resolve({
        id: Math.floor(Math.random() * 10000),
        usuarioId,
        itens,
        total,
        status: "pendente",
        dataCriacao: new Date(),
      });
    }, 500);
  });
}

/**
 * TODO 5: Complete a função processarPagamento
 *
 * - Recebe pedido e método de pagamento
 * - Retorna Promise com resultado do pagamento
 * - Deve demorar 1000ms (simula processadora)
 * - 85% de chance de aprovar
 * - 15% de chance de recusar
 */
function processarPagamento(
  pedido: Pedido,
  metodo: string
): Promise<Pagamento> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const aprovado = Math.random() > 0.15;

      resolve({
        pedidoId: pedido.id,
        valor: pedido.total,
        metodo,
        status: aprovado ? "aprovado" : "recusado",
        mensagem: aprovado
          ? "Pagamento aprovado com sucesso"
          : "Cartão recusado pela operadora",
      });
    }, 1000);
  });
}

/**
 * TODO 6: Complete a função emitirNotaFiscal
 *
 * - Recebe o pedido
 * - Retorna Promise com a nota fiscal
 * - Deve demorar 600ms
 * - Gera número de nota aleatório
 */
function emitirNotaFiscal(pedido: Pedido): Promise<NotaFiscal> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        numero: `NF-${Math.floor(Math.random() * 100000)}`,
        pedidoId: pedido.id,
        valor: pedido.total,
        emissao: new Date(),
      });
    }, 600);
  });
}

/**
 * TODO 7: Complete a função enviarEmail
 *
 * - Recebe destinatário e assunto
 * - Retorna Promise indicando se foi enviado
 * - Deve demorar 300ms
 * - 95% de chance de sucesso
 */
function enviarEmail(destinatario: string, assunto: string): Promise<Email> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.05) {
        resolve({
          destinatario,
          assunto,
          enviado: true,
        });
      } else {
        reject(new Error("Falha ao enviar email"));
      }
    }, 300);
  });
}

/**
 * TODO 8: Complete a função atualizarEstoque
 *
 * - Recebe lista de itens vendidos
 * - Retorna Promise<void>
 * - Deve demorar 400ms
 * - Simula atualização no banco
 */
function atualizarEstoque(itens: ItemPedido[]): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Estoque atualizado para ${itens.length} produtos`);
      resolve();
    }, 400);
  });
}

// ============================================
// PARTE 2: FUNÇÕES PRINCIPAIS
// ============================================

/**
 * TODO 9: Complete a função validarCarrinho
 *
 * REQUISITOS:
 * 1. Buscar TODOS os produtos em paralelo (Promise.all)
 * 2. Validar estoque de TODOS em paralelo
 * 3. Retornar array de ItemPedido se tudo estiver ok
 * 4. Lançar erro se algum produto não tiver estoque
 *
 * DICA: Use Promise.all para buscar produtos
 * DICA: Use Promise.all para validar estoques
 */
async function validarCarrinho(
  itens: ItemCarrinho[]
): Promise<ItemPedido[]> {
  console.log("\n🛒 Validando carrinho...");

  // Buscar todos os produtos em paralelo
  const produtos = await Promise.all(
    itens.map((item) => buscarProduto(item.produtoId))
  );

  // Validar estoque de todos em paralelo
  const validacoes = await Promise.all(
    itens.map((item, index) =>
      validarEstoque(produtos[index], item.quantidade)
    )
  );

  // Verificar se algum não tem estoque
  const semEstoque = validacoes.findIndex((valido) => !valido);
  if (semEstoque !== -1) {
    throw new Error(
      `Produto "${produtos[semEstoque].nome}" sem estoque suficiente`
    );
  }

  // Montar itens do pedido
  const itensPedido: ItemPedido[] = itens.map((item, index) => ({
    produtoId: item.produtoId,
    nomeProduto: produtos[index].nome,
    quantidade: item.quantidade,
    precoUnitario: produtos[index].preco,
    subtotal: produtos[index].preco * item.quantidade,
  }));

  console.log(`✅ Carrinho validado: ${itensPedido.length} itens`);
  return itensPedido;
}

/**
 * TODO 10: Complete a função finalizarCompra
 *
 * FLUXO SEQUENCIAL (cada etapa depende da anterior):
 * 1. Buscar dados do usuário
 * 2. Validar carrinho (produtos e estoque)
 * 3. Criar pedido
 * 4. Processar pagamento
 * 5. Se pagamento aprovado:
 *    - Emitir nota fiscal
 *    - Atualizar estoque
 *    - Enviar emails (confirmação e nota)
 *
 * IMPORTANTE:
 * - Operações 5, 6, 7 podem ser PARALELAS (Promise.allSettled)
 * - Se pagamento recusado, parar e informar
 * - Tratar TODOS os erros adequadamente
 */
async function finalizarCompra(
  usuarioId: number,
  carrinho: ItemCarrinho[],
  metodoPagamento: string
): Promise<void> {
  try {
    console.log("\n" + "=".repeat(50));
    console.log("🛍️  INICIANDO PROCESSO DE COMPRA");
    console.log("=".repeat(50));

    const inicio = Date.now();

    // 1. Buscar usuário
    console.log("\n[1/5] Buscando dados do usuário...");
    const usuario = await buscarUsuario(usuarioId);
    console.log(`✅ Usuário: ${usuario.nome}`);

    // 2. Validar carrinho
    console.log("\n[2/5] Validando carrinho...");
    const itensValidados = await validarCarrinho(carrinho);
    const totalCarrinho = itensValidados.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    console.log(`✅ Total do carrinho: R$ ${totalCarrinho.toFixed(2)}`);

    // 3. Criar pedido
    console.log("\n[3/5] Criando pedido...");
    const pedido = await criarPedido(usuario.id, itensValidados);
    console.log(`✅ Pedido criado: #${pedido.id}`);

    // 4. Processar pagamento
    console.log("\n[4/5] Processando pagamento...");
    const pagamento = await processarPagamento(pedido, metodoPagamento);

    if (pagamento.status === "recusado") {
      console.log("\n❌ PAGAMENTO RECUSADO");
      console.log(`Motivo: ${pagamento.mensagem}`);
      console.log("A compra foi cancelada.");
      return;
    }

    console.log(`✅ Pagamento aprovado: ${pagamento.mensagem}`);

    // 5. Operações finais em paralelo
    console.log("\n[5/5] Finalizando compra...");

    const [notaResult, estoqueResult, emailConfirmResult, emailNotaResult] =
      await Promise.allSettled([
        emitirNotaFiscal(pedido),
        atualizarEstoque(itensValidados),
        enviarEmail(usuario.email, "Confirmação de Pedido"),
        enviarEmail(usuario.email, "Nota Fiscal"),
      ]);

    // Processar resultados
    if (notaResult.status === "fulfilled") {
      console.log(`✅ Nota fiscal: ${notaResult.value.numero}`);
    }

    if (estoqueResult.status === "fulfilled") {
      console.log("✅ Estoque atualizado");
    }

    if (emailConfirmResult.status === "fulfilled") {
      console.log("✅ Email de confirmação enviado");
    } else {
      console.log("⚠️ Falha ao enviar email de confirmação");
    }

    if (emailNotaResult.status === "fulfilled") {
      console.log("✅ Email com nota fiscal enviado");
    } else {
      console.log("⚠️ Falha ao enviar email com nota fiscal");
    }

    const fim = Date.now();

    // Resumo final
    console.log("\n" + "=".repeat(50));
    console.log("✅ COMPRA FINALIZADA COM SUCESSO!");
    console.log("=".repeat(50));
    console.log(`\n📦 Pedido: #${pedido.id}`);
    console.log(`👤 Cliente: ${usuario.nome}`);
    console.log(`💰 Valor: R$ ${pedido.total.toFixed(2)}`);
    console.log(`💳 Pagamento: ${metodoPagamento}`);
    console.log(`⏱️  Tempo total: ${((fim - inicio) / 1000).toFixed(2)}s`);
    console.log("\n🎉 Obrigado pela sua compra!\n");
  } catch (erro) {
    console.log("\n" + "=".repeat(50));
    console.log("❌ ERRO NO PROCESSO DE COMPRA");
    console.log("=".repeat(50));
    console.log(`\n${(erro as Error).message}`);
    console.log("\nA compra foi cancelada. Tente novamente.\n");
  }
}

/**
 * TODO 11: Complete a função buscarPedidosUsuario
 *
 * REQUISITOS:
 * 1. Buscar dados do usuário
 * 2. Buscar todos os pedidos do usuário (simule 3 pedidos)
 * 3. Para cada pedido, buscar nota fiscal em paralelo
 * 4. Exibir relatório completo
 *
 * DICA: Use Promise.all para buscar notas fiscais
 */
async function buscarPedidosUsuario(usuarioId: number): Promise<void> {
  try {
    console.log("\n📋 Buscando histórico de pedidos...\n");

    const usuario = await buscarUsuario(usuarioId);
    console.log(`👤 Cliente: ${usuario.nome}\n`);

    // Simular 3 pedidos
    const pedidos: Pedido[] = [
      {
        id: 1001,
        usuarioId,
        itens: [],
        total: 299.99,
        status: "entregue",
        dataCriacao: new Date("2024-01-15"),
      },
      {
        id: 1002,
        usuarioId,
        itens: [],
        total: 149.5,
        status: "em_transito",
        dataCriacao: new Date("2024-01-20"),
      },
      {
        id: 1003,
        usuarioId,
        itens: [],
        total: 89.9,
        status: "processando",
        dataCriacao: new Date("2024-01-25"),
      },
    ];

    // Buscar notas fiscais em paralelo
    const notasFiscais = await Promise.all(
      pedidos.map((pedido) => emitirNotaFiscal(pedido))
    );

    console.log("📦 HISTÓRICO DE PEDIDOS:\n");
    pedidos.forEach((pedido, index) => {
      console.log(`Pedido #${pedido.id}`);
      console.log(`  Status: ${pedido.status}`);
      console.log(`  Valor: R$ ${pedido.total.toFixed(2)}`);
      console.log(`  Nota Fiscal: ${notasFiscais[index].numero}`);
      console.log("");
    });
  } catch (erro) {
    console.log("❌ Erro ao buscar pedidos:", (erro as Error).message);
  }
}

// ============================================
// PARTE 3: TESTES
// ============================================

/**
 * TODO 12: Execute os testes abaixo
 */

console.log("\n🧪 INICIANDO TESTES DO SISTEMA\n");

// TESTE 1: Compra bem-sucedida
setTimeout(() => {
  finalizarCompra(
    1,
    [
      { produtoId: 101, quantidade: 2 },
      { produtoId: 102, quantidade: 1 },
      { produtoId: 103, quantidade: 3 },
    ],
    "Cartão de Crédito"
  );
}, 1000);

// TESTE 2: Usuário inválido
setTimeout(() => {
  finalizarCompra(
    -1,
    [{ produtoId: 101, quantidade: 1 }],
    "Cartão de Crédito"
  );
}, 5000);

// TESTE 3: Produto não encontrado
setTimeout(() => {
  finalizarCompra(
    1,
    [{ produtoId: 404, quantidade: 1 }],
    "Cartão de Crédito"
  );
}, 7000);

// TESTE 4: Buscar histórico de pedidos
setTimeout(() => {
  buscarPedidosUsuario(1);
}, 9000);

// ============================================
// DESAFIOS EXTRAS (OPCIONAL)
// ============================================

/**
 * Se você terminou tudo acima, tente implementar:
 *
 * 1. Sistema de Cupons de Desconto
 *    - validarCupom(codigo: string): Promise<number>
 *    - Aplicar desconto no total
 *
 * 2. Sistema de Pontos/Cashback
 *    - calcularPontos(valor: number): Promise<number>
 *    - Adicionar pontos após compra aprovada
 *
 * 3. Validação de CEP
 *    - validarCEP(cep: string): Promise<{valido: boolean, prazo: number}>
 *    - Calcular frete baseado no CEP
 *
 * 4. Sistema de Notificações Múltiplas
 *    - enviarNotificacoes(usuario, tipo): Promise<void>
 *    - Email + SMS + Push em paralelo
 *
 * 5. Retry Logic
 *    - Se pagamento falhar, tentar novamente até 3 vezes
 *    - Com delay entre tentativas
 */

// ============================================
// CRITÉRIOS DE AVALIAÇÃO
// ============================================

/**
 * ✅ CHECKLIST:
 *
 * [ ] Todas as funções implementadas
 * [ ] Tratamento de erros adequado
 * [ ] Usa Promise.all quando apropriado
 * [ ] Usa Promise.allSettled quando apropriado
 * [ ] Operações sequenciais corretas
 * [ ] Operações paralelas otimizadas
 * [ ] Mensagens claras no console
 * [ ] Testes executam sem erros
 * [ ] Código bem organizado
 * [ ] Tipos TypeScript corretos
 *
 * 🎯 CONCEITOS PRATICADOS:
 *
 * - Promises e async/await
 * - Promise.all e Promise.allSettled
 * - Encadeamento de operações
 * - Tratamento de erros
 * - Operações paralelas vs sequenciais
 * - Validações
 * - Fluxos complexos
 */

/**
 * 💡 DICAS:
 *
 * 1. Leia TODO por TODO e implemente um de cada vez
 * 2. Teste cada função isoladamente antes de integrar
 * 3. Use console.log para acompanhar o fluxo
 * 4. Preste atenção nos tipos TypeScript
 * 5. Se travar, revise os exemplos das aulas
 * 6. Peça ajuda se precisar!
 */

/**
 * 🎓 PRÓXIMA AULA:
 * Quinta-feira - Fetch API (consumir APIs reais!)
 */
