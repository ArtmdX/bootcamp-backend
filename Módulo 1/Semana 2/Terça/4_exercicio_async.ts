/**
 * ============================================
 * TERÇA-FEIRA - EXERCÍCIO 2
 * Exercícios Práticos de async/await
 * ============================================
 */

// ============================================
// EXERCÍCIO 1: Conversão .then() para async/await
// ============================================

console.log("\n=== EXERCÍCIO 1: Conversão ===\n");

function buscarUsuario(id: number): Promise<{ id: number; nome: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nome: `Usuário ${id}` });
    }, 500);
  });
}

// Versão com .then() (NÃO MODIFICAR)
function exibirUsuarioComThen(id: number): void {
  buscarUsuario(id)
    .then((usuario) => {
      console.log(`[.then()] Usuário: ${usuario.nome}`);
    })
    .catch((erro) => {
      console.log("Erro:", erro);
    });
}

// TODO: Converta para async/await
async function exibirUsuarioComAsync(id: number): Promise<void> {
  try {
    const usuario = await buscarUsuario(id);
    console.log(`[async/await] Usuário: ${usuario.nome}`);
  } catch (erro) {
    console.log("Erro:", erro);
  }
}

// Teste
exibirUsuarioComThen(1);
exibirUsuarioComAsync(1);

// ============================================
// EXERCÍCIO 2: Operações Sequenciais
// ============================================

console.log("\n=== EXERCÍCIO 2: Operações Sequenciais ===\n");

/**
 * Crie uma função async que:
 * 1. Espera 500ms
 * 2. Exibe "Passo 1 completo"
 * 3. Espera mais 500ms
 * 4. Exibe "Passo 2 completo"
 * 5. Espera mais 500ms
 * 6. Exibe "Passo 3 completo"
 * 7. Retorna "Processo finalizado"
 */

function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// TODO: Implemente esta função
async function executarPassos(): Promise<string> {
  await esperar(500);
  console.log("✅ Passo 1 completo");

  await esperar(500);
  console.log("✅ Passo 2 completo");

  await esperar(500);
  console.log("✅ Passo 3 completo");

  return "Processo finalizado";
}

// Teste
setTimeout(async () => {
  const resultado = await executarPassos();
  console.log(`🎉 ${resultado}\n`);
}, 1500);

// ============================================
// EXERCÍCIO 3: Buscar e Processar
// ============================================

console.log("\n=== EXERCÍCIO 3: Buscar e Processar ===\n");

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const produtos: Produto[] = [
  { id: 1, nome: "Notebook", preco: 3000 },
  { id: 2, nome: "Mouse", preco: 50 },
  { id: 3, nome: "Teclado", preco: 150 },
];

function buscarProduto(id: number): Promise<Produto> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produto = produtos.find((p) => p.id === id);
      if (produto) {
        resolve(produto);
      } else {
        reject(new Error("Produto não encontrado"));
      }
    }, 500);
  });
}

function calcularDesconto(preco: number, percentual: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const desconto = preco * (percentual / 100);
      resolve(preco - desconto);
    }, 300);
  });
}

/**
 * TODO: Crie uma função async que:
 * 1. Busca um produto pelo ID
 * 2. Calcula o preço com 20% de desconto
 * 3. Exibe:
 *    - Nome do produto
 *    - Preço original
 *    - Preço com desconto
 */

async function exibirProdutoComDesconto(id: number): Promise<void> {
  try {
    const produto = await buscarProduto(id);
    const precoComDesconto = await calcularDesconto(produto.preco, 20);

    console.log(`📦 Produto: ${produto.nome}`);
    console.log(`💰 Preço original: R$ ${produto.preco}`);
    console.log(`🎉 Preço com desconto: R$ ${precoComDesconto}\n`);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// Teste
setTimeout(() => exibirProdutoComDesconto(1), 3500);

// ============================================
// EXERCÍCIO 4: Validação em Cadeia
// ============================================

console.log("\n=== EXERCÍCIO 4: Validação em Cadeia ===\n");

/**
 * Crie funções async de validação:
 * - validarEmail: Se contém "@", resolve, senão reject
 * - validarSenha: Se tem 6+ caracteres, resolve, senão reject
 * - validarIdade: Se >= 18, resolve, senão reject
 */

// TODO: Implemente estas funções
async function validarEmail(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.includes("@")) {
        resolve(true);
      } else {
        reject(new Error("Email inválido"));
      }
    }, 200);
  });
}

