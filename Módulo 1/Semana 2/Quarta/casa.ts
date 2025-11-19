export {};
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
  status: 'aprovado' | 'recusado' | 'pendente';
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
        reject(new Error('ID de usuário inválido'));
      } else {
        resolve({
          id,
          nome: 'Samuel Silva',
          email: 'samuel@email.com',
          cpf: '123.456.789-00'
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
    setTimeout(() => {}, 400);
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
  return new Promise(resolve => {
    setTimeout(() => {}, 200);
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
  return new Promise(resolve => {
    setTimeout(() => {
      const total = itens.reduce((sum, item) => sum + item.subtotal, 0);

      resolve({
        id: Math.floor(Math.random() * 10000),
        usuarioId,
        itens,
        total,
        status: 'pendente',
        dataCriacao: new Date()
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
function processarPagamento(pedido: Pedido, metodo: string): Promise<Pagamento> {
  return new Promise(resolve => {
    setTimeout(() => {
      const aprovado = Math.random() > 0.15;

      resolve({
        pedidoId: pedido.id,
        valor: pedido.total,
        metodo,
        status: aprovado ? 'aprovado' : 'recusado',
        mensagem: aprovado ? 'Pagamento aprovado com sucesso' : 'Cartão recusado pela operadora'
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
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        numero: `NF-${Math.floor(Math.random() * 100000)}`,
        pedidoId: pedido.id,
        valor: pedido.total,
        emissao: new Date()
      });
    }, 600);
  });
}

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
