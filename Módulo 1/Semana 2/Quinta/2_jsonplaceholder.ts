/**
 * ============================================
 * QUINTA-FEIRA - AULA 2
 * Explorando JSONPlaceholder
 * ============================================
 *
 * OBJETIVO:
 * Aprender a trabalhar com uma API real completa
 * Entender relacionamentos entre recursos
 */

// ============================================
// 1. O QUE É JSONPLACEHOLDER?
// ============================================

console.log("\n=== JSONPLACEHOLDER ===\n");

/**
 * JSONPlaceholder é uma API REST fake para testes
 *
 * Base URL: https://jsonplaceholder.typicode.com
 *
 * Recursos disponíveis:
 * - /posts (100 posts)
 * - /comments (500 comentários)
 * - /albums (100 álbuns)
 * - /photos (5000 fotos)
 * - /todos (200 tarefas)
 * - /users (10 usuários)
 *
 * VANTAGENS:
 * - Não precisa autenticação
 * - Grátis
 * - Perfeito para aprender
 * - Dados realistas
 */

// ============================================
// 2. TIPOS E INTERFACES
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

// ============================================
// 3. BUSCAR TODOS OS RECURSOS
// ============================================

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function buscarTodosOsUsuarios(): Promise<void> {
  try {
    console.log("👥 Buscando todos os usuários...\n");

    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    const usuarios: User[] = await response.json();

    console.log(`Total: ${usuarios.length} usuários\n`);

    usuarios.forEach((user) => {
      console.log(`${user.id}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Cidade: ${user.address.city}`);
      console.log(`   Empresa: ${user.company.name}\n`);
    });
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// buscarTodosOsUsuarios();

// ============================================
// 4. RELACIONAMENTOS ENTRE RECURSOS
// ============================================

console.log("\n=== RELACIONAMENTOS ===\n");

/**
 * COMO OS RECURSOS SE RELACIONAM:
 *
 * User (1) -> (N) Posts
 * User (1) -> (N) Albums
 * User (1) -> (N) Todos
 * Post (1) -> (N) Comments
 * Album (1) -> (N) Photos
 */

// Exemplo: Buscar usuário E seus posts
async function buscarUsuarioComPosts(userId: number): Promise<void> {
  try {
    console.log(`\n🔍 Buscando usuário ${userId} e seus posts...\n`);

    // Buscar usuário
    const userResponse = await fetch(`${BASE_URL}/users/${userId}`);
    if (!userResponse.ok) throw new Error("Usuário não encontrado");
    const usuario: User = await userResponse.json();

    // Buscar posts do usuário
    const postsResponse = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    if (!postsResponse.ok) throw new Error("Erro ao buscar posts");
    const posts: Post[] = await postsResponse.json();

    console.log(`👤 ${usuario.name} (${usuario.email})`);
    console.log(`📝 Total de posts: ${posts.length}\n`);

    posts.slice(0, 3).forEach((post) => {
      console.log(`Post #${post.id}: ${post.title}`);
    });
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// buscarUsuarioComPosts(1);

// ============================================
// 5. BUSCAR EM PARALELO
// ============================================

console.log("\n=== BUSCAR EM PARALELO ===\n");

async function buscarPerfilCompleto(userId: number): Promise<void> {
  try {
    console.log(`\n📊 Carregando perfil completo do usuário ${userId}...\n`);

    const inicio = Date.now();

    // Buscar TUDO em paralelo com Promise.all
    const [userResponse, postsResponse, todosResponse, albumsResponse] =
      await Promise.all([
        fetch(`${BASE_URL}/users/${userId}`),
        fetch(`${BASE_URL}/posts?userId=${userId}`),
        fetch(`${BASE_URL}/todos?userId=${userId}`),
        fetch(`${BASE_URL}/albums?userId=${userId}`),
      ]);

    // Verificar se todas as respostas foram OK
    if (!userResponse.ok) throw new Error("Erro ao buscar usuário");
    if (!postsResponse.ok) throw new Error("Erro ao buscar posts");
    if (!todosResponse.ok) throw new Error("Erro ao buscar todos");
    if (!albumsResponse.ok) throw new Error("Erro ao buscar álbuns");

    // Extrair dados em paralelo
    const [usuario, posts, todos, albums] = await Promise.all([
      userResponse.json() as Promise<User>,
      postsResponse.json() as Promise<Post[]>,
      todosResponse.json() as Promise<Todo[]>,
      albumsResponse.json() as Promise<Album[]>,
    ]);

    const fim = Date.now();

    // Exibir resumo
    console.log("=".repeat(50));
    console.log(`👤 ${usuario.name}`);
    console.log("=".repeat(50));
    console.log(`📧 Email: ${usuario.email}`);
    console.log(`🏢 Empresa: ${usuario.company.name}`);
    console.log(`🌍 Cidade: ${usuario.address.city}`);
    console.log(`\n📊 Estatísticas:`);
    console.log(`   Posts: ${posts.length}`);
    console.log(`   Álbuns: ${albums.length}`);
    console.log(`   Tarefas: ${todos.length}`);
    console.log(
      `   Tarefas completas: ${todos.filter((t) => t.completed).length}`
    );
    console.log(`\n⏱️ Tempo: ${fim - inicio}ms`);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// buscarPerfilCompleto(1);

// ============================================
// 6. BUSCAR POST COM COMENTÁRIOS
// ============================================

async function buscarPostComComentarios(postId: number): Promise<void> {
  try {
    console.log(`\n📝 Buscando post ${postId} com comentários...\n`);

    // Buscar post e comentários em paralelo
    const [postResponse, commentsResponse] = await Promise.all([
      fetch(`${BASE_URL}/posts/${postId}`),
      fetch(`${BASE_URL}/posts/${postId}/comments`),
    ]);

    if (!postResponse.ok) throw new Error("Post não encontrado");
    if (!commentsResponse.ok) throw new Error("Erro ao buscar comentários");

    const post: Post = await postResponse.json();
    const comentarios: Comment[] = await commentsResponse.json();

    console.log("=".repeat(50));
    console.log(post.title.toUpperCase());
    console.log("=".repeat(50));
    console.log(`\n${post.body}\n`);
    console.log(`💬 ${comentarios.length} comentários:\n`);

    comentarios.forEach((comment) => {
      console.log(`👤 ${comment.name} (${comment.email})`);
      console.log(`   ${comment.body.substring(0, 80)}...\n`);
    });
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// buscarPostComComentarios(1);

// ============================================
// 7. FILTRAR E PROCESSAR DADOS
// ============================================

console.log("\n=== FILTRAR DADOS ===\n");

async function analisarTodosdoUsuario(userId: number): Promise<void> {
  try {
    console.log(`\n📋 Analisando tarefas do usuário ${userId}...\n`);

    const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);

    if (!response.ok) throw new Error("Erro ao buscar tarefas");

    const todos: Todo[] = await response.json();

    // Processar dados
    const completas = todos.filter((t) => t.completed);
    const pendentes = todos.filter((t) => !t.completed);
    const taxaConclusao = ((completas.length / todos.length) * 100).toFixed(1);

    console.log("📊 RELATÓRIO DE TAREFAS");
    console.log("=".repeat(50));
    console.log(`Total: ${todos.length}`);
    console.log(`✅ Completas: ${completas.length}`);
    console.log(`⏳ Pendentes: ${pendentes.length}`);
    console.log(`📈 Taxa de conclusão: ${taxaConclusao}%\n`);

    console.log("⏳ Próximas tarefas:\n");
    pendentes.slice(0, 5).forEach((todo, index) => {
      console.log(`${index + 1}. ${todo.title}`);
    });
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// analisarTodosdoUsuario(1);

// ============================================
// 8. BUSCAR E AGRUPAR
// ============================================

async function estatisticasGerais(): Promise<void> {
  try {
    console.log("\n📊 Buscando estatísticas gerais...\n");

    const [usersResponse, postsResponse, todosResponse] = await Promise.all([
      fetch(`${BASE_URL}/users`),
      fetch(`${BASE_URL}/posts`),
      fetch(`${BASE_URL}/todos`),
    ]);

    const users: User[] = await usersResponse.json();
    const posts: Post[] = await postsResponse.json();
    const todos: Todo[] = await todosResponse.json();

    // Agrupar posts por usuário
    const postsPorUsuario: { [key: number]: number } = {};
    posts.forEach((post) => {
      postsPorUsuario[post.userId] = (postsPorUsuario[post.userId] || 0) + 1;
    });

    // Encontrar usuário mais ativo
    let maxPosts = 0;
    let usuarioMaisAtivo = users[0];

    users.forEach((user) => {
      const numPosts = postsPorUsuario[user.id] || 0;
      if (numPosts > maxPosts) {
        maxPosts = numPosts;
        usuarioMaisAtivo = user;
      }
    });

    // Tarefas completadas
    const todosCompletos = todos.filter((t) => t.completed).length;

    console.log("=".repeat(50));
    console.log("ESTATÍSTICAS DA PLATAFORMA");
    console.log("=".repeat(50));
    console.log(`\n👥 Usuários: ${users.length}`);
    console.log(`📝 Posts: ${posts.length}`);
    console.log(`📋 Tarefas: ${todos.length}`);
    console.log(`✅ Tarefas completas: ${todosCompletos}`);
    console.log(`\n🏆 Usuário mais ativo: ${usuarioMaisAtivo.name}`);
    console.log(`   Posts: ${maxPosts}`);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// estatisticasGerais();

// ============================================
// 9. CLASSE HELPER PARA API
// ============================================

class JSONPlaceholderAPI {
  private baseURL = "https://jsonplaceholder.typicode.com";

  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    return await response.json();
  }

  async getUsers(): Promise<User[]> {
    return this.fetch<User[]>("/users");
  }

  async getUser(id: number): Promise<User> {
    return this.fetch<User>(`/users/${id}`);
  }

  async getPosts(userId?: number): Promise<Post[]> {
    const endpoint = userId ? `/posts?userId=${userId}` : "/posts";
    return this.fetch<Post[]>(endpoint);
  }

  async getPost(id: number): Promise<Post> {
    return this.fetch<Post>(`/posts/${id}`);
  }

  async getComments(postId: number): Promise<Comment[]> {
    return this.fetch<Comment[]>(`/posts/${postId}/comments`);
  }

  async getTodos(userId?: number): Promise<Todo[]> {
    const endpoint = userId ? `/todos?userId=${userId}` : "/todos";
    return this.fetch<Todo[]>(endpoint);
  }

  async getAlbums(userId?: number): Promise<Album[]> {
    const endpoint = userId ? `/albums?userId=${userId}` : "/albums";
    return this.fetch<Album[]>(endpoint);
  }

  async getPhotos(albumId: number): Promise<Photo[]> {
    return this.fetch<Photo[]>(`/albums/${albumId}/photos`);
  }
}

// Usando a classe helper
async function usarClasseHelper(): Promise<void> {
  const api = new JSONPlaceholderAPI();

  try {
    console.log("\n🔧 Usando classe helper...\n");

    // Buscar usuários
    const users = await api.getUsers();
    console.log(`👥 ${users.length} usuários carregados`);

    // Buscar posts de um usuário específico
    const posts = await api.getPosts(1);
    console.log(`📝 ${posts.length} posts do usuário 1`);

    // Buscar tarefas
    const todos = await api.getTodos(1);
    console.log(`📋 ${todos.length} tarefas do usuário 1`);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// usarClasseHelper();

// ============================================
// 10. EXERCÍCIO
// ============================================

console.log("\n=== EXERCÍCIO ===\n");

/**
 * DESAFIO:
 * Crie uma função que:
 *
 * 1. Busca um post específico
 * 2. Busca o autor do post (usuário)
 * 3. Busca todos os comentários do post
 * 4. Exibe:
 *    - Título do post
 *    - Nome do autor
 *    - Quantidade de comentários
 *    - Lista dos 3 primeiros comentários
 */

async function exibirPostDetalhado(postId: number): Promise<void> {
  try {
    console.log(`\n📖 Carregando post ${postId}...\n`);

    // TODO: Busque post, autor e comentários em paralelo
    const [postResponse, commentsResponse] = await Promise.all([
      fetch(`${BASE_URL}/posts/${postId}`),
      fetch(`${BASE_URL}/posts/${postId}/comments`),
    ]);

    const post: Post = await postResponse.json();
    const comentarios: Comment[] = await commentsResponse.json();

    // Buscar autor
    const autorResponse = await fetch(`${BASE_URL}/users/${post.userId}`);
    const autor: User = await autorResponse.json();

    // TODO: Exiba as informações formatadas
    console.log("=".repeat(50));
    console.log(post.title.toUpperCase());
    console.log("=".repeat(50));
    console.log(`\n✍️  Por: ${autor.name} (${autor.email})`);
    console.log(`\n📄 ${post.body}`);
    console.log(`\n💬 ${comentarios.length} comentários:\n`);

    comentarios.slice(0, 3).forEach((comment, index) => {
      console.log(`${index + 1}. ${comment.name}`);
      console.log(`   ${comment.body.substring(0, 60)}...\n`);
    });
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// exibirPostDetalhado(1);

// ============================================
// RESUMO - JSONPLACEHOLDER
// ============================================

/**
 * 🎯 O QUE APRENDEMOS:
 *
 * 1. Estrutura do JSONPlaceholder
 * 2. Relacionamentos entre recursos
 * 3. Buscar dados em paralelo
 * 4. Filtrar e processar dados
 * 5. Criar classes helper para APIs
 *
 * ✅ ENDPOINTS PRINCIPAIS:
 *
 * - GET /users - Lista usuários
 * - GET /users/:id - Busca usuário
 * - GET /posts - Lista posts
 * - GET /posts?userId=1 - Posts de um usuário
 * - GET /posts/:id/comments - Comentários de um post
 * - GET /todos?userId=1 - Tarefas de um usuário
 *
 * 📝 BOAS PRÁTICAS:
 *
 * - Buscar em paralelo quando possível
 * - Criar classes/funções reutilizáveis
 * - Tipar os dados com TypeScript
 * - Tratar erros adequadamente
 * - Processar dados no cliente
 *
 * 🎯 PRÓXIMOS PASSOS:
 * - Exercícios práticos avançados
 * - Criar aplicações completas
 * - Tratamento de erros em APIs
 */
