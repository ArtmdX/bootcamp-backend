/**
 * ============================================
 * TIPOS E INTERFACES DO PROJETO
 * ============================================
 *
 * Centralize todas as interfaces aqui!
 */

// ============================================
// TIPOS DA API JSONPLACEHOLDER
// ============================================

export interface Usuario {
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

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comentario {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// ============================================
// TIPOS DO SISTEMA
// ============================================

export interface PostEnriquecido extends Post {
  autor: Usuario;
}

export interface ComentariosAgrupados {
  [postId: number]: Comentario[];
}

export interface Estatisticas {
  totalUsuarios: number;
  totalPosts: number;
  totalComentarios: number;
  totalTodos: number;
  mediaPosts: number;
  mediaComentarios: number;
  todosCompletos: number;
  taxaConclusao: number;
}

export interface UsuarioMaisAtivo {
  nome: string;
  email: string;
  totalPosts: number;
}

export interface PostMaisComentado {
  titulo: string;
  totalComentarios: number;
}

export interface PostComComentarios extends Post {
  totalComentarios: number;
}

export interface RelatorioGeral {
  geradoEm: string;
  estatisticas: Estatisticas;
  usuarioMaisAtivo: UsuarioMaisAtivo;
  postMaisComentado: PostMaisComentado;
  top5Posts: Array<{
    id: number;
    titulo: string;
    totalComentarios: number;
  }>;
}

export interface DadosCompletos {
  usuarios: Usuario[];
  posts: Post[];
  comentarios: Comentario[];
  todos: Todo[];
}