async function validarSenha(senha: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (senha.length >= 6) {
        resolve(true);
      } else {
        reject(new Error("Senha deve ter no mínimo 6 caracteres"));
      }
    }, 200);
  });
}

async function validarIdade(idade: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (idade >= 18) {
        resolve(true);
      } else {
        reject(new Error("Deve ser maior de 18 anos"));
      }
    }, 200);
  });
}

/**
 * TODO: Crie uma função que valida tudo em sequência
 * Se todas passarem, exibe "✅ Cadastro válido"
 * Se alguma falhar, exibe o erro
 */

async function validarCadastro(
  email: string,
  senha: string,
  idade: number
): Promise<void> {
  try {
    await validarEmail(email);
    console.log("✅ Email válido");

    await validarSenha(senha);
    console.log("✅ Senha válida");

    await validarIdade(idade);
    console.log("✅ Idade válida");

    console.log("\n🎉 Cadastro válido!\n");
  } catch (erro) {
    console.log(`❌ ${(erro as Error).message}\n`);
  }
}

// Testes
setTimeout(() => {
  console.log("Teste 1: Tudo válido");
  validarCadastro("user@email.com", "123456", 25);
}, 5000);

setTimeout(() => {
  console.log("Teste 2: Email inválido");
  validarCadastro("useremail.com", "123456", 25);
}, 7000);

setTimeout(() => {
  console.log("Teste 3: Senha curta");
  validarCadastro("user@email.com", "123", 25);
}, 9000);

setTimeout(() => {
  console.log("Teste 4: Menor de idade");
  validarCadastro("user@email.com", "123456", 16);
}, 11000);

// ============================================
// EXERCÍCIO 5: Simular API de Posts
// ============================================

console.log("\n=== EXERCÍCIO 5: Simular API ===\n");

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorId: number;
}

interface Autor {
  id: number;
  nome: string;
}

const posts: Post[] = [
  { id: 1, titulo: "Post 1", conteudo: "Conteúdo 1", autorId: 1 },
  { id: 2, titulo: "Post 2", conteudo: "Conteúdo 2", autorId: 2 },
  { id: 3, titulo: "Post 3", conteudo: "Conteúdo 3", autorId: 1 },
];

const autores: Autor[] = [
  { id: 1, nome: "Samuel" },
  { id: 2, nome: "Arthur" },
];

function buscarPost(id: number): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = posts.find((p) => p.id === id);
      if (post) {
        resolve(post);
      } else {
        reject(new Error("Post não encontrado"));
      }
    }, 500);
  });
}

function buscarAutor(id: number): Promise<Autor> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const autor = autores.find((a) => a.id === id);
      if (autor) {
        resolve(autor);
      } else {
        reject(new Error("Autor não encontrado"));
      }
    }, 300);
  });
}

/**
 * TODO: Crie uma função que:
 * 1. Busca um post pelo ID
 * 2. Busca o autor desse post
 * 3. Exibe:
 *    - Título do post
 *    - Conteúdo
 *    - Nome do autor
 */

async function exibirPostCompleto(postId: number): Promise<void> {
  try {
    const post = await buscarPost(postId);
    const autor = await buscarAutor(post.autorId);

    console.log(`\n📝 ${post.titulo}`);
    console.log(`📄 ${post.conteudo}`);
    console.log(`✍️  Por: ${autor.nome}\n`);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// Teste
setTimeout(() => exibirPostCompleto(1), 13000);
setTimeout(() => exibirPostCompleto(2), 15000);

// ============================================
// EXERCÍCIO 6: DESAFIO - Sistema de Pedidos
// ============================================

console.log("\n=== EXERCÍCIO 6: DESAFIO ===\n");

interface Pedido {
  id: number;
  produtoId: number;
  quantidade: number;
  total: number;
  status: string;
}

/**
 * DESAFIO COMPLETO:
 *
 * Crie um sistema que:
 * 1. Valida se o produto existe
 * 2. Valida se tem estoque suficiente
 * 3. Cria o pedido
 * 4. Atualiza o estoque (simule com console.log)
 * 5. Envia email de confirmação (simule com console.log)
 *
 * Cada operação deve:
 * - Ser uma função async separada
 * - Ter delay (setTimeout)
 * - Poder falhar (rejeitar)
 */

// TODO: Implemente as funções

async function validarProdutoExiste(id: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produtoExiste = produtos.some((p) => p.id === id);
      if (produtoExiste) {
        console.log("✅ Produto existe");
        resolve(true);
      } else {
        reject(new Error("Produto não existe"));
      }
    }, 300);
  });
}

