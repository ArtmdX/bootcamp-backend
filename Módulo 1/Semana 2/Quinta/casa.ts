/**
 * ============================================
 * QUINTA-FEIRA - DEVER DE CASA
 * Agregador de Dados de APIs
 * ============================================
 *
 * OBJETIVO:
 * Criar um sistema que consome JSONPlaceholder
 * e agrega dados de múltiplas fontes
 *
 * TEMPO ESTIMADO: 1.5-2 horas
 */

const BASE_URL = "https://jsonplaceholder.typicode.com";

// ============================================
// TIPOS E INTERFACES
// ============================================

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
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

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PerfilCompleto {
  usuario: User;
  estatisticas: {
    totalPosts: number;
    totalComentarios: number;
    totalTodos: number;
    todosCompletos: number;
    totalAlbums: number;
    totalFotos: number;
  };
  ultimosPosts: Post[];
  proximasTarefas: Todo[];
}

// ============================================
// PARTE 1: FUNÇÕES BÁSICAS DE FETCH
// ============================================

/**
 * TODO 1: Crie funções genéricas de fetch
 */

async function buscarUsuario(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Usuário ${id} não encontrado`);
  }

  return await response.json();
}

async function buscarPostsUsuario(userId: number): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar posts");
  }

  return await response.json();
}

async function buscarComentariosPost(postId: number): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);

  if (!response.ok) {
    throw new Error("Erro ao buscar comentários");
  }

  return await response.json();
}

async function buscarTodosUsuario(userId: number): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar todos");
  }

  return await response.json();
}

async function buscarAlbumsUsuario(userId: number): Promise<Album[]> {
  const response = await fetch(`${BASE_URL}/albums?userId=${userId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar álbuns");
  }

  return await response.json();
}

async function buscarFotosAlbum(albumId: number): Promise<Photo[]> {
  const response = await fetch(`${BASE_URL}/albums/${albumId}/photos`);

  if (!response.ok) {
    throw new Error("Erro ao buscar fotos");
  }

  return await response.json();
}

// ============================================
// PARTE 2: FUNÇÕES DE AGREGAÇÃO
// ============================================

/**
 * TODO 2: Crie função que busca perfil completo de um usuário
 *
 * Deve buscar em PARALELO:
 * - Dados do usuário
 * - Posts do usuário
 * - Todos do usuário
 * - Álbuns do usuário
 *
 * Depois, para cada álbum, buscar fotos (também em paralelo)
 *
 * Retornar objeto PerfilCompleto com:
 * - Dados do usuário
 * - Estatísticas agregadas
 * - 5 últimos posts
 * - 5 próximas tarefas pendentes
 */

async function buscarPerfilCompleto(userId: number): Promise<PerfilCompleto> {
  console.log(`\n🔄 Carregando perfil do usuário ${userId}...\n`);

  const inicio = Date.now();

  try {
    // Buscar dados principais em paralelo
    const [usuario, posts, todos, albums] = await Promise.all([
      buscarUsuario(userId),
      buscarPostsUsuario(userId),
      buscarTodosUsuario(userId),
      buscarAlbumsUsuario(userId),
    ]);

    // Buscar comentários de todos os posts em paralelo
    const comentariosPorPost = await Promise.all(
      posts.map((post) => buscarComentariosPost(post.id))
    );

    const totalComentarios = comentariosPorPost.reduce(
      (total, comentarios) => total + comentarios.length,
      0
    );

    // Buscar fotos do primeiro álbum (para não demorar muito)
    const fotos = albums.length > 0 ? await buscarFotosAlbum(albums[0].id) : [];

    const fim = Date.now();

    console.log(`✅ Perfil carregado em ${fim - inicio}ms\n`);

    return {
      usuario,
      estatisticas: {
        totalPosts: posts.length,
        totalComentarios,
        totalTodos: todos.length,
        todosCompletos: todos.filter((t) => t.completed).length,
        totalAlbums: albums.length,
        totalFotos: fotos.length,
      },
      ultimosPosts: posts.slice(-5).reverse(),
      proximasTarefas: todos.filter((t) => !t.completed).slice(0, 5),
    };
  } catch (erro) {
    console.log("❌ Erro ao carregar perfil:", (erro as Error).message);
    throw erro;
  }
}

/**
 * TODO 3: Função para exibir perfil formatado
 */

