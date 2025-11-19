/**
 * ============================================
 * TERÇA-FEIRA - AULA 3
 * Introdução ao async/await
 * ============================================
 *
 * OBJETIVO:
 * Aprender a forma MODERNA de trabalhar com Promises
 * usando async/await ao invés de .then()
 */

// ============================================
// 1. O PROBLEMA COM .then()
// ============================================

console.log("\n=== PROBLEMA: .then() fica confuso ===\n");

/**
 * Com .then(), o código fica "aninhado"
 * Quanto mais operações, mais difícil de ler
 */

function buscarUsuario(id: number): Promise<{ id: number; nome: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nome: `Usuário ${id}` });
    }, 500);
  });
}

function buscarPosts(userId: number): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`Post 1 de ${userId}`, `Post 2 de ${userId}`]);
    }, 500);
  });
}

function buscarComentarios(postId: string): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`Comentário 1`, `Comentário 2`]);
    }, 500);
  });
}

// ❌ Com .then() fica assim (confuso!)
buscarUsuario(1)
  .then((usuario) => {
    console.log("Usuário:", usuario.nome);
    return buscarPosts(usuario.id);
  })
  .then((posts) => {
    console.log(`Posts: ${posts.length}`);
    return buscarComentarios(posts[0]);
  })
  .then((comentarios) => {
    console.log(`Comentários: ${comentarios.length}`);
  })
  .catch((erro) => {
    console.log("Erro:", erro);
  });

// ============================================
// 2. A SOLUÇÃO: async/await
// ============================================

console.log("\n=== SOLUÇÃO: async/await ===\n");

/**
 * async/await torna código assíncrono
 * parecer SÍNCRONO (mais fácil de ler!)
 */

// ✅ Com async/await fica assim (muito melhor!)
async function buscarDadosCompletos() {
  try {
    const usuario = await buscarUsuario(1);
    console.log("Usuário:", usuario.nome);

    const posts = await buscarPosts(usuario.id);
    console.log(`Posts: ${posts.length}`);

    const comentarios = await buscarComentarios(posts[0]);
    console.log(`Comentários: ${comentarios.length}`);
  } catch (erro) {
    console.log("Erro:", erro);
  }
}

setTimeout(() => buscarDadosCompletos(), 2000);

// ============================================
// 3. REGRAS DO async/await
// ============================================

console.log("\n=== REGRAS IMPORTANTES ===\n");

/**
 * REGRA 1: Só pode usar "await" dentro de função "async"
 */

// ❌ ERRADO - await sem async
function funcaoNormal() {
  // const resultado = await minhaPromise(); // ERRO!
}

// ✅ CERTO - await dentro de async
async function funcaoAssincrona() {
  const usuario = await buscarUsuario(1);
  console.log(usuario);
}

/**
 * REGRA 2: async SEMPRE retorna uma Promise
 */

async function retornaNumero(): Promise<number> {
  return 42; // Automaticamente vira Promise<number>
}

// Pode usar .then()
retornaNumero().then((numero) => {
  console.log("Número:", numero);
});

// Ou await (dentro de outra função async)
async function usarNumero() {
  const numero = await retornaNumero();
  console.log("Número:", numero);
}

/**
 * REGRA 3: await "pausa" a execução até a Promise resolver
 */

async function demonstrarPausa() {
  console.log("1️⃣ Antes do await");

  const resultado = await esperar(1000); // Espera 1 segundo aqui

  console.log("2️⃣ Depois do await");
  console.log("Resultado:", resultado);
}

