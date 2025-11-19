/**
 * ============================================
 * QUARTA-FEIRA - AULA 2
 * Múltiplas Promises em Paralelo
 * ============================================
 *
 * OBJETIVO:
 * Aprender a executar várias operações assíncronas
 * ao mesmo tempo usando Promise.all, Promise.race, etc.
 */

// ============================================
// 1. O PROBLEMA: OPERAÇÕES SEQUENCIAIS
// ============================================

console.log("\n=== PROBLEMA: Operações Sequenciais ===\n");

// Simulando APIs que demoram 1 segundo cada
function buscarUsuario(id: number): Promise<{ id: number; nome: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Usuário ${id} carregado`);
      resolve({ id, nome: `Usuário ${id}` });
    }, 1000);
  });
}

// ❌ FORMA LENTA - Uma de cada vez (3 segundos total)
async function formaLenta(): Promise<void> {
  console.log("⏰ Iniciando busca sequencial...");
  const inicio = Date.now();

  const user1 = await buscarUsuario(1); // Espera 1s
  const user2 = await buscarUsuario(2); // Espera 1s
  const user3 = await buscarUsuario(3); // Espera 1s

  const fim = Date.now();
  console.log(`⏱️ Tempo total: ${(fim - inicio) / 1000}s`);
  console.log("Usuários:", [user1, user2, user3]);
}

// Descomente para testar (demora 3 segundos)
// formaLenta();

// ============================================
// 2. SOLUÇÃO: Promise.all()
// ============================================

console.log("\n=== SOLUÇÃO: Promise.all() ===\n");

// ✅ FORMA RÁPIDA - Todas ao mesmo tempo (1 segundo total)
async function formaRapida(): Promise<void> {
  console.log("🚀 Iniciando busca paralela...");
  const inicio = Date.now();

  // Executa as 3 promises AO MESMO TEMPO
  const usuarios = await Promise.all([
    buscarUsuario(1),
    buscarUsuario(2),
    buscarUsuario(3),
  ]);

  const fim = Date.now();
  console.log(`⏱️ Tempo total: ${(fim - inicio) / 1000}s`);
  console.log("Usuários:", usuarios);
}

formaRapida();

// ============================================
// 3. Promise.all() - DETALHES
// ============================================

console.log("\n=== EXEMPLO 2: Promise.all em detalhes ===\n");

interface Post {
  id: number;
  titulo: string;
}

interface Comentario {
  id: number;
  texto: string;
}

interface Categoria {
  id: number;
  nome: string;
}

// Simulando diferentes APIs
function buscarPosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📝 Posts carregados");
      resolve([
        { id: 1, titulo: "Post 1" },
        { id: 2, titulo: "Post 2" },
      ]);
    }, 800);
  });
}

function buscarComentarios(): Promise<Comentario[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("💬 Comentários carregados");
      resolve([
        { id: 1, texto: "Comentário 1" },
        { id: 2, texto: "Comentário 2" },
      ]);
    }, 1200);
  });
}

function buscarCategorias(): Promise<Categoria[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🏷️ Categorias carregadas");
      resolve([
        { id: 1, nome: "Tech" },
        { id: 2, nome: "News" },
      ]);
    }, 600);
  });
}

async function carregarDashboard(): Promise<void> {
  console.log("🔄 Carregando dashboard...");
  const inicio = Date.now();

  try {
    // Executa TODAS ao mesmo tempo
    const [posts, comentarios, categorias] = await Promise.all([
      buscarPosts(), // 800ms
      buscarComentarios(), // 1200ms
      buscarCategorias(), // 600ms
    ]);

    const fim = Date.now();

    console.log("\n✅ Dashboard carregado!");
    console.log(`⏱️ Tempo: ${(fim - inicio) / 1000}s`);
    console.log(`📊 Posts: ${posts.length}`);
    console.log(`💬 Comentários: ${comentarios.length}`);
    console.log(`🏷️ Categorias: ${categorias.length}`);
  } catch (erro) {
    console.log("❌ Erro ao carregar dashboard:", erro);
  }
}

setTimeout(() => carregarDashboard(), 3000);

// ============================================
// 4. Promise.all() - TRATAMENTO DE ERROS
// ============================================

console.log("\n=== EXEMPLO 3: Tratamento de erros ===\n");

function operacaoSucesso(id: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✅ Operação ${id} concluída`);
    }, 500);
  });
}

function operacaoComErro(id: number): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`❌ Operação ${id} falhou`));
    }, 500);
  });
}

// ❌ SE UMA FALHAR, TODAS FALHAM
async function testarPromiseAllComErro(): Promise<void> {
  try {
    const resultados = await Promise.all([
      operacaoSucesso(1),
      operacaoComErro(2), // Esta falha
      operacaoSucesso(3),
    ]);
    console.log("Resultados:", resultados);
  } catch (erro) {
    console.log("Erro capturado:", (erro as Error).message);
    console.log("⚠️ Promise.all para TUDO se uma falhar!");
  }
}

setTimeout(() => testarPromiseAllComErro(), 5000);

// ============================================
// 5. Promise.allSettled() - MELHOR OPÇÃO
// ============================================

console.log("\n=== EXEMPLO 4: Promise.allSettled() ===\n");

// ✅ EXECUTA TODAS, MESMO SE ALGUMAS FALHAREM
async function testarAllSettled(): Promise<void> {
  console.log("🔄 Executando todas as operações...");

  const resultados = await Promise.allSettled([
    operacaoSucesso(1),
    operacaoComErro(2), // Esta falha, mas não para as outras
    operacaoSucesso(3),
  ]);

  console.log("\n📊 Resultados:\n");

  resultados.forEach((resultado, index) => {
    if (resultado.status === "fulfilled") {
      console.log(`${index + 1}. Sucesso:`, resultado.value);
    } else {
      console.log(`${index + 1}. Falhou:`, resultado.reason.message);
    }
  });
}

