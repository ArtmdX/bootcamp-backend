/**
 * ============================================
 * TERÇA-FEIRA - AULA 1
 * Introdução a Promises - Conceitos Básicos
 * ============================================
 *
 * OBJETIVO:
 * Entender o que são Promises e por que elas existem
 * Aprender a criar e usar Promises básicas
 */

// ============================================
// 1. O PROBLEMA: CÓDIGO SÍNCRONO
// ============================================

console.log("\n=== PROBLEMA: Código Síncrono ===\n");

/**
 * Código SÍNCRONO executa linha por linha.
 * Se uma operação demora, TRAVA tudo!
 */

function operacaoDemoradaSincrona(): void {
  console.log("⏳ Iniciando operação...");

  // Simula algo que demora (NÃO FAÇA ISSO!)
  const inicio = Date.now();
  while (Date.now() - inicio < 2000) {
    // Espera 2 segundos TRAVANDO o programa
  }

  console.log("✅ Operação concluída!");
}

console.log("1️⃣ Antes da operação");
// operacaoDemoradaSincrona(); // Descomente para ver o problema
console.log("2️⃣ Depois da operação");

/**
 * PROBLEMA:
 * Durante a operação demorada, o programa TRAVA.
 * Não pode fazer mais nada até terminar!
 */

// ============================================
// 2. A SOLUÇÃO: CÓDIGO ASSÍNCRONO
// ============================================

console.log("\n=== SOLUÇÃO: Código Assíncrono ===\n");

/**
 * Código ASSÍNCRONO não trava.
 * Inicia a operação e continua executando!
 */

function operacaoDemoradaAssincrona(): void {
  console.log("⏳ Iniciando operação assíncrona...");

  // setTimeout é ASSÍNCRONO - não trava!
  setTimeout(() => {
    console.log("✅ Operação assíncrona concluída!");
  }, 2000);
}

console.log("1️⃣ Antes da operação");
operacaoDemoradaAssincrona();
console.log("2️⃣ Depois da operação (não esperou!)");

/**
 * ORDEM DE EXECUÇÃO:
 * 1. "Antes da operação"
 * 2. "Iniciando operação assíncrona..."
 * 3. "Depois da operação" (NÃO ESPEROU!)
 * 4. ... 2 segundos depois ...
 * 5. "Operação concluída!"
 */

// ============================================
// 3. O QUE É UMA PROMISE?
// ============================================

console.log("\n=== O QUE É UMA PROMISE? ===\n");

/**
 * Promise = Promessa
 *
 * É uma PROMESSA de que algo vai acontecer no futuro.
 *
 * Analogia:
 * Você pede uma pizza pelo telefone.
 * A pizzaria PROMETE entregar.
 *
 * 3 estados possíveis:
 * - PENDENTE: Pizza sendo preparada
 * - RESOLVIDA: Pizza chegou! ✅
 * - REJEITADA: Pizza queimou! ❌
 */

// ============================================
// 4. CRIANDO UMA PROMISE SIMPLES
// ============================================

console.log("\n=== CRIANDO UMA PROMISE ===\n");

// Promise que SEMPRE dá certo
const promessaSimples = new Promise<string>((resolve, reject) => {
  // Esta função executa IMEDIATAMENTE
  console.log("🔄 Promise criada e executando...");

  // Simula operação assíncrona (2 segundos)
  setTimeout(() => {
    // "resolve" marca a promise como RESOLVIDA
    resolve("✅ Sucesso! Operação completada.");
  }, 2000);
});

console.log("Promise criada, mas ainda não resolvida");
console.log("Estado atual:", promessaSimples); // Promise { <pending> }

// ============================================
// 5. USANDO UMA PROMISE COM .then()
// ============================================

console.log("\n=== USANDO .then() ===\n");

/**
 * .then() recebe o resultado quando a promise RESOLVER
 */

const minhaPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("Dados carregados!");
  }, 1000);
});

console.log("Antes do .then()");

minhaPromise.then((resultado) => {
  console.log("Resultado:", resultado);
});

console.log("Depois do .then() (não esperou!)");

/**
 * ORDEM:
 * 1. "Antes do .then()"
 * 2. "Depois do .then()"
 * 3. ... 1 segundo depois ...
 * 4. "Resultado: Dados carregados!"
 */

// ============================================
// 6. PROMISE QUE PODE FALHAR
// ============================================

console.log("\n=== PROMISE COM SUCESSO OU ERRO ===\n");

function buscarUsuario(id: number): Promise<{ id: number; nome: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        // Sucesso!
        resolve({
          id: id,
          nome: `Usuário ${id}`,
        });
      } else {
        // Erro!
        reject(new Error("ID inválido!"));
      }
    }, 1000);
  });
}

// Teste com ID válido
buscarUsuario(5)
  .then((usuario) => {
    console.log("✅ Usuário encontrado:", usuario);
  })
  .catch((erro) => {
    console.log("❌ Erro:", erro.message);
  });

// Teste com ID inválido
buscarUsuario(-1)
  .then((usuario) => {
    console.log("✅ Usuário encontrado:", usuario);
  })
  .catch((erro) => {
    console.log("❌ Erro:", erro.message);
  });

// ============================================
// 7. ANATOMIA DE UMA PROMISE
// ============================================

console.log("\n=== ANATOMIA DE UMA PROMISE ===\n");

