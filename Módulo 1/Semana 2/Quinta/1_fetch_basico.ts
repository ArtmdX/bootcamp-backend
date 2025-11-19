/**
 * ============================================
 * QUINTA-FEIRA - AULA 1
 * Introdução ao Fetch API
 * ============================================
 *
 * OBJETIVO:
 * Aprender a consumir APIs reais usando fetch()
 * Entender métodos HTTP (GET, POST, PUT, DELETE)
 */

// ============================================
// 1. O QUE É FETCH?
// ============================================

console.log("\n=== O QUE É FETCH? ===\n");

/**
 * fetch() é a forma moderna de fazer requisições HTTP
 *
 * Substitui o antigo XMLHttpRequest
 * Retorna uma Promise
 * Funciona no navegador e no Node.js (v18+)
 *
 * USO BÁSICO:
 * fetch(url) -> retorna Promise<Response>
 */

// ============================================
// 2. PRIMEIRO FETCH - GET SIMPLES
// ============================================

console.log("\n=== PRIMEIRO FETCH ===\n");

/**
 * GET = Buscar dados
 * É o método padrão do fetch
 */

async function primeiroFetch(): Promise<void> {
  try {
    console.log("🔄 Fazendo requisição...\n");

    // fetch retorna uma Promise
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    console.log("📡 Resposta recebida!");
    console.log("Status:", response.status); // 200 = sucesso
    console.log("Status Text:", response.statusText); // "OK"

    // response.json() TAMBÉM retorna uma Promise!
    const dados = await response.json();

    console.log("\n👤 Dados do usuário:");
    console.log(dados);
  } catch (erro) {
    console.log("❌ Erro:", erro);
  }
}

// Descomente para testar (precisa de internet!)
// primeiroFetch();

// ============================================
// 3. ANATOMIA DO FETCH
// ============================================

console.log("\n=== ANATOMIA DO FETCH ===\n");

/**
 * fetch() tem 2 passos:
 *
 * 1. Obter a resposta (Response)
 * 2. Extrair os dados (.json(), .text(), etc)
 */

async function anatomiaFetch(): Promise<void> {
  try {
    // PASSO 1: Fazer a requisição
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    // response tem várias propriedades úteis:
    console.log("URL:", response.url);
    console.log("Status:", response.status);
    console.log("Headers:", response.headers);
    console.log("OK?", response.ok); // true se status 200-299

    // PASSO 2: Extrair os dados
    const post = await response.json();

    console.log("\n📝 Post:");
    console.log(post);
  } catch (erro) {
    console.log("❌ Erro:", erro);
  }
}

// anatomiaFetch();

// ============================================
// 4. TRATAMENTO DE ERROS
// ============================================

console.log("\n=== TRATAMENTO DE ERROS ===\n");

/**
 * fetch() SÓ rejeita se:
 * - Erro de rede
 * - URL inválida
 *
 * NÃO rejeita para status 404, 500, etc!
 * Você precisa verificar response.ok
 */

async function fetchComTratamento(url: string): Promise<void> {
  try {
    const response = await fetch(url);

    // Verificar se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const dados = await response.json();
    console.log("✅ Dados:", dados);
  } catch (erro) {
    if (erro instanceof Error) {
      console.log("❌ Erro:", erro.message);
    }
  }
}

// Teste com URL válida
// fetchComTratamento("https://jsonplaceholder.typicode.com/users/1");

// Teste com URL que retorna 404
// fetchComTratamento("https://jsonplaceholder.typicode.com/users/999999");

// ============================================
// 5. MÉTODOS HTTP
// ============================================

console.log("\n=== MÉTODOS HTTP ===\n");

/**
 * GET: Buscar dados (padrão)
 * POST: Criar novo recurso
 * PUT: Atualizar recurso completo
 * PATCH: Atualizar recurso parcialmente
 * DELETE: Deletar recurso
 */

interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

// GET - Buscar
async function buscarPost(id: number): Promise<void> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!response.ok) {
      throw new Error("Post não encontrado");
    }

    const post: Post = await response.json();
    console.log("📝 GET - Post encontrado:", post.title);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// buscarPost(1);

// POST - Criar
async function criarPost(novoPost: Post): Promise<void> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", // Especifica o método
      headers: {
        "Content-Type": "application/json", // Tipo de conteúdo
      },
      body: JSON.stringify(novoPost), // Converte objeto para JSON
    });

    if (!response.ok) {
      throw new Error("Erro ao criar post");
    }

    const postCriado: Post = await response.json();
    console.log("✅ POST - Post criado com ID:", postCriado.id);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// criarPost({
//   title: "Meu novo post",
//   body: "Conteúdo do post",
//   userId: 1,
// });

// PUT - Atualizar completo
async function atualizarPost(id: number, postAtualizado: Post): Promise<void> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postAtualizado),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar post");
    }

    const post: Post = await response.json();
    console.log("✅ PUT - Post atualizado:", post);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// atualizarPost(1, {
//   title: "Título atualizado",
//   body: "Conteúdo atualizado",
//   userId: 1,
// });