async function exibirPerfilCompleto(userId: number): Promise<void> {
  try {
    const perfil = await buscarPerfilCompleto(userId);

    console.log("=".repeat(60));
    console.log(`PERFIL COMPLETO - ${perfil.usuario.name.toUpperCase()}`);
    console.log("=".repeat(60));

    console.log("\n📧 CONTATO");
    console.log(`   Email: ${perfil.usuario.email}`);
    console.log(`   Telefone: ${perfil.usuario.phone}`);
    console.log(`   Website: ${perfil.usuario.website}`);

    console.log("\n🏢 EMPRESA");
    console.log(`   Nome: ${perfil.usuario.company.name}`);
    console.log(`   Slogan: ${perfil.usuario.company.catchPhrase}`);

    console.log("\n🌍 ENDEREÇO");
    console.log(`   Cidade: ${perfil.usuario.address.city}`);
    console.log(`   Rua: ${perfil.usuario.address.street}, ${perfil.usuario.address.suite}`);

    console.log("\n📊 ESTATÍSTICAS");
    console.log(`   Posts: ${perfil.estatisticas.totalPosts}`);
    console.log(`   Comentários recebidos: ${perfil.estatisticas.totalComentarios}`);
    console.log(`   Tarefas: ${perfil.estatisticas.totalTodos}`);
    console.log(`   ✅ Completas: ${perfil.estatisticas.todosCompletos}`);
    console.log(
      `   ⏳ Pendentes: ${perfil.estatisticas.totalTodos - perfil.estatisticas.todosCompletos}`
    );
    console.log(`   Álbuns: ${perfil.estatisticas.totalAlbums}`);

    console.log("\n📝 ÚLTIMOS POSTS");
    perfil.ultimosPosts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });

    console.log("\n⏳ PRÓXIMAS TAREFAS");
    perfil.proximasTarefas.forEach((todo, index) => {
      console.log(`   ${index + 1}. ${todo.title}`);
    });

    console.log("\n" + "=".repeat(60) + "\n");
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// Teste
// exibirPerfilCompleto(1);

// ============================================
// PARTE 3: COMPARAÇÃO DE USUÁRIOS
// ============================================

/**
 * TODO 4: Função que compara dois usuários
 *
 * Busca perfil de ambos e compara:
 * - Quem tem mais posts
 * - Quem tem mais tarefas completas
 * - Quem tem mais álbuns
 */

interface Comparacao {
  usuario1: {
    nome: string;
    posts: number;
    todosCompletos: number;
    albums: number;
  };
  usuario2: {
    nome: string;
    posts: number;
    todosCompletos: number;
    albums: number;
  };
  vencedor: {
    maisPosts: string;
    maisTodosCompletos: string;
    maisAlbums: string;
  };
}

