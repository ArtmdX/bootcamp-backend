/**
 * ============================================
 * API SERVICE
 * ============================================
 *
 * Responsável por toda comunicação com a API JSONPlaceholder
 */

import config from "../config";
import { Usuario, Post, Comentario, Todo, DadosCompletos } from "../types";

/**
 * Faz uma requisição HTTP com retry e validação
 */
async function fetchComRetry(url: string, tentativas: number = config.MAX_RETRIES): Promise<any> {
  for (let i = 0; i < tentativas; i++) {
    try {
      // TODO: Faça o fetch
      // TODO: Verifique se response.ok
      // TODO: Se não ok, lance erro
      // TODO: Retorne os dados em JSON
    } catch (erro) {
      // TODO: Se for a última tentativa, lance o erro
      // TODO: Senão, aguarde config.RETRY_DELAY e continue o loop
    }
  }
}

/**
 * Busca todos os usuários
 */
export async function buscarUsuarios(): Promise<Usuario[]> {
  try {
    // TODO: Use fetchComRetry para buscar de ${config.API_URL}/users
    // TODO: Retorne os dados tipados como Usuario[]
    return [];
  } catch (erro) {
    console.error("Erro ao buscar usuários:", (erro as Error).message);
    throw erro;
  }
}

/**
 * Busca todos os posts
 */
export async function buscarPosts(): Promise<Post[]> {
  try {
    // TODO: Implemente (similar a buscarUsuarios)
    return [];
  } catch (erro) {
    console.error("Erro ao buscar posts:", (erro as Error).message);
    throw erro;
  }
}

/**
 * Busca todos os comentários
 */
export async function buscarComentarios(): Promise<Comentario[]> {
  try {
    // TODO: Implemente
    return [];
  } catch (erro) {
    console.error("Erro ao buscar comentários:", (erro as Error).message);
    throw erro;
  }
}

/**
 * Busca todas as tarefas (todos)
 */
export async function buscarTodos(): Promise<Todo[]> {
  try {
    // TODO: Implemente
    return [];
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", (erro as Error).message);
    throw erro;
  }
}

/**
 * Busca todos os dados em paralelo (PERFORMANCE!)
 */
export async function buscarTodosDados(): Promise<DadosCompletos> {
  try {
    console.log("  Iniciando busca de dados...");

    // TODO: Use Promise.all() para buscar tudo em paralelo
    // const [usuarios, posts, comentarios, todos] = await Promise.all([...])

    // TODO: Exiba quantos de cada foram buscados

    // TODO: Retorne objeto tipado como DadosCompletos
    return {
      usuarios: [],
      posts: [],
      comentarios: [],
      todos: []
    };
  } catch (erro) {
    console.error("Erro ao buscar todos os dados:", (erro as Error).message);
    throw erro;
  }
}
