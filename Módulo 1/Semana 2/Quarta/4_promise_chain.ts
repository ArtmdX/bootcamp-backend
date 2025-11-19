/**
 * ============================================
 * QUARTA-FEIRA - AULA 4
 * Encadeamento de Promises (Promise Chaining)
 * ============================================
 *
 * OBJETIVO:
 * Aprender a encadear operações assíncronas que dependem
 * do resultado anterior (operações SEQUENCIAIS)
 */

// ============================================
// 1. O QUE É PROMISE CHAINING?
// ============================================

console.log("\n=== O QUE É PROMISE CHAINING? ===\n");

/**
 * Promise Chaining é quando uma operação assíncrona
 * depende do resultado da anterior:
 *
 * 1. Buscar usuário
 * 2. Buscar posts DESSE usuário (precisa do ID)
 * 3. Buscar comentários DESSES posts (precisa dos IDs dos posts)
 */

// ============================================
// 2. FORMA ANTIGA: .then() ENCADEADO
// ============================================

console.log("\n=== FORMA ANTIGA: .then() ===\n");

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface Post {
  id: number;
  titulo: string;
  autorId: number;
}

interface Comentario {
  id: number;
  texto: string;
  postId: number;
}

function buscarUsuario(id: number): Promise<Usuario> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Usuário ${id} encontrado`);
      resolve({
        id,
        nome: `Usuário ${id}`,
        email: `user${id}@email.com`,
      });
    }, 500);
  });
}

function buscarPostsDoUsuario(userId: number): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Posts do usuário ${userId} encontrados`);
      resolve([
        { id: 1, titulo: "Post 1", autorId: userId },
        { id: 2, titulo: "Post 2", autorId: userId },
      ]);
    }, 500);
  });
}

function buscarComentariosDoPost(postId: number): Promise<Comentario[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Comentários do post ${postId} encontrados`);
      resolve([
        { id: 1, texto: "Ótimo post!", postId },
        { id: 2, texto: "Muito interessante", postId },
      ]);
    }, 500);
  });
}

// ❌ FORMA ANTIGA (callback hell com Promises)
function formaAntigaThen(userId: number): void {
  console.log("🔄 Buscando dados (forma .then)...\n");

  buscarUsuario(userId)
    .then((usuario) => {
      console.log("Usuário:", usuario.nome);
      return buscarPostsDoUsuario(usuario.id);
    })
    .then((posts) => {
      console.log(`Posts encontrados: ${posts.length}`);
      return buscarComentariosDoPost(posts[0].id);
    })
    .then((comentarios) => {
      console.log(`Comentários encontrados: ${comentarios.length}\n`);
    })
    .catch((erro) => {
      console.log("❌ Erro:", erro);
    });
}

formaAntigaThen(1);

// ============================================
// 3. FORMA MODERNA: async/await
// ============================================

console.log("\n=== FORMA MODERNA: async/await ===\n");

// ✅ FORMA MODERNA (muito mais legível)
async function formaModernaAsync(userId: number): Promise<void> {
  try {
    console.log("🔄 Buscando dados (forma async/await)...\n");

    // Cada operação espera a anterior
    const usuario = await buscarUsuario(userId);
    console.log("Usuário:", usuario.nome);

    const posts = await buscarPostsDoUsuario(usuario.id);
    console.log(`Posts encontrados: ${posts.length}`);

    const comentarios = await buscarComentariosDoPost(posts[0].id);
    console.log(`Comentários encontrados: ${comentarios.length}\n`);
  } catch (erro) {
    console.log("❌ Erro:", erro);
  }
}

setTimeout(() => formaModernaAsync(1), 2000);

// ============================================
// 4. QUANDO USAR SEQUENCIAL VS PARALELO
// ============================================

console.log("\n=== SEQUENCIAL VS PARALELO ===\n");

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Estoque {
  produtoId: number;
  quantidade: number;
}

interface Fornecedor {
  id: number;
  nome: string;
}

function buscarProduto(id: number): Promise<Produto> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nome: `Produto ${id}`, preco: 99.99 });
    }, 500);
  });
}

function buscarEstoque(produtoId: number): Promise<Estoque> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ produtoId, quantidade: 50 });
    }, 500);
  });
}

function buscarFornecedor(id: number): Promise<Fornecedor> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nome: `Fornecedor ${id}` });
    }, 500);
  });
}

// ❌ SEQUENCIAL DESNECESSÁRIO (1.5s)
async function formaLentaDesnecessaria(produtoId: number): Promise<void> {
  console.log("⏰ Forma LENTA (sequencial desnecessário)...\n");
  const inicio = Date.now();

  const produto = await buscarProduto(produtoId); // 500ms
  const estoque = await buscarEstoque(produtoId); // + 500ms
  const fornecedor = await buscarFornecedor(1); // + 500ms

  const fim = Date.now();
  console.log(`⏱️ Tempo: ${(fim - inicio) / 1000}s\n`);
}

// ✅ PARALELO QUANDO POSSÍVEL (500ms)
async function formaRapidaParalelo(produtoId: number): Promise<void> {
  console.log("🚀 Forma RÁPIDA (paralelo quando possível)...\n");
  const inicio = Date.now();

  // Estoque e Fornecedor NÃO dependem um do outro
  const [produto, estoque, fornecedor] = await Promise.all([
    buscarProduto(produtoId),
    buscarEstoque(produtoId),
    buscarFornecedor(1),
  ]);

  const fim = Date.now();
  console.log(`⏱️ Tempo: ${(fim - inicio) / 1000}s\n`);
}

setTimeout(() => {
  formaLentaDesnecessaria(1);
  setTimeout(() => formaRapidaParalelo(1), 2000);
}, 4000);

// ============================================
// 5. ENCADEAMENTO COM DEPENDÊNCIAS
// ============================================

console.log("\n=== ENCADEAMENTO COM DEPENDÊNCIAS ===\n");

interface Pedido {
  id: number;
  usuarioId: number;
  total: number;
}

interface Pagamento {
  pedidoId: number;
  status: string;
}

interface NotaFiscal {
  pedidoId: number;
  numero: string;
}

function criarPedido(usuarioId: number, valor: number): Promise<Pedido> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pedido = {
        id: Math.floor(Math.random() * 1000),
        usuarioId,
        total: valor,
      };
      console.log(`✅ Pedido criado: #${pedido.id}`);
      resolve(pedido);
    }, 500);
  });
}