async function compararUsuarios(
  userId1: number,
  userId2: number
): Promise<void> {
  try {
    console.log(`\n⚖️ Comparando usuários ${userId1} e ${userId2}...\n`);

    // Buscar perfis em paralelo
    const [perfil1, perfil2] = await Promise.all([
      buscarPerfilCompleto(userId1),
      buscarPerfilCompleto(userId2),
    ]);

    const comparacao: Comparacao = {
      usuario1: {
        nome: perfil1.usuario.name,
        posts: perfil1.estatisticas.totalPosts,
        todosCompletos: perfil1.estatisticas.todosCompletos,
        albums: perfil1.estatisticas.totalAlbums,
      },
      usuario2: {
        nome: perfil2.usuario.name,
        posts: perfil2.estatisticas.totalPosts,
        todosCompletos: perfil2.estatisticas.todosCompletos,
        albums: perfil2.estatisticas.totalAlbums,
      },
      vencedor: {
        maisPosts:
          perfil1.estatisticas.totalPosts > perfil2.estatisticas.totalPosts
            ? perfil1.usuario.name
            : perfil2.usuario.name,
        maisTodosCompletos:
          perfil1.estatisticas.todosCompletos >
          perfil2.estatisticas.todosCompletos
            ? perfil1.usuario.name
            : perfil2.usuario.name,
        maisAlbums:
          perfil1.estatisticas.totalAlbums > perfil2.estatisticas.totalAlbums
            ? perfil1.usuario.name
            : perfil2.usuario.name,
      },
    };

    console.log("=".repeat(60));
    console.log("COMPARAÇÃO");
    console.log("=".repeat(60));

    console.log(`\n${comparacao.usuario1.nome} vs ${comparacao.usuario2.nome}\n`);

    console.log("📝 Posts:");
    console.log(`   ${comparacao.usuario1.nome}: ${comparacao.usuario1.posts}`);
    console.log(`   ${comparacao.usuario2.nome}: ${comparacao.usuario2.posts}`);
    console.log(`   🏆 Vencedor: ${comparacao.vencedor.maisPosts}\n`);

    console.log("✅ Tarefas Completas:");
    console.log(
      `   ${comparacao.usuario1.nome}: ${comparacao.usuario1.todosCompletos}`
    );
    console.log(
      `   ${comparacao.usuario2.nome}: ${comparacao.usuario2.todosCompletos}`
    );
    console.log(`   🏆 Vencedor: ${comparacao.vencedor.maisTodosCompletos}\n`);

    console.log("📷 Álbuns:");
    console.log(`   ${comparacao.usuario1.nome}: ${comparacao.usuario1.albums}`);
    console.log(`   ${comparacao.usuario2.nome}: ${comparacao.usuario2.albums}`);
    console.log(`   🏆 Vencedor: ${comparacao.vencedor.maisAlbums}\n`);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// Teste
// compararUsuarios(1, 2);

// ============================================
// PARTE 4: RANKING
// ============================================

/**
 * TODO 5: Crie um ranking de todos os usuários
 *
 * Busca TODOS os usuários
 * Para cada um, busca estatísticas
 * Ordena por número de posts
 * Exibe top 5
 */

interface RankingUsuario {
  posicao: number;
  nome: string;
  posts: number;
  todosCompletos: number;
  albums: number;
}

async function gerarRanking(): Promise<void> {
  try {
    console.log("\n🏆 Gerando ranking de usuários...\n");

    const inicio = Date.now();

    // Buscar todos os usuários
    const responseUsers = await fetch(`${BASE_URL}/users`);
    const usuarios: User[] = await responseUsers.json();

    // Buscar posts de todos em paralelo
    const postsPorUsuario = await Promise.all(
      usuarios.map((user) => buscarPostsUsuario(user.id))
    );

    // Buscar todos de todos em paralelo
    const todosPorUsuario = await Promise.all(
      usuarios.map((user) => buscarTodosUsuario(user.id))
    );

    // Buscar álbuns de todos em paralelo
    const albumsPorUsuario = await Promise.all(
      usuarios.map((user) => buscarAlbumsUsuario(user.id))
    );

    const fim = Date.now();

    // Montar ranking
    const ranking: RankingUsuario[] = usuarios
      .map((usuario, index) => ({
        posicao: 0, // Será preenchido após ordenação
        nome: usuario.name,
        posts: postsPorUsuario[index].length,
        todosCompletos: todosPorUsuario[index].filter((t) => t.completed).length,
        albums: albumsPorUsuario[index].length,
      }))
      .sort((a, b) => b.posts - a.posts) // Ordenar por posts
      .map((item, index) => ({
        ...item,
        posicao: index + 1,
      }));

    console.log("=".repeat(60));
    console.log("RANKING DE USUÁRIOS (por número de posts)");
    console.log("=".repeat(60));
    console.log(`\nDados carregados em ${fim - inicio}ms\n`);

    ranking.slice(0, 5).forEach((user) => {
      console.log(`${user.posicao}º - ${user.nome}`);
      console.log(`     Posts: ${user.posts}`);
      console.log(`     Tarefas Completas: ${user.todosCompletos}`);
      console.log(`     Álbuns: ${user.albums}\n`);
    });
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// Teste
// gerarRanking();

// ============================================
// PARTE 5: BUSCA E FILTROS
// ============================================

/**
 * TODO 6: Buscar posts por palavra-chave
 *
 * Busca TODOS os posts
 * Filtra por palavra no título ou corpo
 * Retorna posts com nome do autor
 */

interface PostComAutor {
  post: Post;
  autor: string;
}

async function buscarPostsPorPalavra(palavra: string): Promise<void> {
  try {
    console.log(`\n🔍 Buscando posts com a palavra "${palavra}"...\n`);

    // Buscar todos os posts
    const responsePosts = await fetch(`${BASE_URL}/posts`);
    const posts: Post[] = await responsePosts.json();

    // Filtrar posts que contenham a palavra
    const postsFiltrados = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(palavra.toLowerCase()) ||
        post.body.toLowerCase().includes(palavra.toLowerCase())
    );

    // Buscar autores dos posts filtrados
    const usuariosIds = [...new Set(postsFiltrados.map((p) => p.userId))];
    const usuarios = await Promise.all(
      usuariosIds.map((id) => buscarUsuario(id))
    );

    const usuariosMap = new Map(usuarios.map((u) => [u.id, u.name]));

    const postsComAutor: PostComAutor[] = postsFiltrados.map((post) => ({
      post,
      autor: usuariosMap.get(post.userId) || "Desconhecido",
    }));

    console.log(`✅ ${postsComAutor.length} posts encontrados:\n`);

    postsComAutor.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. "${item.post.title}"`);
      console.log(`   Por: ${item.autor}\n`);
    });
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// Teste
// buscarPostsPorPalavra("sunt");

// ============================================
// PARTE 6: ESTATÍSTICAS GERAIS
// ============================================

/**
 * TODO 7: Gerar relatório geral da plataforma
 *
 * Busca tudo e gera estatísticas:
 * - Total de usuários
 * - Total de posts
 * - Total de comentários
 * - Total de todos
 * - Taxa de conclusão de todos
 * - Média de posts por usuário
 * - Média de comentários por post
 */

async function relatorioGeral(): Promise<void> {
  try {
    console.log("\n📊 Gerando relatório geral...\n");

    const inicio = Date.now();

    // Buscar tudo em paralelo
    const [responseUsers, responsePosts, responseTodos] = await Promise.all([
      fetch(`${BASE_URL}/users`),
      fetch(`${BASE_URL}/posts`),
      fetch(`${BASE_URL}/todos`),
    ]);

    const usuarios: User[] = await responseUsers.json();
    const posts: Post[] = await responsePosts.json();
    const todos: Todo[] = await responseTodos.json();

    // Buscar comentários de todos os posts (limitando a 20 para não demorar)
    const comentarios = await Promise.all(
      posts.slice(0, 20).map((post) => buscarComentariosPost(post.id))
    );

    const totalComentarios = comentarios.reduce(
      (total, comments) => total + comments.length,
      0
    );

    const fim = Date.now();

    const todosCompletos = todos.filter((t) => t.completed).length;
    const taxaConclusao = ((todosCompletos / todos.length) * 100).toFixed(1);
    const mediaPosts = (posts.length / usuarios.length).toFixed(1);
    const mediaComentarios = (totalComentarios / 20).toFixed(1);

    console.log("=".repeat(60));
    console.log("RELATÓRIO GERAL DA PLATAFORMA");
    console.log("=".repeat(60));
    console.log(`\nGerado em ${fim - inicio}ms\n`);

    console.log("👥 Usuários:");
    console.log(`   Total: ${usuarios.length}\n`);

    console.log("📝 Posts:");
    console.log(`   Total: ${posts.length}`);
    console.log(`   Média por usuário: ${mediaPosts}\n`);

    console.log("💬 Comentários:");
    console.log(`   Total (amostra de 20 posts): ${totalComentarios}`);
    console.log(`   Média por post: ${mediaComentarios}\n`);

    console.log("📋 Tarefas:");
    console.log(`   Total: ${todos.length}`);
    console.log(`   Completas: ${todosCompletos}`);
    console.log(`   Pendentes: ${todos.length - todosCompletos}`);
    console.log(`   Taxa de conclusão: ${taxaConclusao}%\n`);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// Teste
// relatorioGeral();

// ============================================
// TESTES
// ============================================

console.log("\n🧪 EXECUTANDO TESTES...\n");

setTimeout(() => exibirPerfilCompleto(1), 1000);
setTimeout(() => compararUsuarios(1, 2), 4000);
setTimeout(() => gerarRanking(), 7000);
setTimeout(() => buscarPostsPorPalavra("sunt"), 12000);
setTimeout(() => relatorioGeral(), 15000);

// ============================================
// CRITÉRIOS DE AVALIAÇÃO
// ============================================

/**
 * ✅ CHECKLIST:
 *
 * [ ] Todas as funções implementadas
 * [ ] Usa fetch corretamente
 * [ ] Busca em paralelo quando possível
 * [ ] Tratamento de erros
 * [ ] Dados agregados corretamente
 * [ ] Saída formatada e legível
 * [ ] Tipos TypeScript corretos
 * [ ] Performance otimizada
 *
 * 🎯 CONCEITOS PRATICADOS:
 *
 * - Fetch API
 * - Promises e async/await
 * - Promise.all para operações paralelas
 * - Agregação de dados
 * - Filtros e buscas
 * - Ordenação e rankings
 * - Estatísticas e cálculos
 * - Tratamento de erros
 *
 * 🎓 PRÓXIMA SEMANA:
 * Sexta-feira - Projeto integrador da semana
 */
