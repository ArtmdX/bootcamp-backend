/**
 * ============================================
 * QUINTA-FEIRA - AULA 4
 * Tratamento de Erros em APIs
 * ============================================
 *
 * OBJETIVO:
 * Aprender a tratar erros de forma robusta ao consumir APIs
 * Entender diferentes tipos de erros e como lidar com cada um
 */

// ============================================
// 1. TIPOS DE ERROS EM APIs
// ============================================

console.log("\n=== TIPOS DE ERROS ===\n");

/**
 * ERROS COMUNS:
 *
 * 1. Erro de Rede (Network Error)
 *    - Sem internet
 *    - Servidor fora do ar
 *    - Timeout
 *
 * 2. Erros HTTP (Status Codes)
 *    - 400: Bad Request (requisição inválida)
 *    - 401: Unauthorized (sem autenticação)
 *    - 403: Forbidden (sem permissão)
 *    - 404: Not Found (recurso não existe)
 *    - 500: Internal Server Error (erro no servidor)
 *    - 503: Service Unavailable (servidor sobrecarregado)
 *
 * 3. Erros de Parsing
 *    - JSON inválido
 *    - Formato inesperado
 *
 * 4. Erros de Validação
 *    - Dados fora do esperado
 *    - Campos obrigatórios faltando
 */

// ============================================
// 2. TRATAMENTO BÁSICO
// ============================================

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function buscarPostBasico(id: number): Promise<Post | null> {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);

    // IMPORTANTE: fetch NÃO rejeita para status 404, 500, etc!
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const post: Post = await response.json();
    return post;
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
    return null;
  }
}

// buscarPostBasico(1);    // Sucesso
// buscarPostBasico(99999); // 404

// ============================================
// 3. TRATAMENTO ESPECÍFICO POR STATUS
// ============================================

console.log("\n=== TRATAMENTO POR STATUS ===\n");

async function buscarPostComTratamento(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);

    // Tratar cada status de forma diferente
    switch (response.status) {
      case 200:
        const post: Post = await response.json();
        console.log("✅ Post encontrado:", post.title);
        break;

      case 404:
        console.log("⚠️ Post não encontrado");
        break;

      case 500:
        console.log("🔴 Erro no servidor. Tente novamente mais tarde.");
        break;

      case 503:
        console.log("🔴 Serviço indisponível. Tente novamente em alguns minutos.");
        break;

      default:
        console.log(`❌ Erro inesperado: ${response.status}`);
    }
  } catch (erro) {
    // Erro de rede ou outro erro antes da resposta
    console.log("🌐 Erro de conexão:", (erro as Error).message);
  }
}

// buscarPostComTratamento(1);
// buscarPostComTratamento(99999);

// ============================================
// 4. ERROS CUSTOMIZADOS
// ============================================

console.log("\n=== ERROS CUSTOMIZADOS ===\n");

class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

class NotFoundError extends APIError {
  constructor(recurso: string) {
    super(404, "Not Found", `${recurso} não encontrado`);
    this.name = "NotFoundError";
  }
}

async function buscarComErrosCustomizados(id: number): Promise<Post> {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);

    if (response.status === 404) {
      throw new NotFoundError("Post");
    }

    if (!response.ok) {
      throw new APIError(
        response.status,
        response.statusText,
        `Erro na API: ${response.status}`
      );
    }

    return await response.json();
  } catch (erro) {
    // Se for erro de rede (antes da resposta)
    if (erro instanceof TypeError) {
      throw new NetworkError("Sem conexão com a internet");
    }

    throw erro;
  }
}

async function testarErrosCustomizados(): Promise<void> {
  try {
    const post = await buscarComErrosCustomizados(99999);
    console.log("Post:", post);
  } catch (erro) {
    if (erro instanceof NotFoundError) {
      console.log("⚠️", erro.message);
    } else if (erro instanceof NetworkError) {
      console.log("🌐", erro.message);
    } else if (erro instanceof APIError) {
      console.log(`❌ Status ${erro.status}:`, erro.message);
    } else {
      console.log("❌ Erro desconhecido:", erro);
    }
  }
}

// testarErrosCustomizados();

// ============================================
// 5. RETRY LOGIC (TENTAR NOVAMENTE)
// ============================================

console.log("\n=== RETRY LOGIC ===\n");

async function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchComRetry<T>(
  url: string,
  maxTentativas: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let ultimoErro: Error | null = null;

  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    try {
      console.log(`🔄 Tentativa ${tentativa}/${maxTentativas}...`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const dados: T = await response.json();
      console.log(`✅ Sucesso na tentativa ${tentativa}`);
      return dados;
    } catch (erro) {
      ultimoErro = erro as Error;
      console.log(`❌ Tentativa ${tentativa} falhou:`, ultimoErro.message);

      // Se não for a última tentativa, espera antes de tentar novamente
      if (tentativa < maxTentativas) {
        console.log(`⏳ Aguardando ${delayMs}ms antes de tentar novamente...\n`);
        await esperar(delayMs);
      }
    }
  }

  throw new Error(
    `Falha após ${maxTentativas} tentativas. Último erro: ${ultimoErro?.message}`
  );
}

async function testarRetry(): Promise<void> {
  try {
    const post = await fetchComRetry<Post>(
      `${BASE_URL}/posts/1`,
      3,
      1000
    );
    console.log("Post recuperado:", post.title);
  } catch (erro) {
    console.log("❌ Erro final:", (erro as Error).message);
  }
}

// testarRetry();

// ============================================
// 6. TIMEOUT
// ============================================

console.log("\n=== TIMEOUT ===\n");