async function validarEstoque(
  produtoId: number,
  quantidade: number
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produto = produtos.find((p) => p.id === produtoId);
      // Simula que sempre tem estoque de 10 unidades
      const estoqueDisponivel = 10;

      if (quantidade <= estoqueDisponivel) {
        console.log(`✅ Estoque disponível: ${estoqueDisponivel} unidades`);
        resolve(true);
      } else {
        reject(new Error("Estoque insuficiente"));
      }
    }, 400);
  });
}

async function criarPedido(
  produtoId: number,
  quantidade: number
): Promise<Pedido> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const produto = produtos.find((p) => p.id === produtoId)!;
      const pedido: Pedido = {
        id: Math.floor(Math.random() * 10000),
        produtoId,
        quantidade,
        total: produto.preco * quantidade,
        status: "criado",
      };
      console.log(`✅ Pedido criado: #${pedido.id}`);
      resolve(pedido);
    }, 500);
  });
}

async function atualizarEstoque(
  produtoId: number,
  quantidade: number
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Estoque atualizado: -${quantidade} unidades`);
      resolve();
    }, 300);
  });
}

async function enviarEmailConfirmacao(pedido: Pedido): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Email enviado para confirmação do pedido #${pedido.id}`);
      resolve();
    }, 200);
  });
}

// TODO: Implemente a função principal
async function processarPedidoCompleto(
  produtoId: number,
  quantidade: number
): Promise<void> {
  try {
    console.log("\n🛒 Iniciando processamento do pedido...\n");

    await validarProdutoExiste(produtoId);
    await validarEstoque(produtoId, quantidade);
    const pedido = await criarPedido(produtoId, quantidade);
    await atualizarEstoque(produtoId, quantidade);
    await enviarEmailConfirmacao(pedido);

    console.log("\n🎉 Pedido processado com sucesso!");
    console.log(`Total: R$ ${pedido.total}\n`);
  } catch (erro) {
    console.log("\n❌ Erro ao processar pedido:", (erro as Error).message);
    console.log("O pedido foi cancelado.\n");
  }
}

// Testes
setTimeout(() => {
  console.log("Teste 1: Pedido válido");
  processarPedidoCompleto(1, 2);
}, 17000);

setTimeout(() => {
  console.log("Teste 2: Produto inválido");
  processarPedidoCompleto(999, 1);
}, 20000);

setTimeout(() => {
  console.log("Teste 3: Estoque insuficiente");
  processarPedidoCompleto(1, 50);
}, 23000);

// ============================================
// RESUMO
// ============================================

/**
 * 🎯 O QUE VOCÊ PRATICOU:
 *
 * 1. Converter .then() para async/await
 * 2. Operações sequenciais com await
 * 3. Tratamento de erros com try/catch
 * 4. Encadear múltiplas operações assíncronas
 * 5. Validações em sequência
 * 6. Sistema completo com múltiplas funções async
 *
 * ✅ CONCEITOS IMPORTANTES:
 *
 * - async/await torna código mais legível
 * - Cada await "pausa" até a Promise resolver
 * - Use try/catch para tratar erros
 * - Funções async SEMPRE retornam Promise
 * - Operações sequenciais: uma após a outra
 *
 * 🎯 PRÓXIMOS PASSOS:
 * - Dever de casa: Sistema de pedidos completo
 * - Quarta-feira: Operações em paralelo
 */