setTimeout(() => testarAllSettled(), 6500);

// ============================================
// 6. Promise.race() - A PRIMEIRA QUE COMPLETAR
// ============================================

console.log("\n=== EXEMPLO 5: Promise.race() ===\n");

function operacaoRapida(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🐇 Operação rápida (500ms)");
    }, 500);
  });
}

function operacaoLenta(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🐢 Operação lenta (2000ms)");
    }, 2000);
  });
}

function operacaoMedia(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🦊 Operação média (1000ms)");
    }, 1000);
  });
}

// Retorna o resultado da PRIMEIRA que completar
async function testarRace(): Promise<void> {
  console.log("🏁 Iniciando corrida...");

  const vencedor = await Promise.race([
    operacaoLenta(),
    operacaoRapida(), // Esta ganha!
    operacaoMedia(),
  ]);

  console.log("🏆 Vencedor:", vencedor);
}

setTimeout(() => testarRace(), 8000);

// ============================================
// 7. Promise.any() - A PRIMEIRA QUE TER SUCESSO
// ============================================

console.log("\n=== EXEMPLO 6: Promise.any() ===\n");

function servidor1(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Servidor 1 fora do ar"));
    }, 300);
  });
}

function servidor2(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Servidor 2 respondeu!");
    }, 500);
  });
}

function servidor3(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Servidor 3 fora do ar"));
    }, 200);
  });
}

// Retorna a PRIMEIRA que TER SUCESSO (ignora falhas)
async function testarAny(): Promise<void> {
  try {
    console.log("🔄 Tentando conectar em vários servidores...");

    const resposta = await Promise.any([servidor1(), servidor2(), servidor3()]);

    console.log("🎉 Conectado:", resposta);
  } catch (erro) {
    console.log("❌ Todos os servidores falharam");
  }
}

setTimeout(() => testarAny(), 9000);

// ============================================
// 8. CASO PRÁTICO: CARREGAR PERFIL COMPLETO
// ============================================

console.log("\n=== CASO PRÁTICO ===\n");

interface UsuarioPerfil {
  id: number;
  nome: string;
  email: string;
}

interface UsuarioPost {
  id: number;
  titulo: string;
  likes: number;
}

interface UsuarioSeguidores {
  total: number;
  usuarios: string[];
}

interface PerfilCompleto {
  perfil: UsuarioPerfil;
  posts: UsuarioPost[];
  seguidores: UsuarioSeguidores;
}

// Simulando 3 APIs diferentes
function buscarPerfil(id: number): Promise<UsuarioPerfil> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        nome: "Samuel Silva",
        email: "samuel@email.com",
      });
    }, 600);
  });
}

function buscarPostsDoUsuario(id: number): Promise<UsuarioPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, titulo: "Meu primeiro post", likes: 10 },
        { id: 2, titulo: "Aprendendo TypeScript", likes: 25 },
      ]);
    }, 800);
  });
}

function buscarSeguidores(id: number): Promise<UsuarioSeguidores> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 150,
        usuarios: ["Arthur", "João", "Maria"],
      });
    }, 400);
  });
}

// ✅ Carrega tudo em paralelo
async function carregarPerfilCompleto(userId: number): Promise<void> {
  console.log("🔄 Carregando perfil completo...");
  const inicio = Date.now();

  try {
    const [perfil, posts, seguidores] = await Promise.all([
      buscarPerfil(userId),
      buscarPostsDoUsuario(userId),
      buscarSeguidores(userId),
    ]);

    const fim = Date.now();

    console.log("\n✅ Perfil carregado com sucesso!");
    console.log(`⏱️ Tempo: ${(fim - inicio) / 1000}s`);
    console.log("\n👤 Perfil:", perfil);
    console.log(`📝 Posts: ${posts.length}`);
    console.log(`👥 Seguidores: ${seguidores.total}`);
  } catch (erro) {
    console.log("❌ Erro ao carregar perfil:", erro);
  }
}

setTimeout(() => carregarPerfilCompleto(1), 10000);

// ============================================
// RESUMO - MÚLTIPLAS PROMISES
// ============================================

/**
 * 🎯 QUANDO USAR CADA UMA:
 *
 * Promise.all():
 * ✅ Quando TODAS as operações são obrigatórias
 * ✅ Se uma falhar, para tudo
 * ✅ Exemplo: Carregar dados essenciais de uma página
 *
 * Promise.allSettled():
 * ✅ Quando quer executar TODAS, mesmo se algumas falharem
 * ✅ Mais robusto que Promise.all
 * ✅ Exemplo: Sincronizar dados opcionais
 *
 * Promise.race():
 * ✅ Quando quer o resultado da PRIMEIRA que completar
 * ✅ Exemplo: Timeout, múltiplos servidores
 *
 * Promise.any():
 * ✅ Quando quer a PRIMEIRA que TER SUCESSO
 * ✅ Exemplo: Buscar em múltiplas CDNs
 *
 * ⏰ BENEFÍCIO:
 * - Sequencial: 1s + 1s + 1s = 3s
 * - Paralelo: max(1s, 1s, 1s) = 1s
 */

/**
 * 🎯 PRÓXIMOS PASSOS:
 * - Exercícios práticos
 * - Fetch API (consumir APIs reais)
 * - Encadeamento de Promises
 */