// DELETE - Deletar
async function deletarPost(id: number): Promise<void> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar post");
    }

    console.log(`✅ DELETE - Post ${id} deletado`);
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// deletarPost(1);

// ============================================
// 6. TRABALHANDO COM ARRAYS
// ============================================

console.log("\n=== BUSCAR MÚLTIPLOS ITENS ===\n");

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

async function buscarTodosUsuarios(): Promise<void> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    const usuarios: User[] = await response.json();

    console.log(`📊 Total de usuários: ${usuarios.length}\n`);

    usuarios.forEach((usuario) => {
      console.log(`${usuario.id}. ${usuario.name} (${usuario.email})`);
    });
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// buscarTodosUsuarios();

// ============================================
// 7. QUERY PARAMETERS
// ============================================

console.log("\n=== QUERY PARAMETERS ===\n");

/**
 * Query params = Filtros na URL
 * Formato: ?parametro=valor&outro=valor
 */

async function buscarPostsDoUsuario(userId: number): Promise<void> {
  try {
    // Adiciona query parameter
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar posts");
    }

    const posts: Post[] = await response.json();

    console.log(`📝 Posts do usuário ${userId}: ${posts.length}\n`);

    posts.forEach((post) => {
      console.log(`- ${post.title}`);
    });
  } catch (erro) {
    console.log("❌", (erro as Error).message);
  }
}

// buscarPostsDoUsuario(1);

// ============================================
// 8. EXEMPLO PRÁTICO COMPLETO
// ============================================

console.log("\n=== EXEMPLO PRÁTICO ===\n");

interface Todo {
  id?: number;
  title: string;
  completed: boolean;
  userId: number;
}

// CRUD Completo de Todos
class TodoAPI {
  private baseURL = "https://jsonplaceholder.typicode.com/todos";

  async listar(): Promise<Todo[]> {
    const response = await fetch(this.baseURL);

    if (!response.ok) {
      throw new Error("Erro ao listar todos");
    }

    return await response.json();
  }

  async buscarPorId(id: number): Promise<Todo> {
    const response = await fetch(`${this.baseURL}/${id}`);

    if (!response.ok) {
      throw new Error("Todo não encontrado");
    }

    return await response.json();
  }

  async criar(todo: Todo): Promise<Todo> {
    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar todo");
    }

    return await response.json();
  }

  async atualizar(id: number, todo: Todo): Promise<Todo> {
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar todo");
    }

    return await response.json();
  }

  async deletar(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar todo");
    }
  }
}

// Usando a classe
async function testarTodoAPI(): Promise<void> {
  const api = new TodoAPI();

  try {
    // Listar
    console.log("📋 Listando todos...");
    const todos = await api.listar();
    console.log(`Total: ${todos.length}\n`);

    // Buscar um específico
    console.log("🔍 Buscando todo #1...");
    const todo = await api.buscarPorId(1);
    console.log(`Título: ${todo.title}`);
    console.log(`Completo: ${todo.completed}\n`);

    // Criar
    console.log("➕ Criando novo todo...");
    const novoTodo = await api.criar({
      title: "Estudar TypeScript",
      completed: false,
      userId: 1,
    });
    console.log(`Criado com ID: ${novoTodo.id}\n`);

    // Atualizar
    console.log("✏️ Atualizando todo...");
    const todoAtualizado = await api.atualizar(1, {
      title: "Título atualizado",
      completed: true,
      userId: 1,
    });
    console.log(`Atualizado: ${todoAtualizado.title}\n`);

    // Deletar
    console.log("🗑️ Deletando todo...");
    await api.deletar(1);
    console.log("Deletado com sucesso!\n");
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// testarTodoAPI();

// ============================================
// RESUMO - FETCH API
// ============================================

/**
 * 🎯 PONTOS IMPORTANTES:
 *
 * 1. fetch() retorna Promise<Response>
 * 2. response.json() retorna Promise com os dados
 * 3. Sempre verificar response.ok
 * 4. Usar try/catch para erros
 * 5. Métodos HTTP: GET, POST, PUT, DELETE
 *
 * 📝 SINTAXE BÁSICA:
 *
 * const response = await fetch(url, {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify(dados)
 * });
 *
 * const dados = await response.json();
 *
 * ✅ BOAS PRÁTICAS:
 *
 * - Sempre verificar response.ok
 * - Usar try/catch
 * - Tipagem TypeScript para dados
 * - Criar classes/funções reutilizáveis
 * - Validar dados antes de enviar
 *
 * 🎯 PRÓXIMOS PASSOS:
 * - Explorar JSONPlaceholder
 * - Exercícios práticos
 * - Tratamento avançado de erros
 */

/**
 * 📚 RECURSOS:
 *
 * JSONPlaceholder (API de teste):
 * https://jsonplaceholder.typicode.com
 *
 * Endpoints disponíveis:
 * - /posts
 * - /comments
 * - /albums
 * - /photos
 * - /todos
 * - /users
 */