async function fetchComTimeout<T>(
  url: string,
  timeoutMs: number = 5000
): Promise<T> {
  // Cria uma promise que rejeita após o timeout
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout após ${timeoutMs}ms`));
    }, timeoutMs);
  });

  // Cria a promise do fetch
  const fetchPromise = fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    return response.json();
  });

  // Retorna a primeira que resolver (ou rejeitar)
  return Promise.race([fetchPromise, timeoutPromise]);
}

async function testarTimeout(): Promise<void> {
  try {
    console.log("⏱️ Buscando com timeout de 5 segundos...");

    const post = await fetchComTimeout<Post>(
      `${BASE_URL}/posts/1`,
      5000
    );

    console.log("✅ Post recuperado:", post.title);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// testarTimeout();

// ============================================
// 7. VALIDAÇÃO DE DADOS
// ============================================

console.log("\n=== VALIDAÇÃO DE DADOS ===\n");

function validarPost(dados: any): dados is Post {
  return (
    typeof dados === "object" &&
    typeof dados.id === "number" &&
    typeof dados.userId === "number" &&
    typeof dados.title === "string" &&
    typeof dados.body === "string"
  );
}

async function buscarPostComValidacao(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const dados = await response.json();

    // Validar estrutura dos dados
    if (!validarPost(dados)) {
      throw new Error("Dados recebidos estão em formato inválido");
    }

    console.log("✅ Post válido:", dados.title);
  } catch (erro) {
    console.log("❌ Erro:", (erro as Error).message);
  }
}

// buscarPostComValidacao(1);

// ============================================
// 8. CLASSE WRAPPER COMPLETA
// ============================================

console.log("\n=== WRAPPER COMPLETO ===\n");

class APIClient {
  constructor(
    private baseURL: string,
    private timeout: number = 5000,
    private maxRetries: number = 3
  ) {}

  private async fetchComTimeout(
    url: string,
    options?: RequestInit
  ): Promise<Response> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Timeout após ${this.timeout}ms`));
      }, this.timeout);
    });

    const fetchPromise = fetch(url, options);

    return Promise.race([fetchPromise, timeoutPromise]);
  }

  private async fetchComRetry(
    url: string,
    options?: RequestInit
  ): Promise<Response> {
    let ultimoErro: Error | null = null;

    for (let tentativa = 1; tentativa <= this.maxRetries; tentativa++) {
      try {
        const response = await this.fetchComTimeout(url, options);

        // Se status 5xx, tentar novamente
        if (response.status >= 500) {
          throw new Error(`Erro do servidor: ${response.status}`);
        }

        return response;
      } catch (erro) {
        ultimoErro = erro as Error;

        if (tentativa < this.maxRetries) {
          await esperar(1000 * tentativa); // Backoff exponencial
        }
      }
    }

    throw ultimoErro;
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.fetchComRetry(`${this.baseURL}${endpoint}`);

      if (response.status === 404) {
        throw new NotFoundError(endpoint);
      }

      if (!response.ok) {
        throw new APIError(
          response.status,
          response.statusText,
          `Erro na requisição: ${response.status}`
        );
      }

      return await response.json();
    } catch (erro) {
      if (erro instanceof TypeError) {
        throw new NetworkError("Erro de conexão");
      }
      throw erro;
    }
  }

  async post<T>(endpoint: string, dados: any): Promise<T> {
    const response = await this.fetchComRetry(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new APIError(
        response.status,
        response.statusText,
        `Erro ao criar recurso: ${response.status}`
      );
    }

    return await response.json();
  }
}

// Usando o wrapper
async function testarAPIClient(): Promise<void> {
  const api = new APIClient(BASE_URL, 5000, 3);

  try {
    console.log("🔍 Buscando post...");
    const post = await api.get<Post>("/posts/1");
    console.log("✅ Post:", post.title);

    console.log("\n➕ Criando post...");
    const novoPost = await api.post<Post>("/posts", {
      title: "Novo Post",
      body: "Conteúdo",
      userId: 1,
    });
    console.log("✅ Post criado:", novoPost.id);
  } catch (erro) {
    if (erro instanceof NotFoundError) {
      console.log("⚠️ Não encontrado:", erro.message);
    } else if (erro instanceof NetworkError) {
      console.log("🌐 Erro de rede:", erro.message);
    } else if (erro instanceof APIError) {
      console.log(`❌ Erro ${erro.status}:`, erro.message);
    } else {
      console.log("❌ Erro:", erro);
    }
  }
}

// testarAPIClient();

// ============================================
// RESUMO - TRATAMENTO DE ERROS
// ============================================

/**
 * 🎯 ESTRATÉGIAS DE TRATAMENTO:
 *
 * 1. Sempre verificar response.ok
 * 2. Tratar status codes específicos
 * 3. Criar erros customizados
 * 4. Implementar retry logic para erros temporários
 * 5. Usar timeout para evitar esperas infinitas
 * 6. Validar dados recebidos
 * 7. Diferenciar erros de rede de erros de API
 *
 * ✅ BOAS PRÁTICAS:
 *
 * - Mensagens de erro claras para o usuário
 * - Logs detalhados para debugging
 * - Retry apenas para erros temporários (5xx)
 * - Não retry para erros de cliente (4xx)
 * - Timeout razoável (não muito curto, não muito longo)
 * - Feedback visual durante retries
 *
 * 📝 HIERARQUIA DE TRATAMENTO:
 *
 * try {
 *   const response = await fetch(url);
 *
 *   if (!response.ok) {
 *     // Tratar por status code
 *   }
 *
 *   const dados = await response.json();
 *
 *   // Validar dados
 *
 * } catch (erro) {
 *   // Tratar por tipo de erro
 * }
 */
