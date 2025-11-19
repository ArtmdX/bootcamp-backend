/**
 * ============================================
 * QUINTA-FEIRA - EXERCÍCIO
 * Exercícios Práticos de Fetch
 * ============================================
 */

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Tipos
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: { city: string };
  company: { name: string };
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// ============================================
// EXERCÍCIO 1: Buscar e Exibir Usuário
// ============================================

console.log("\n=== EXERCÍCIO 1 ===\n");

/**
 * TODO: Crie uma função que busca um usuário por ID
 * e exibe nome, email e cidade
 */

async function exibirUsuario(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error("Usuário não encontrado");
    }

    const usuario: User = await response.json();

    console.log(`👤 ${usuario.name}`);
    console.log(`📧 ${usuario.email}`);
    console.log(`🌍 ${usuario.address.city}\n`);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// exibirUsuario(1);

// ============================================
// EXERCÍCIO 2: Listar Posts
// ============================================

console.log("\n=== EXERCÍCIO 2 ===\n");

/**
 * TODO: Crie uma função que lista os primeiros 10 posts
 * Exiba apenas ID e título
 */

async function listarPosts(limite: number = 10): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const posts: Post[] = await response.json();

    console.log(`📝 Primeiros ${limite} posts:\n`);

    posts.slice(0, limite).forEach((post) => {
      console.log(`${post.id}. ${post.title}`);
    });
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// listarPosts(5);

// ============================================
// EXERCÍCIO 3: Contar Posts por Usuário
// ============================================

console.log("\n=== EXERCÍCIO 3 ===\n");

/**
 * TODO: Busque TODOS os posts e conte quantos cada usuário tem
 * Exiba: "Usuário X: Y posts"
 */