function processarPagamento(pedido: Pedido): Promise<Pagamento> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 90% de chance de aprovação
      if (Math.random() > 0.1) {
        console.log(`✅ Pagamento aprovado para pedido #${pedido.id}`);
        resolve({
          pedidoId: pedido.id,
          status: "aprovado",
        });
      } else {
        reject(new Error("Pagamento recusado"));
      }
    }, 800);
  });
}

function emitirNotaFiscal(pedido: Pedido): Promise<NotaFiscal> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nota = {
        pedidoId: pedido.id,
        numero: `NF-${Math.floor(Math.random() * 10000)}`,
      };
      console.log(`✅ Nota fiscal emitida: ${nota.numero}`);
      resolve(nota);
    }, 600);
  });
}

// ✅ PROCESSO COMPLETO COM ENCADEAMENTO
async function finalizarCompra(usuarioId: number, valor: number): Promise<void> {
  try {
    console.log("🛒 Iniciando processo de compra...\n");

    // 1. Criar pedido
    const pedido = await criarPedido(usuarioId, valor);

    // 2. Processar pagamento (depende do pedido)
    const pagamento = await processarPagamento(pedido);

    // 3. Emitir nota fiscal (depende do pedido aprovado)
    const notaFiscal = await emitirNotaFiscal(pedido);

    console.log("\n✅ COMPRA FINALIZADA COM SUCESSO!");
    console.log(`Pedido: #${pedido.id}`);
    console.log(`Valor: R$ ${pedido.total}`);
    console.log(`Pagamento: ${pagamento.status}`);
    console.log(`Nota Fiscal: ${notaFiscal.numero}\n`);
  } catch (erro) {
    console.log("\n❌ ERRO NA COMPRA:", (erro as Error).message);
    console.log("A compra foi cancelada.\n");
  }
}

setTimeout(() => finalizarCompra(1, 299.99), 8000);

// ============================================
// 6. ENCADEAMENTO COMPLEXO
// ============================================

console.log("\n=== ENCADEAMENTO COMPLEXO ===\n");

interface UsuarioCompleto extends Usuario {
  empresa?: string;
}

interface PostCompleto extends Post {
  curtidas: number;
}

// Processo complexo: Buscar usuário → posts → comentários de cada post
async function buscarPerfilCompleto(userId: number): Promise<void> {
  try {
    console.log("🔄 Carregando perfil completo...\n");
    const inicio = Date.now();

    // 1. Buscar usuário
    const usuario = await buscarUsuario(userId);
    console.log(`👤 Usuário: ${usuario.nome}`);

    // 2. Buscar posts do usuário
    const posts = await buscarPostsDoUsuario(usuario.id);
    console.log(`📝 Posts: ${posts.length}`);

    // 3. Buscar comentários de TODOS os posts em paralelo
    const comentariosPorPost = await Promise.all(
      posts.map((post) => buscarComentariosDoPost(post.id))
    );

    const totalComentarios = comentariosPorPost.reduce(
      (total, comentarios) => total + comentarios.length,
      0
    );

    const fim = Date.now();

    console.log(`💬 Total de comentários: ${totalComentarios}`);
    console.log(`⏱️ Tempo total: ${(fim - inicio) / 1000}s\n`);
  } catch (erro) {
    console.log("❌ Erro:", erro);
  }
}

setTimeout(() => buscarPerfilCompleto(1), 11000);