function esperar(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Esperei ${ms}ms`);
    }, ms);
  });
}

setTimeout(() => demonstrarPausa(), 4000);

// ============================================
// 4. TRATAMENTO DE ERROS
// ============================================

console.log("\n=== TRATAMENTO DE ERROS ===\n");

function operacaoQuePodemFalhar(sucesso: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (sucesso) {
        resolve("Deu certo!");
      } else {
        reject(new Error("Deu errado!"));
      }
    }, 500);
  });
}

// ✅ Use try/catch com async/await
async function testarOperacao(sucesso: boolean) {
  try {
    const resultado = await operacaoQuePodemFalhar(sucesso);
    console.log("✅", resultado);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

setTimeout(() => {
  testarOperacao(true); // Sucesso
  testarOperacao(false); // Erro
}, 6000);

// ============================================
// 5. EXEMPLO PRÁTICO: LOGIN
// ============================================

console.log("\n=== EXEMPLO: Sistema de Login ===\n");

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface Token {
  token: string;
  expira: Date;
}

// Simula verificar credenciais
function verificarCredenciais(
  email: string,
  senha: string
): Promise<Usuario> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@email.com" && senha === "123456") {
        resolve({
          id: 1,
          nome: "Samuel",
          email: "user@email.com",
        });
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 800);
  });
}

// Simula gerar token JWT
function gerarToken(usuario: Usuario): Promise<Token> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: `token-${usuario.id}-${Date.now()}`,
        expira: new Date(Date.now() + 3600000), // 1 hora
      });
    }, 300);
  });
}

// Simula salvar sessão
function salvarSessao(token: Token): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("💾 Sessão salva no banco");
      resolve();
    }, 200);
  });
}

// ✅ Função de login completa com async/await
async function fazerLogin(email: string, senha: string): Promise<void> {
  try {
    console.log("🔐 Fazendo login...\n");

    // 1. Verificar credenciais
    const usuario = await verificarCredenciais(email, senha);
    console.log(`✅ Usuário autenticado: ${usuario.nome}`);

    // 2. Gerar token
    const token = await gerarToken(usuario);
    console.log(`✅ Token gerado: ${token.token.substring(0, 20)}...`);

    // 3. Salvar sessão
    await salvarSessao(token);
    console.log("✅ Login concluído com sucesso!\n");
  } catch (erro) {
    console.log("❌ Erro no login:", (erro as Error).message, "\n");
  }
}

// Testes
setTimeout(() => {
  fazerLogin("user@email.com", "123456"); // Sucesso
  setTimeout(() => fazerLogin("wrong@email.com", "wrong"), 2000); // Erro
}, 8000);

// ============================================
// 6. MÚLTIPLAS OPERAÇÕES SEQUENCIAIS
// ============================================

console.log("\n=== OPERAÇÕES SEQUENCIAIS ===\n");

async function processarPedido(produtoId: number, quantidade: number) {
  try {
    console.log("🛒 Processando pedido...\n");

    // Cada operação espera a anterior terminar
    console.log("1️⃣ Validando produto...");
    await esperar(500);
    console.log("✅ Produto válido");

    console.log("2️⃣ Verificando estoque...");
    await esperar(500);
    console.log("✅ Estoque disponível");

    console.log("3️⃣ Processando pagamento...");
    await esperar(800);
    console.log("✅ Pagamento aprovado");

    console.log("4️⃣ Criando pedido...");
    await esperar(300);
    console.log("✅ Pedido criado\n");

    console.log("🎉 Pedido finalizado com sucesso!\n");
  } catch (erro) {
    console.log("❌ Erro ao processar pedido:", erro);
  }
}

setTimeout(() => processarPedido(1, 2), 12000);

// ============================================
// 7. COMPARAÇÃO: .then() vs async/await
// ============================================

console.log("\n=== COMPARAÇÃO ===\n");

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

function buscarProduto(id: number): Promise<Produto> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        nome: `Produto ${id}`,
        preco: 99.99,
      });
    }, 500);
  });
}

function calcularFrete(produto: Produto): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(produto.preco * 0.1); // 10% do valor
    }, 300);
  });
}

// ❌ FORMA ANTIGA (.then)
function calcularTotalComThen(produtoId: number): void {
  buscarProduto(produtoId)
    .then((produto) => {
      console.log("Produto:", produto.nome);
      return calcularFrete(produto);
    })
    .then((frete) => {
      console.log("Frete:", frete);
    })
    .catch((erro) => {
      console.log("Erro:", erro);
    });
}

// ✅ FORMA MODERNA (async/await)
async function calcularTotalComAsync(produtoId: number): Promise<void> {
  try {
    const produto = await buscarProduto(produtoId);
    console.log("Produto:", produto.nome);

    const frete = await calcularFrete(produto);
    console.log("Frete:", frete);
  } catch (erro) {
    console.log("Erro:", erro);
  }
}

setTimeout(() => {
  console.log("Com .then():");
  calcularTotalComThen(1);

  setTimeout(() => {
    console.log("\nCom async/await:");
    calcularTotalComAsync(1);
  }, 1500);
}, 15000);

// ============================================
// 8. EXERCÍCIO
// ============================================

console.log("\n=== EXERCÍCIO ===\n");

/**
 * DESAFIO:
 * Converta esta função que usa .then() para async/await
 */

function buscarEndereco(cep: string): Promise<{ rua: string; cidade: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cep.length === 8) {
        resolve({
          rua: "Rua das Flores",
          cidade: "São Paulo",
        });
      } else {
        reject(new Error("CEP inválido"));
      }
    }, 500);
  });
}

// Forma antiga (NÃO MODIFICAR)
function validarCEPComThen(cep: string): void {
  buscarEndereco(cep)
    .then((endereco) => {
      console.log(`✅ Endereço: ${endereco.rua}, ${endereco.cidade}`);
    })
    .catch((erro) => {
      console.log("❌", erro.message);
    });
}

// TODO: Implemente usando async/await
async function validarCEPComAsync(cep: string): Promise<void> {
  try {
    const endereco = await buscarEndereco(cep);
    console.log(`✅ Endereço: ${endereco.rua}, ${endereco.cidade}`);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Testes
setTimeout(() => {
  console.log("Testando com .then():");
  validarCEPComThen("12345678");

  setTimeout(() => {
    console.log("\nTestando com async/await:");
    validarCEPComAsync("12345678");
  }, 1000);
}, 18000);

// ============================================
// RESUMO - async/await
// ============================================

/**
 * 🎯 PONTOS IMPORTANTES:
 *
 * 1. async/await é AÇÚCAR SINTÁTICO sobre Promises
 * 2. Torna código assíncrono parecer síncrono
 * 3. Muito mais fácil de ler e manter
 * 4. Use try/catch para erros
 * 5. Só pode usar await dentro de função async
 *
 * ✅ QUANDO USAR:
 * - SEMPRE que possível!
 * - Muito mais legível que .then()
 * - Padrão moderno de JavaScript/TypeScript
 *
 * 📝 SINTAXE:
 *
 * async function nome() {
 *   try {
 *     const resultado = await minhaPromise();
 *   } catch (erro) {
 *     // tratar erro
 *   }
 * }
 *
 * 🎯 PRÓXIMOS PASSOS:
 * - Exercícios práticos
 * - Múltiplas promises em paralelo
 * - Tratamento avançado de erros
 */