async function contarPostsPorUsuario(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const posts: Post[] = await response.json();

    const contagem: { [key: number]: number } = {};

    posts.forEach((post) => {
      contagem[post.userId] = (contagem[post.userId] || 0) + 1;
    });

    console.log("📊 Posts por usuário:\n");

    Object.entries(contagem).forEach(([userId, count]) => {
      console.log(`Usuário ${userId}: ${count} posts`);
    });
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// contarPostsPorUsuario();

// ============================================
// EXERCÍCIO 4: Buscar Post com Autor
// ============================================

console.log("\n=== EXERCÍCIO 4 ===\n");

/**
 * TODO: Busque um post E seu autor em paralelo
 * Exiba título do post e nome do autor
 */

async function exibirPostComAutor(postId: number): Promise<void> {
  try {
    const postResponse = await fetch(`${BASE_URL}/posts/${postId}`);
    const post: Post = await postResponse.json();

    const autorResponse = await fetch(`${BASE_URL}/users/${post.userId}`);
    const autor: User = await autorResponse.json();

    console.log(`📝 "${post.title}"`);
    console.log(`✍️  Por: ${autor.name}\n`);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// exibirPostComAutor(1);

// ============================================
// EXERCÍCIO 5: Tarefas Pendentes
// ============================================

console.log("\n=== EXERCÍCIO 5 ===\n");

/**
 * TODO: Busque tarefas de um usuário
 * Filtre apenas as NÃO completas
 * Exiba quantidade e lista
 */

async function listarTarefasPendentes(userId: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);
    const todos: Todo[] = await response.json();

    const pendentes = todos.filter((t) => !t.completed);

    console.log(`⏳ Usuário ${userId} tem ${pendentes.length} tarefas pendentes:\n`);

    pendentes.slice(0, 5).forEach((todo, index) => {
      console.log(`${index + 1}. ${todo.title}`);
    });
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// listarTarefasPendentes(1);

// ============================================
// EXERCÍCIO 6: Estatísticas de Tarefas
// ============================================

console.log("\n=== EXERCÍCIO 6 ===\n");

/**
 * TODO: Busque todas as tarefas de um usuário
 * Calcule e exiba:
 * - Total
 * - Completas
 * - Pendentes
 * - Percentual de conclusão
 */

async function estatisticasTarefas(userId: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);
    const todos: Todo[] = await response.json();

    const total = todos.length;
    const completas = todos.filter((t) => t.completed).length;
    const pendentes = total - completas;
    const percentual = ((completas / total) * 100).toFixed(1);

    console.log(`📊 Estatísticas do usuário ${userId}:\n`);
    console.log(`Total: ${total}`);
    console.log(`✅ Completas: ${completas}`);
    console.log(`⏳ Pendentes: ${pendentes}`);
    console.log(`📈 Conclusão: ${percentual}%\n`);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// estatisticasTarefas(1);

// ============================================
// EXERCÍCIO 7: Buscar Múltiplos Usuários
// ============================================

console.log("\n=== EXERCÍCIO 7 ===\n");

/**
 * TODO: Busque 3 usuários específicos (IDs 1, 2, 3)
 * em PARALELO usando Promise.all
 * Exiba nome de cada um
 */

async function buscarVariosUsuarios(ids: number[]): Promise<void> {
  try {
    const promises = ids.map((id) =>
      fetch(`${BASE_URL}/users/${id}`).then((r) => r.json())
    );

    const usuarios: User[] = await Promise.all(promises);

    console.log(`👥 ${usuarios.length} usuários:\n`);

    usuarios.forEach((user) => {
      console.log(`- ${user.name} (${user.email})`);
    });
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// buscarVariosUsuarios([1, 2, 3]);

// ============================================
// EXERCÍCIO 8: Post Mais Comentado
// ============================================

console.log("\n=== EXERCÍCIO 8 ===\n");

/**
 * TODO: Busque os primeiros 10 posts
 * Para cada um, busque os comentários
 * Encontre qual post tem MAIS comentários
 * Exiba o título e quantidade de comentários
 */

async function encontrarPostMaisComentado(): Promise<void> {
  try {
    const postsResponse = await fetch(`${BASE_URL}/posts`);
    const posts: Post[] = await postsResponse.json();

    const primeiros10 = posts.slice(0, 10);

    // Buscar comentários de todos em paralelo
    const comentariosPorPost = await Promise.all(
      primeiros10.map(async (post) => {
        const response = await fetch(`${BASE_URL}/posts/${post.id}/comments`);
        const comments: Comment[] = await response.json();
        return { post, comentarios: comments.length };
      })
    );

    // Encontrar o mais comentado
    const maisComentado = comentariosPorPost.reduce((max, atual) =>
      atual.comentarios > max.comentarios ? atual : max
    );

    console.log("🏆 Post mais comentado (dos primeiros 10):\n");
    console.log(`Título: ${maisComentado.post.title}`);
    console.log(`Comentários: ${maisComentado.comentarios}\n`);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// encontrarPostMaisComentado();

// ============================================
// EXERCÍCIO 9: DESAFIO - Relatório Completo
// ============================================

console.log("\n=== EXERCÍCIO 9: DESAFIO ===\n");

/**
 * TODO: Crie um relatório completo de um usuário:
 *
 * 1. Dados do usuário (nome, email, empresa)
 * 2. Quantidade de posts
 * 3. Quantidade de tarefas (total, completas, pendentes)
 * 4. Lista dos 3 últimos posts
 * 5. Próximas 3 tarefas pendentes
 *
 * TUDO deve ser buscado em paralelo quando possível!
 */

async function relatorioCompletoUsuario(userId: number): Promise<void> {
  try {
    console.log(`\n📋 RELATÓRIO COMPLETO - USUÁRIO ${userId}`);
    console.log("=".repeat(50) + "\n");

    const inicio = Date.now();

    // Buscar tudo em paralelo
    const [userResponse, postsResponse, todosResponse] = await Promise.all([
      fetch(`${BASE_URL}/users/${userId}`),
      fetch(`${BASE_URL}/posts?userId=${userId}`),
      fetch(`${BASE_URL}/todos?userId=${userId}`),
    ]);

    const usuario: User = await userResponse.json();
    const posts: Post[] = await postsResponse.json();
    const todos: Todo[] = await todosResponse.json();

    const todosCompletos = todos.filter((t) => t.completed);
    const todosPendentes = todos.filter((t) => !t.completed);

    const fim = Date.now();

    // Exibir relatório
    console.log("👤 DADOS PESSOAIS");
    console.log(`   Nome: ${usuario.name}`);
    console.log(`   Email: ${usuario.email}`);
    console.log(`   Empresa: ${usuario.company.name}\n`);

    console.log("📊 ESTATÍSTICAS");
    console.log(`   Posts: ${posts.length}`);
    console.log(`   Tarefas: ${todos.length}`);
    console.log(`   ✅ Completas: ${todosCompletos.length}`);
    console.log(`   ⏳ Pendentes: ${todosPendentes.length}\n`);

    console.log("📝 ÚLTIMOS POSTS");
    posts
      .slice(-3)
      .reverse()
      .forEach((post, i) => {
        console.log(`   ${i + 1}. ${post.title}`);
      });

    console.log("\n⏳ PRÓXIMAS TAREFAS");
    todosPendentes.slice(0, 3).forEach((todo, i) => {
      console.log(`   ${i + 1}. ${todo.title}`);
    });

    console.log(`\n⏱️ Relatório gerado em ${fim - inicio}ms\n`);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// Teste
// relatorioCompletoUsuario(1);

// ============================================
// RESUMO
// ============================================

/**
 * 🎯 O QUE VOCÊ PRATICOU:
 *
 * 1. Buscar dados com fetch
 * 2. Processar arrays de dados
 * 3. Filtrar e contar
 * 4. Buscar em paralelo
 * 5. Relacionar dados de múltiplas fontes
 * 6. Criar relatórios
 * 7. Calcular estatísticas
 *
 * ✅ PRÓXIMOS PASSOS:
 * - Tratamento avançado de erros
 * - Criar suas próprias APIs
 * - Trabalhar com dados reais
 */