// ============================================
// 7. EXERCÍCIO PRÁTICO
// ============================================

console.log("\n=== EXERCÍCIO ===\n");

/**
 * DESAFIO:
 * Sistema de importação de dados:
 *
 * 1. Validar arquivo
 * 2. Processar linhas (depende da validação)
 * 3. Salvar no banco (depende do processamento)
 * 4. Gerar relatório (depende de tudo)
 *
 * Cada etapa só executa se a anterior funcionar!
 */

interface Arquivo {
  nome: string;
  linhas: number;
}

interface DadosProcessados {
  registros: number;
  erros: number;
}

interface ResultadoSalvamento {
  sucesso: number;
  falhas: number;
}

interface Relatorio {
  total: number;
  processados: number;
  salvos: number;
  taxa_sucesso: string;
}

// TODO: Implemente as funções abaixo

function validarArquivo(nomeArquivo: string): Promise<Arquivo> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!nomeArquivo.endsWith(".csv")) {
        reject(new Error("Arquivo deve ser .csv"));
      } else {
        console.log("✅ Arquivo validado");
        resolve({
          nome: nomeArquivo,
          linhas: 1000,
        });
      }
    }, 500);
  });
}

function processarDados(arquivo: Arquivo): Promise<DadosProcessados> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Processando ${arquivo.linhas} linhas...`);
      resolve({
        registros: arquivo.linhas,
        erros: Math.floor(arquivo.linhas * 0.05), // 5% de erros
      });
    }, 1000);
  });
}

function salvarNoBanco(dados: DadosProcessados): Promise<ResultadoSalvamento> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Salvando ${dados.registros} registros...`);
      resolve({
        sucesso: dados.registros - dados.erros,
        falhas: dados.erros,
      });
    }, 800);
  });
}

function gerarRelatorio(
  arquivo: Arquivo,
  processados: DadosProcessados,
  salvos: ResultadoSalvamento
): Promise<Relatorio> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ Gerando relatório...");
      const taxa = ((salvos.sucesso / arquivo.linhas) * 100).toFixed(2);
      resolve({
        total: arquivo.linhas,
        processados: processados.registros,
        salvos: salvos.sucesso,
        taxa_sucesso: `${taxa}%`,
      });
    }, 300);
  });
}

// TODO: Complete esta função encadeando todas as etapas
async function importarDados(nomeArquivo: string): Promise<void> {
  try {
    console.log(`📂 Iniciando importação de ${nomeArquivo}...\n`);
    const inicio = Date.now();

    // DICA: Cada etapa depende da anterior
    const arquivo = await validarArquivo(nomeArquivo);
    const processados = await processarDados(arquivo);
    const salvos = await salvarNoBanco(processados);
    const relatorio = await gerarRelatorio(arquivo, processados, salvos);

    const fim = Date.now();

    console.log("\n📊 RELATÓRIO DE IMPORTAÇÃO:");
    console.log(`Total de linhas: ${relatorio.total}`);
    console.log(`Processados: ${relatorio.processados}`);
    console.log(`Salvos: ${relatorio.salvos}`);
    console.log(`Taxa de sucesso: ${relatorio.taxa_sucesso}`);
    console.log(`⏱️ Tempo total: ${(fim - inicio) / 1000}s\n`);
  } catch (erro) {
    console.log("\n❌ ERRO NA IMPORTAÇÃO:", (erro as Error).message);
    console.log("Processo cancelado.\n");
  }
}

// Teste com arquivo válido
setTimeout(() => importarDados("dados.csv"), 14000);

// Teste com arquivo inválido
setTimeout(() => importarDados("dados.txt"), 17000);

// ============================================
// RESUMO - PROMISE CHAINING
// ============================================

/**
 * 🎯 QUANDO USAR:
 *
 * SEQUENCIAL (await um após o outro):
 * ✅ Quando a operação B precisa do resultado de A
 * ✅ Processos que têm ordem obrigatória
 * ✅ Exemplo: Criar pedido → Processar pagamento → Emitir nota
 *
 * PARALELO (Promise.all):
 * ✅ Quando as operações são INDEPENDENTES
 * ✅ Muito mais rápido
 * ✅ Exemplo: Buscar produto + estoque + fornecedor
 *
 * MISTO:
 * ✅ Combinar ambos quando necessário
 * ✅ Sequencial para dependências
 * ✅ Paralelo dentro de cada etapa
 *
 * ✅ BOAS PRÁTICAS:
 *
 * 1. Use async/await ao invés de .then()
 * 2. Sempre trate erros com try/catch
 * 3. Paralelizar quando possível
 * 4. Documentar dependências entre operações
 * 5. Dar feedback em cada etapa importante
 */

/**
 * 🎯 PRÓXIMOS PASSOS:
 * - Dever de casa: Sistema E-commerce completo
 * - Quinta-feira: Fetch API (APIs reais!)
 */