const promiseDetalhada = new Promise<number>((resolve, reject) => {
  /**
   * PARÂMETROS:
   * - resolve: Função que você chama quando dá CERTO
   * - reject: Função que você chama quando dá ERRADO
   *
   * ATENÇÃO:
   * Você só pode chamar UM deles, uma vez!
   * Se chamar resolve, não pode mais chamar reject.
   */

  const sucesso = Math.random() > 0.5; // 50% de chance

  setTimeout(() => {
    if (sucesso) {
      resolve(42); // Passa o resultado
    } else {
      reject(new Error("Deu ruim!")); // Passa o erro
    }
  }, 1000);
});

promiseDetalhada
  .then((numero) => {
    console.log("✅ Número recebido:", numero);
  })
  .catch((erro) => {
    console.log("❌ Erro capturado:", erro.message);
  });

// ============================================
// 8. MÚLTIPLOS .then() ENCADEADOS
// ============================================

console.log("\n=== ENCADEAMENTO DE .then() ===\n");

function buscarNumero(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 500);
  });
}

buscarNumero()
  .then((numero) => {
    console.log("1️⃣ Número original:", numero);
    return numero * 2; // Retorna para o próximo .then()
  })
  .then((numeroMultiplicado) => {
    console.log("2️⃣ Número multiplicado:", numeroMultiplicado);
    return numeroMultiplicado + 5;
  })
  .then((numeroFinal) => {
    console.log("3️⃣ Número final:", numeroFinal);
  });

// ============================================
// 9. EXEMPLO PRÁTICO: BUSCAR DADOS
// ============================================

console.log("\n=== EXEMPLO PRÁTICO ===\n");

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
}

// Simula buscar posts de uma API
function buscarPosts(): Promise<Post[]> {
  return new Promise((resolve, reject) => {
    console.log("🔄 Buscando posts...");

    setTimeout(() => {
      const sucesso = Math.random() > 0.2; // 80% de sucesso

      if (sucesso) {
        resolve([
          { id: 1, titulo: "Post 1", conteudo: "Conteúdo 1" },
          { id: 2, titulo: "Post 2", conteudo: "Conteúdo 2" },
          { id: 3, titulo: "Post 3", conteudo: "Conteúdo 3" },
        ]);
      } else {
        reject(new Error("Servidor fora do ar"));
      }
    }, 1500);
  });
}

buscarPosts()
  .then((posts) => {
    console.log(`✅ ${posts.length} posts encontrados:`);
    posts.forEach((post) => {
      console.log(`  - ${post.titulo}`);
    });
  })
  .catch((erro) => {
    console.log("❌ Erro ao buscar posts:", erro.message);
  });

// ============================================
// 10. PROMISE.resolve() e PROMISE.reject()
// ============================================

console.log("\n=== ATALHOS: Promise.resolve/reject ===\n");

// Cria uma promise já resolvida
const promiseResolvida = Promise.resolve("Já está pronto!");

promiseResolvida.then((valor) => {
  console.log("✅", valor);
});

// Cria uma promise já rejeitada
const promiseRejeitada = Promise.reject(new Error("Já deu erro!"));

promiseRejeitada.catch((erro) => {
  console.log("❌", erro.message);
});

// ============================================
// 11. EXERCÍCIO PRÁTICO
// ============================================

console.log("\n=== EXERCÍCIO ===\n");

/**
 * DESAFIO:
 * Crie uma função que simula um login.
 *
 * Se email == "usuario@email.com" E senha == "123456"
 *   -> resolve com { id: 1, nome: "Usuário" }
 *
 * Senão
 *   -> reject com erro "Credenciais inválidas"
 *
 * Deve demorar 1 segundo
 */

interface Usuario {
  id: number;
  nome: string;
}

// TODO: Implemente esta função
function fazerLogin(email: string, senha: string): Promise<Usuario> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "usuario@email.com" && senha === "123456") {
        resolve({
          id: 1,
          nome: "Usuário",
        });
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 1000);
  });
}

// Testando
console.log("🔐 Testando login...\n");

// Login correto
fazerLogin("usuario@email.com", "123456")
  .then((usuario) => {
    console.log("✅ Login bem-sucedido:", usuario);
  })
  .catch((erro) => {
    console.log("❌ Erro:", erro.message);
  });

// Login incorreto
fazerLogin("errado@email.com", "senha-errada")
  .then((usuario) => {
    console.log("✅ Login bem-sucedido:", usuario);
  })
  .catch((erro) => {
    console.log("❌ Erro:", erro.message);
  });

// ============================================
// RESUMO - PROMISES BÁSICAS
// ============================================

/**
 * 🎯 PONTOS IMPORTANTES:
 *
 * 1. Promise = Promessa de algo que vai acontecer
 * 2. Tem 3 estados: Pendente, Resolvida, Rejeitada
 * 3. Criamos com: new Promise((resolve, reject) => {})
 * 4. Usamos com: .then() para sucesso, .catch() para erro
 * 5. Código assíncrono NÃO TRAVA o programa
 *
 * 📝 QUANDO USAR:
 * - Buscar dados de APIs
 * - Ler/escrever arquivos
 * - Operações de banco de dados
 * - Qualquer coisa que DEMORA
 *
 * ❌ ERROS COMUNS:
 * - Esquecer o return na Promise
 * - Não tratar erros (.catch)
 * - Confundir resolve com return
 * - Chamar resolve e reject juntos
 */

/**
 * 🎯 PRÓXIMOS PASSOS:
 * - Exercícios práticos de Promises
 * - Async/Await (forma moderna)
 */
